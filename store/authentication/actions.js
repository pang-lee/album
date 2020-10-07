import logingql from '~/assets/gql/login.gql'
import * as types from './mutation-types'

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
            console.log(response.data.login)
            commit(types.SET_TOKEN, response.data.login)
        } catch (error) {
            console.log(error)
        }
    }
}