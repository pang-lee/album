import * as types from './mutation-types'

export default {
    // [types.SET_TOKEN](state, data){
    //     state.token = data
    // },
    [types.SET_VERIFY](state, data){
        state.success_verify = data
    },
    [types.SET_PASSWORD](state, data){
        state.reset_password = data
    }
}