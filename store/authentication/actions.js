import * as types from './mutation-types'
import Swal from 'sweetalert2'
import gql from 'graphql-tag'

export default{
    async verify_login({ commit }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($input: loginInput!){
                        verify_login(input: $input)
                    }
                `,
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
            if(error == 'Error: GraphQL error: Password Not Same') displayError = '密碼錯囉...!'
            else if(error == 'Error: GraphQL error: Email Not Found') displayError = '找不到這個Email...!'
            commit(types.SET_VERIFY, false)
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: '麻煩在試一次 !',
                timer: 3000,
            })
        }
    },
    async fetchToken({ commit }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($code: String!){
                       login(code: $code){
                    	access_token
                        refresh_token
                        access_token_expirationDate
                        refresh_token_expirationDate
                      }
                    }
                `,
                variables: {
                   "code": params
                }
            })
            this.app.$cookies.set('album_access_token', response.data.login.access_token)
            this.app.$cookies.set('album_access_token_expirationDate', response.data.login.access_token_expirationDate)
            this.app.$cookies.set('album_refresh_token', response.data.login.refresh_token)
            this.app.$cookies.set('album_refresh_token_expirationDate', response.data.login.refresh_token_expirationDate)
            return commit(types.SET_INVALID, false)
        } catch (error) {
            let displayError
            commit(types.SET_INVALID, true)
            if(error == 'Error: GraphQL error: Code Not Found Or Typo') displayError = '驗證碼輸入錯囉...!'
            return Swal.showValidationMessage(`${displayError}`)
        }
    },
    async verify_signup({ commit }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($input: signupInput!){
                      verify_signup(input: $input)
                    }
                `,
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
            if(error == 'Error: GraphQL error: Email Duplicate') displayError = '這個Email已經被註冊囉...!'
            commit(types.SET_VERIFY, false)
            return Swal.fire({
                type: 'error',
                title: `${displayError}`,
                text: '麻煩使用另外一個Email帳號 !',
                timer: 3000,
            })
        }
    },
    async signup({ commit }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($code: String!){
                        signup(code: $code){
		                    access_token
                            refresh_token
                            access_token_expirationDate
                            refresh_token_expirationDate
                        }
                    }
                `,
                variables: {
                    "code": params
                 }
            })
            this.app.$cookies.set('album_access_token', response.data.signup.access_token)
            this.app.$cookies.set('album_access_token_expirationDate', response.data.signup.access_token_expirationDate)
            this.app.$cookies.set('album_refresh_token', response.data.signup.refresh_token)
            this.app.$cookies.set('album_refresh_token_expirationDate', response.data.signup.refresh_token_expirationDate)
            return commit(types.SET_INVALID, false)
        } catch (error) {
            let displayError
            commit(types.SET_INVALID, true)
            if(error == 'Error: GraphQL error: Code Not Found Or Typo') displayError = '驗證碼輸入錯囉...!'
            return Swal.showValidationMessage(`${displayError}`)
        }
    },
    async forget({ commit }, params){
        try {
            let response = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($email: String!){
                        forget(email: $email)
                    }
                `,
                variables: {
                    "email": params
                }
            })
            if(response.data.forget !== '') return commit(types.SET_PASSWORD, true)
            else return commit(types.SET_PASSWORD, false)
        } catch (error) {
            commit(types.SET_PASSWORD, false)
            commit(types.SET_VERIFY, false)
            commit(types.SET_INVALID, true)
            let displayError
            if(error == 'Error: GraphQL error: Email Not Found') displayError = '找不到這個Email耶..註冊過了嗎?'
            return Swal.showValidationMessage(`${displayError}`)
        }
    },
    async initAuth({ commit }, params){
        try {
            let access_token = params.$cookies.get('album_access_token')
            let access_token_expirationDate = params.$cookies.get('album_access_token_expirationDate')
            let refresh_token = params.$cookies.get('album_refresh_token')
            let refresh_token_expirationDate = params.$cookies.get('album_refresh_token_expirationDate')
            let Idp_company = params.$cookies.get('Idp')
            
            if(!Idp_company){
                if(!access_token && !refresh_token) {
                    commit(types.SET_INVALID, true)
                    return commit(types.SET_VERIFY, false)
                }
                if(access_token){
                    if(new Date().getTime() > Number.parseInt(access_token_expirationDate) || !access_token){
                        let refetch = await params.app.apolloProvider.defaultClient.query({
                            query:gql`
                                query {
                                    getRefresh{
                                        access_token
                                        access_token_expirationDate
                                    }
                                }`
                        })
                        params.$cookies.set('album_access_token', refetch.data.getRefresh.access_token)
                        params.$cookies.set('album_access_token_expirationDate', refetch.data.getRefresh.access_token_expirationDate)
                    } else if(new Date().getTime() > Number.parseInt(refresh_token_expirationDate) || !refresh_token){
                        let invalid = await params.app.apolloProvider.defaultClient.mutate({
                            mutation: gql`
                                mutation{
                                    invalidateToken
                                }
                            `
                        })
                        commit(types.SET_INVALID, invalid.data.invalidateToken)
                        params.$cookies.removeAll()
                        return commit(types.SET_VERIFY, false)
                    }
                    commit(types.SET_INVALID, false)
                    return commit(types.SET_VERIFY, true)
                }
            }

            switch (Idp_company) {
                case 'google':
                    let googleExpCookie = params.req.headers.cookie.split(';').find((c) => c.trim().startsWith('google_expirationDate='))
                    let googleExp = googleExpCookie.split('=')[1]
                    if(new Date().getTime() > Number.parseInt(googleExp)){
                        commit(types.SET_VERIFY, false)
                        let invalid = await params.app.apolloProvider.defaultClient.mutate({
                            mutation: gql`
                                mutation{
                                    invalidateToken
                                }
                            `
                        })
                        commit(types.SET_INVALID, invalid.data.invalidateToken)
                        return params.$cookies.removeAll()
                    }
                    commit(types.SET_INVALID, false)
                    return commit(types.SET_VERIFY, true)

                case 'facebook':
                    let facebookExpCookie = params.req.headers.cookie.split(';').find((c) => c.trim().startsWith('facebook_expirationDate='))
                    let facebookExp = facebookExpCookie.split('=')[1]
                    if(new Date().getTime() > Number.parseInt(facebookExp)){
                        commit(types.SET_VERIFY, false)
                        let invalid = await params.app.apolloProvider.defaultClient.mutate({
                            mutation: gql`
                                mutation{
                                    invalidateToken
                                }
                            `
                        })
                        commit(types.SET_INVALID, invalid.data.invalidateToken)
                        return params.$cookies.removeAll()
                    }
                    commit(types.SET_INVALID, false)
                    return commit(types.SET_VERIFY, true)
            }
        } catch (error) {
            console.log('authentication initAuth error', error)
            return commit(types.SET_VERIFY, false)
        }
    },
    async logout({ commit }){
        try {
            commit(types.SET_VERIFY, false)
            let invalid = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation{
                        invalidateToken
                    }
                `
            })
            commit(types.SET_INVALID, invalid.data.invalidateToken)
            this.app.$cookies.removeAll()
            return localStorage.clear()
        } catch (error) {
            console.log('The logout error', error)
            commit(types.SET_INVALID, true)
            return commit(types.SET_VERIFY, false)
        }
    },
    async googleLogin({ commit, dispatch }, params){
        try {
            this.app.$cookies.set('google_token', params.qc.access_token)
            this.app.$cookies.set('google_expirationDate', params.qc.expires_at)
            this.app.$cookies.set('Idp', params.qc.idpId)
            let user = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($user: String!){
                        google_login(googleUser: $user){
                            access_token
                            id
                            avatar
                            username
                            nickname
                            gender
                            birthday
                            privacy
                        }
                    }
                `,
                variables: {
                    "user": params.qc.id_token
                }
            })
            this.app.$cookies.set('album_access_token', user.data.google_login.access_token)
            commit('admin/SET_ID', user.data.google_login.id, { root: true })
            commit('admin/SET_AVATAR', user.data.google_login.avatar, { root: true })
            commit('admin/SET_FIRST', user.data.google_login.username.split(' ')[0], { root: true })
            commit('admin/SET_LAST', user.data.google_login.username.split(' ')[1], { root: true })
            commit('admin/SET_NICKNAME', user.data.getMe.nickname, { root: true })
            commit('admin/SET_GENDER', user.data.google_login.gender, { root: true })
            commit('admin/SET_DATE', user.data.google_login.birthday, { root: true })
            commit('admin/SET_PRIVACY', user.data.google_login.privacy, { root: true })
            await dispatch('books/fetchBookList', null, { root: true })
            commit(types.SET_VERIFY, true)
            return commit(types.SET_INVALID, false)
        } catch (error) {
            console.log('google login error', error)
            commit(types.SET_INVALID, true)
            return commit(types.SET_VERIFY, false)
        }
    },
    async facebookLogin({ commit, dispatch }, params){
        try {
            if(params.fbAuth){
                this.app.$cookies.set('facebook_token', params.fbAuth.authResponse.access_token)
                this.app.$cookies.set('facebook_expirationDate', params.fbAuth.authResponse.data_access_expiration_time)
                this.app.$cookies.set('Idp', params.fbAuth.authResponse.graphDomain)                
            }
            let user = await this.app.apolloProvider.defaultClient.mutate({
                mutation: gql`
                    mutation($user: String!){
                        facebook_login(facebookUser: $user){
                            access_token
                            id
                            avatar
                            username
                            nickname
                            gender
                            birthday
                            privacy
                        }
                    }
                `,
                variables: {
                    "user": JSON.stringify(params.fbUser)
                }
            })
            this.app.$cookies.set('album_access_token', user.data.facebook_login.access_token)
            commit('admin/SET_ID', user.data.facebook_login.id, { root: true })
            commit('admin/SET_AVATAR', user.data.facebook_login.avatar, { root: true })
            commit('admin/SET_FIRST', user.data.facebook_login.username.split(' ')[0], { root: true })
            commit('admin/SET_LAST', user.data.facebook_login.username.split(' ')[1], { root: true })
            commit('admin/SET_NICKNAME', user.data.getMe.nickname, { root: true })
            commit('admin/SET_GENDER', user.data.facebook_login.gender, { root: true })
            commit('admin/SET_DATE', user.data.facebook_login.birthday, { root: true })
            commit('admin/SET_PRIVACY', user.data.facebook_login.privacy, { root: true })
            await dispatch('books/fetchBookList', null, { root: true }) 
            commit(types.SET_VERIFY, true)
            return commit(types.SET_INVALID, false)
        } catch (error) {
            console.log('Fb login error', error)
            commit(types.SET_INVALID, true)
            return commit(types.SET_VERIFY, false)
        }
    }
}