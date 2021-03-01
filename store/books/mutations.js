import * as types from './mutation-types'

export default {
    [types.SET_BOOKTITLE](state, data){
        state.book_info.title = data
    },
    [types.SET_BOOKPAGE](state, data){
        console.log('mu',data)
        state.book_info.page = data
    },
    [types.SET_BOOKHEADER](state, data){
        state.book_info.header = data
    },
    [types.SET_BOOKTEXT](state, data){
        state.book_info.text = data
    },
    [types.SET_BOOKIMG](state, data){
        state.book_info.img =  window.URL.createObjectURL(new Blob([data], { type: 'image/*' }))
    },
    [types.SET_GRAYSCALE](state, data){
        state.book_info.photo.grayscale = data
    },
    [types.SET_SEPIA](state, data){
        state.book_info.photo.sepia = data
    },
    [types.SET_SATURATE](state, data){
        state.book_info.photo.saturate = data
    },
    [types.SET_HUEROTATE](state, data){
        state.book_info.photo.hueRotate = data
    },
    [types.SET_INVERT](state, data){
        state.book_info.photo.invert = data
    },
    [types.SET_BRIGHTNESS](state, data){
        state.book_info.photo.brightness = data
    },
    [types.SET_CONTRAST](state, data){
        state.book_info.photo.contrast = data
    },
    [types.SET_BLUR](state, data){
        state.book_info.photo.blur = data
    },
    [types.SET_POSTLINK](state, data){
        state.book_info.options[1].href = data
    },
    [types.SET_LIVESTREAMLINK](state, data){
        state.book_info.options[2].href = data
    },
    [types.SET_VIDEOLINK](state, data){
        state.book_info.options[3].href = data
    }
}