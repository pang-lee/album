import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchMe({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.query({
                query:gql`
                    query {
                        getMe{
                            email
                            password
                            username
                        }
                    }
                `
            })
            console.log("This is response data getMe", response.data)
            commit(types.SET_USER, response.data.getMe)
        } catch (error) {
            console.log("admin fetchMe error" ,error)
        }
    }
}