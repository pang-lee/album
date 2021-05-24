import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchBookList({ commit, dispatch }){
        try {
            let response = await this.app.apolloProvider.defaultClient.query({
                query:gql`
                    query {
                      books{
                        id
                        total_page
                        share
                        booktitle
                        bookpage{
                          header
                          text
                          img
                          photo
                          options
                        }
                      }
                    }
                `
            })
            console.log( response.data.books)
            commit(types.FETCH_BOOK_LIST, response.data.books)
            let book_img = []
            response.data.books.forEach((whole_book) => {
              let obj = { id: whole_book.id }
              whole_book.bookpage.forEach((book, index) => obj[`pages${index}`] = book.img)
              book_img.push(obj)
            })
            await dispatch('fetchBookImg', book_img)
        } catch (error) {
            console.log('This is fetchBook error', error)
        }
    },
    async fetchBookImg({ commit }, params){
      let wholeBookImg = await this.$axios.$get('upload/bookImg', { params: { ImgArray: JSON.stringify(params) } })
      wholeBookImg.forEach((element) => {
        for(let i in element){
          if(i !== 'id') element[i] = 'data:image/*;base64,' + element[i]
        }
      })
      commit(types.SET_IMAGE_FROM_ACTION, wholeBookImg)
    },
    async saveBook({ getters }, params){
      try {
        let modified_book = getters.bookList.find(element => element.id === params.theId)
        let response = await this.app.apolloProvider.defaultClient.mutate({
          mutation: gql`
            mutation($userId: ID!, $bookId: ID!, $total_page: Int!, $share: Boolean!, $booktitle: String!, $book: String){
              set_book(userId: $userId, bookId: $bookId, total_page: $total_page, share: $share, booktitle: $booktitle, bookinfo: $book)
            }
          `,
          variables: {
            "userId": params.theUser,
            "bookId": modified_book.id,
            "total_page": modified_book.total_page,
            "share": modified_book.share,
            "booktitle": modified_book.booktitle,
            "book": JSON.stringify(modified_book.bookpage)
          }
        })
        console.log('this is after mutation save book', response)
      } catch (error) {
          console.log('This is save error', error)
      }
    },
    async guestView({ commit }, params){
      try {
        let response = await this.app.apolloProvider.defaultClient.query({
          query:gql`
            query($userId: String!, $bookId: String!){
              guestBook(userId: $userId, bookId: $bookId){
                id
                total_page
                booktitle
                bookpage{
                  header
                  text
                  img
                  photo
                  options
                }
              }
            }
          `,
          variables:{
            "userId": params.which_user,
            "bookId": params.which_book
          }
        })
        commit(types.FETCH_BOOK_LIST, new Array(response.data.guestBook))
      } catch (error) {
          console.log('This is guest view error', error)
      }
    }
}