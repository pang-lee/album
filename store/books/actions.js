import * as types from './mutation-types'
import gql from 'graphql-tag'


export default{
    async fetchBookList({ commit }, params){
        console.log(this.app.apolloProvider.defaultClient.mutate)
        try {
            const response = await this.app.apolloProvider.defaultClient.query({
                query:gql`
                    query {
                        books {
                            title
                            author
                        }
                    }
                `
            })
            commit(types.SET_BOOKS, response.data)
        } catch (error) {
            console.log(error)
        }
    }

}