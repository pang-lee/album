import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchMe({ commit, dispatch }, _){
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
    async fetchImage({ commit }, _){
        try {
            let avatar = await this.$axios.$get('/upload/avatar', { responseType: 'blob' })
            if(avatar.type == 'text/plain') return commit(types.SET_AVATAR, '')
            commit(types.SET_AVATAR, window.URL.createObjectURL(new Blob([avatar], { type: 'image/*' })))

            // const reader = new FileReader()
            // reader.readAsDataURL(new Blob([img], { type: 'image/*' }))
            // reader.onload = () => {
            //     console.log(typeof reader.result)
            //     return commit(types.SET_AVATAR, reader.result)
            // }

            // Background and Avatar axios
            // let avatar = await this.$axios.$get('/upload/avatar', { responseType: 'blob' })
            // let background = await this.$axios.$get('/upload/background', { responseType: 'blob' })
            // if(avatar.type == 'text/plain') commit(types.SET_AVATAR, '')
            // if(background.type == 'text/plain') return commit(types.SET_BACKGROUND, 'https://cdn.vuetifyjs.com/images/cards/house.jpg')
            // commit(types.SET_BACKGROUND, window.URL.createObjectURL(new Blob([background], { type: 'image/*' })))
            // commit(types.SET_AVATAR, window.URL.createObjectURL(new Blob([avatar], { type: 'image/*' })))
        } catch (error) {
            console.log('fetch image error', error)
        }

    }
}