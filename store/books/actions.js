import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchBookList({ commit }){
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
            commit(types.FETCH_BOOK_LIST, response.data.books)
        } catch (error) {
            console.log('This is fetchBook error', error)
        }
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
          console.log('call action')
      } catch (error) {
          console.log('This is guest view error', error)
      }
    }
}