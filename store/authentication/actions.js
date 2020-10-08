import registergql from '~/assets/gql/register.gql'
import logingql from '~/assets/gql/login.gql'
import * as types from './mutation-types'
import Swal from 'sweetalert2'

export default{
    async fetchToken({ commit }, params){
        try {
            const response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: logingql,
                variables: {
                    "input": {
                        "email": params.email,
                        "password": params.password
                    }
                }
            })
            commit(types.SET_TOKEN, response.data.login)
        } catch (error) {
            let displayError
            if(error == 'Error: GraphQL error: Password Not Same') displayError = 'Password Incorrect!'
            else if(error == 'Error: GraphQL error: Email Not Found') displayError = 'Email Not Found!'
            Swal.fire({
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
            Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: 'Please Try Again!',
                timer: 2500,
            })
        }
    }
}