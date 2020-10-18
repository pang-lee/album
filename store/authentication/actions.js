import registergql from '~/assets/gql/register.gql'
import verifygql from '~/assets/gql/verify.gql'
import logingql from '~/assets/gql/login.gql'
import * as types from './mutation-types'
import Swal from 'sweetalert2'

export default{
    async verify({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: verifygql,
                variables: {
                    "input": {
                        "email": params.email,
                        "password": params.password
                    }
                }
            })
            if(response.data.verify !== '') commit(types.SET_VERIFY, true)
            else commit(types.SET_VERIFY, false)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Password Not Same') displayError = 'Password Incorrect!'
            else if(error == 'Error: GraphQL error: Email Not Found') displayError = 'Email Not Found!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 2500,
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
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Code Not Found Or Typo') displayError = 'Code Not Found Or Typo!'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 2500,
            })
        }
    },
    async registration({ commit }, params){
        console.log(params.first + params.last)
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: registergql,
                variables: {
                    "input": {
                        "email": params.email,
                        "password": params.password,
                        "username": params.first + params.last
                    }
                }
            })
            commit(types.SET_TOKEN, response.data.signup)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Email Duplicate') displayError = 'Email Have Been Used!'
            else if(error == 'Error: GraphQL error: Email Not Found') displayError = 'Email Not Found'
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 2500,
            })
        }
    }
}