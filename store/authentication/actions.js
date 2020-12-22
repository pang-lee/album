import registergql from '~/static/gql/register.gql'
import verloggql from '~/static/gql/verify_login.gql'
import versingql from '~/static/gql/verify_signup.gql'
import logingql from '~/static/gql/login.gql'
import forgetgql from '~/static/gql/forget.gql'
import * as types from './mutation-types'
import Swal from 'sweetalert2'

export default{
    async verify_login({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: verloggql,
                variables: {
                    "input": {
                        "email": params.email,
                        "password": params.password
                    }
                }
            })
            if(response.data.verify !== '') return commit(types.SET_VERIFY, true)
            else return commit(types.SET_VERIFY, false)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Password Not Same') displayError = 'Password Incorrect!'
            else if(error == 'Error: GraphQL error: Email Not Found') displayError = 'Email Not Found!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 3000,
            })
        }
    },
    async fetchToken({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: logingql,
                variables: {
                   "code": params
                }
            })
            commit(types.SET_TOKEN, response.data.login)
            this.app.$cookies.set('album_access_token', response.data.login.access_token)
            this.app.$cookies.set('album_access_token_expirationDate', new Date().getTime() + 1000 * 60 * 60 * 24)
            this.app.$cookies.set('album_refresh_token', response.data.login.refresh_token)
            this.app.$cookies.set('album_refresh_token_expirationDate', new Date().getTime() + 1000 * 60 * 60 * 24)
            setTimeout(() => {
                commit(types.SET_VERIFY, false)
                this.app.$cookies.remove('album_access_token')
                this.app.$cookies.remove('access_album_access_token_expirationDate')
                this.app.$cookies.remove('album_refresh_token')
                this.app.$cookies.remove('album_refresh_token_expirationDate')
            }, 1000 * 60 * 60 * 24)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Code Not Found Or Typo') displayError = 'Code Not Found Or Typo!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 3000,
            })
        }
    },
    async verify_signup({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: versingql,
                variables: {
                    "input": {
                        "email": params.email,
                        "password": params.password,
                        "username": params.first +  ' ' + params.last
                    }
                }
            })
            if(response.data.verify !== '') return commit(types.SET_VERIFY, true)
            else return commit(types.SET_VERIFY, false)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Email Duplicate') displayError = 'Email Duplicate!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please try another email address!',
                timer: 3000,
            })
        }
    },
    async signup({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: registergql,
                variables: {
                    "code": params
                 }
            })
            commit(types.SET_TOKEN, response.data.signup)
            this.app.$cookies.set('album_access_token', response.data.login.access_token)
            this.app.$cookies.set('album_access_token_expirationDate', new Date().getTime() + 1000 * 60 * 60 * 24)
            this.app.$cookies.set('album_refresh_token', response.data.login.refresh_token)
            this.app.$cookies.set('album_refresh_token_expirationDate', new Date().getTime() + 1000 * 60 * 60 * 24)
            setTimeout(() => {
                commit(types.SET_VERIFY, false)
                this.app.$cookies.remove('album_access_token')
                this.app.$cookies.remove('access_album_access_token_expirationDate')
                this.app.$cookies.remove('album_refresh_token')
                this.app.$cookies.remove('album_refresh_token_expirationDate')
            }, 1000 * 60 * 60 * 24)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Code Not Found Or Typo') displayError = 'Code Not Found Or Typo!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 3000,
            })
        }
    },
    async forget({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: forgetgql,
                variables: {
                    "email": params
                }
            })
            if(response.data.forget !== '') return commit(types.SET_PASSWORD, true)
            else return commit(types.SET_PASSWORD, false)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Email Not Found') displayError = 'Email Not Found!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Have You Registered already?',
                timer: 3000,
            })
        }
    },
    async initAuth({ commit, dispatch }, params){
        try {
            let access_token
            let access_token_expirationDate
            let refresh_token
            let refresh_token_expirationDate

            if(params){
                if (!params.headers.cookie) return null
                let accessCookie = params.headers.cookie.split(';').find((c) => c.trim().startsWith('album_access_token='))
                let refreshCookie = params.headers.cookie.split(';').find((c) => c.trim().startsWith('album_refresh_token='))
                if (!accessCookie || !refreshCookie) return null
                access_token = accessCookie.split('=')[1]
                refresh_token = refreshCookie.split('=')[1]
                access_token_expirationDate =  params.headers.cookie.split(';').find((c) => c.trim().startsWith('album_access_token_expirationDate=')).split('=')[1]
                refresh_token_expirationDate =  params.headers.cookie.split(';').find((c) => c.trim().startsWith('album_refresh_token_expirationDate=')).split('=')[1]
            }
            if (new Date().getTime() > Number.parseInt(access_token_expirationDate) || !access_token) return dispatch('logout')
            commit(types.SET_VERIFY, true)
        } catch (error) {
            console.log('authentication initAuth error', error)
        }
    },
    async logout({ commit }){
        try {
            commit(types.SET_VERIFY, false)
            this.app.$cookies.remove('album_access_token')
            this.app.$cookies.remove('album_access_token_expirationDate')
            this.app.$cookies.remove('album_refresh_token')
            this.app.$cookies.remove('album_refresh_token_expirationDate')
        } catch (error) {
            console.log('authentication logout error', error)
        }
    }
}