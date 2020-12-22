import * as types from './mutation-types'

export default {
    [types.SET_USER](state, data){
        console.log("pass in data", data)
        state.user_info.first =  data.username.split(' ')[0]
        state.user_info.last = data.username.split(' ')[1]
    },
    [types.SET_FIRST](state, data){
        state.user_info.first = data
    },
    [types.SET_LAST](state, data){
        state.user_info.last = data
    },
    [types.SET_GENDER](state, data){
        state.user_info.gender = data
    },
    [types.SET_DATE](state, data){
        state.user_info.date = data
    },
    [types.SET_SIDEBAR_STATUS](state, data){
        state.sidebar_status = data
    }
}