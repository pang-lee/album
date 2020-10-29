import * as types from './mutation-types'

export default {
    [types.SET_USER](state, data){
        state.users = data
    },
    [types.SET_VERIFY](state, data){
        state.success_verify = data
    }
}