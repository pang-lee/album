import * as types from './mutation-types'

export default {
    [types.SET_BOOKS](state, data){
        state.books = data
    }
}