import * as types from './mutation-types'

export default {
    [types.SET_IMAGE](state, data){
        state.image = data
    }
}