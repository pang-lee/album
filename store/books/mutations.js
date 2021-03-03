import * as types from './mutation-types'

export default {
    [types.SET_BOOKTITLE](state, data){
        state.book_info.title = data
    },
    [types.SET_BOOKPAGE](state, data){
        state.book_info.page = data
    },
    [types.SET_BOOKHEADER](state, data){
        state.book_info.header = data
    },
    [types.SET_BOOKTEXT](state, data){
        state.book_info.text = data
    },
    [types.SET_BOOKIMG](state, data){
        state.book_info.img = window.URL.createObjectURL(new Blob([data], { type: 'image/*' }))
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
    },
    [types.CLEAR_PAGE_DATA](state, _){
        state.book_info.title = ''
        state.book_info.header = ''
        state.book_info.text = ''
        state.book_info.img = ''
        state.book_info.photo.grayscale = 0
        state.book_info.photo.sepia = 0
        state.book_info.photo.saturate = 1
        state.book_info.photo.hueRotate = 0
        state.book_info.photo.invert = 0
        state.book_info.photo.brightness = 1
        state.book_info.photo.contrast = 1
        state.book_info.photo.blur = 0
        state.book_info.options[1].href = ''
        state.book_info.options[2].href = ''
        state.book_info.options[3].href = ''
        
    },
    [types.CLEAR_ALL](state, _){
        state.book_info = {
            title: '',
            page: 1,
            header: '',
            text: '',
            img: '',
            photo:{
                grayscale: 0,
                sepia: 0,
                saturate: 1,
                hueRotate: 0,
                invert: 0,
                brightness: 1,
                contrast: 1,
                blur: 0,
                suffix: {
                  hueRotate: 'deg',
                  blur: 'px'
                }
            },
            options: [
                { title: 'Update Image' },
                { title: 'Add Post Link', href: '' },
                { title: 'Add Live Stream Link', href: '' },
                { title: 'Add Video Link', href: ''}
            ]
        }
    },
    [types.PRIVACY](state, data){
        state.privacy_value = data
    }
}