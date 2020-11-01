import registergql from '~/assets/gql/register.gql'
import verloggql from '~/assets/gql/verify_login.gql'
import versingql from '~/assets/gql/verify_signup.gql'
import logingql from '~/assets/gql/login.gql'
import forgetgql from '~/assets/gql/forget.gql'
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
            commit(types.SET_USER, response.data.login)
            this.app.$cookies.set('jwt', response.data.login.token)
            this.app.$cookies.set('expirationDate', new Date().getTime() + 1000*60*60*24)
            setTimeout(() => {
                commit(types.SET_VERIFY, false)
                this.app.$cookies.remove('jwt')
                this.app.$cookies.remove('expirationDate')
            }, 1000*60*60*24)
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
                        "username": params.first + params.last
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
            commit(types.SET_USER, response.data.signup)
            this.app.$cookies.set('jwt', response.data.signup.token)
            this.app.$cookies.set('expirationDate', new Date().getTime() + 1000*60*60*24)
            setTimeout(() => {
                commit(types.SET_VERIFY, false)
                this.app.$cookies.remove('jwt')
                this.app.$cookies.remove('expirationDate')
            }, 1000*60*60*24)
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
    }
}