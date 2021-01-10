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
            const img = await this.$axios.$get('/upload', { responseType: 'blob' })
            console.log("This is response data getMe", user.data)
            commit(types.SET_AVATAR, window.URL.createObjectURL(new Blob([img], { type: 'image/*' })))
            // const reader = new FileReader()
            // reader.readAsDataURL(new Blob([img], { type: 'image/*' }))
            // reader.onload = () => {
            //     console.log(typeof reader.result)
            //     return commit(types.SET_AVATAR, reader.result)
            // }
            commit(types.SET_USER, user.data.getMe)
        } catch (error) {
            console.log("admin fetchMe error" ,error)
        }
    }
}