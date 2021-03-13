import changename from '~/static/gql/setname.gql'
import resetpassword from '~/static/gql/resetpassword.gql'
import changegender from '~/static/gql/gender.gql'
import changedate from '~/static/gql/date.gql'
import * as types from './mutation-types'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'

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
            commit(types.SET_PRIVACY, 'Share I Selected')
            dispatch('fetchImage')
            dispatch('books/fetchBookList', _, { root: true })
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
    },
    async setname({ getters }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: changename,
                variables: {
                    "name": params
                }
            })
            return Swal.fire({
                title: getters.user.first + ' ' + getters.user.last,
                type: 'info',
                text: `${response.data.set_username}`,
                timer: 3000,
            })
        } catch (error) {
            console.log('set name error', error)
        }        
    },
    async resetpassword(_, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: resetpassword,
                variables:{
                    "password": params
                }
            })
            return Swal.fire({
                title: 'Successfully Update',
                type: 'info',
                text: `${response.data.set_password}`,
                timer: 3000,
            })
        } catch (error) {
            console.log('reset password error', error)
        }
    },
    async setgender(_, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: changegender,
                variables: {
                    "gender": params
                }
            })
            return Swal.fire({
                title: 'Successfully Update',
                type: 'info',
                text: `${response.data.set_gender}`,
                timer: 3000,
            })
        } catch (error) {
            console.log('This is set gender error', error)
        }
    },
    async setdate(_, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: changedate,
                variables: {
                    "date": params
                }
            })
            return Swal.fire({
                title: 'Successfully Update',
                type: 'info',
                text: `${response.data.set_date}`,
                timer: 3000,
            })
        } catch (error) {
            console.log('This is set date error', error)
        }
    }
}