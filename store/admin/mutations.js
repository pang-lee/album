import * as types from './mutation-types'

export default {
    [types.SET_SIDEBAR_STATUS](state, data){
        state.sidebar_status = data
    }
}