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
                            nickname
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
            commit(types.SET_NICKNAME, user.data.getMe.nickname)
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
            if(!params.first || !params.last) return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: '看來你少輸入東西囉 !',
                timer: 3000,
            })
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($input: userNameInput!){
                        set_username(input: $input)
                    }
                `,
                variables: {
                    input:{
                        "name": params.first + ' ' + params.last,
                        "nickname": params.nickname
                    }
                }
            })
            return Swal.fire({
                title: `姓名: ${getters.user.first} ${getters.user.last}
                        暱稱: ${getters.user.nickname}`,
                type: 'info',
                text: `${response.data.set_username}`,
                timer: 3000,
            })
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Missing Somethings') displayError = '看來你少輸入東西囉 !'
            return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: `${displayError}`,
                timer: 3000,
            })
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
                title: '密碼重設 !',
                type: 'info',
                text: `${response.data.set_password}`,
                timer: 3000,
            })
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Missing Somethings') displayError = '看來你少輸入東西囉 !'
            return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: `${displayError}`,
                timer: 3000,
            })
        }
    },
    async setgender(_, params){
        try {
            if(!params) return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: '看來你少輸入東西囉 !',
                timer: 3000,
            })
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
                title: '性別重設 !',
                type: 'info',
                text: `${response.data.set_gender}`,
                timer: 3000,
            })
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Missing Somethings') displayError = '看來你少輸入東西囉 !'
            return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: `${displayError}`,
                timer: 3000,
            })
        }
    },
    async setdate(_, params){
        try {
            if(!params) return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: '看來你少輸入東西囉 !',
                timer: 3000,
            })
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
                title: '生日重設 !',
                type: 'info',
                text: `${response.data.set_date}`,
                timer: 3000,
            })
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Missing Somethings') displayError = '看來你少輸入東西囉 !'
            return Swal.fire({
                type: 'error',
                title: '噢噢...',
                text: `${displayError}`,
                timer: 3000,
            })
        }
    },
    async setprivacy({ getters }, params){
        try {
            return await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($private_value: String!){
                        set_privacy(privacy_value: $private_value)
                    }
                `,
                variables: {
                    "private_value": JSON.stringify({ userId: params, privacy: getters.user.privacy, book_share: getters.privacy_value.share_btn })
                }
            })
        } catch (error) {
            console.log('This is set privacy error', error)
        }
    }
}