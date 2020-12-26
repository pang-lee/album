import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchMe({ commit }, params){
        try {
            const user = await this.app.apolloProvider.defaultClient.query({
                query:gql`
                    query {
                        getMe{
                            id
                            username
                            gender
                            birthday
                        }
                    }
                `
            })
            const img = await this.$axios.get()
            console.log("This is img", img.data)
            console.log("This is response data getMe", user.data)
            commit(types.SET_USER, user.data.getMe)
        } catch (error) {
            console.log("admin fetchMe error" ,error)
        }
    }
}