import * as types from './mutation-types'

export default {
    [types.SET_BOOKTITLE](state, data){
        state.book_info.title = data
    },
    [types.SET_BOOKHEADER](state, data){
        state.book_info.header = data
    },
    [types.SET_BOOKTEXT](state, data){
        state.book_info.text = data
    }
}