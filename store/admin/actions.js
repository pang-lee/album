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
                            privacy
                        }
                    }
                `
            })
            commit(types.SET_ID, user.data.getMe.id)
            commit(types.SET_FIRST, user.data.getMe.username.split(' ')[0])
            commit(types.SET_LAST, user.data.getMe.username.split(' ')[1])
            commit(types.SET_GENDER, user.data.getMe.gender)
            commit(types.SET_DATE, user.data.getMe.birthday)
            commit(types.SET_PRIVACY, user.data.getMe.privacy)
            await dispatch('fetchImage')
            await dispatch('books/fetchBookList', _, { root: true })
        } catch (error) {
            console.log("admin fetchMe error", error)
        }
    },
    async fetchImage({ commit }, _){
        try {
            let avatar = await this.$axios.$get('/upload/avatar')
            if(avatar == 'This is koa app.js middleware') return commit(types.SET_AVATAR, '')
            commit(types.SET_AVATAR, 'data:image/*;base64,' + avatar)
        } catch (error) {
            console.log('fetch image error', error)
        }
    },
    async setname({ getters }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($name: String!){
                        set_username(name: $name)
                    }
                `,
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
                mutation: gql`
                    mutation($password: String!){
                        set_password(password: $password)
                    }
                `,
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
                mutation: gql`
                    mutation($gender: String!){
                        set_gender(gender: $gender)
                    }
                `,
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
                mutation: gql`
                    mutation($date: String!){
                        set_date(date: $date)
                    }
                `,
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
    },
    async setprivacy({ getters }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($private_value: String!){
                        set_privacy(privacy_value: $private_value)
                    }
                `,
                variables: {
                    "private_value": JSON.stringify({ userId: params, privacy: getters.user.privacy, book_share: getters.privacy_value.share_btn })
                }
            })
            console.log('this is set privacy', response)
        } catch (error) {
            console.log('This is set privacy error', error)
        }
    }
}