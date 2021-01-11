import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchMe({ commit, dispatch }, params){
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
            commit(types.SET_ID, user.data.getMe.id)
            commit(types.SET_FIRST, user.data.getMe.username.split(' ')[0])
            commit(types.SET_LAST, user.data.getMe.username.split(' ')[1])
            commit(types.SET_GENDER, user.data.getMe.gender)
            commit(types.SET_DATE, user.data.getMe.birthday)
            dispatch('fetchImage')
        } catch (error) {
            console.log("admin fetchMe error" ,error)
        }
    },
    async fetchImage({ commit }, params){
        try {
            const img = await this.$axios.$get('/upload', { responseType: 'blob' })
            commit(types.SET_AVATAR, window.URL.createObjectURL(new Blob([img], { type: 'image/*' })))
            // const reader = new FileReader()
            // reader.readAsDataURL(new Blob([img], { type: 'image/*' }))
            // reader.onload = () => {
            //     console.log(typeof reader.result)
            //     return commit(types.SET_AVATAR, reader.result)
            // }
        } catch (error) {
            console.log('fetch image error', error)
        }

    }
}