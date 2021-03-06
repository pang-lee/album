import * as types from './mutation-types'

export default {
    [types.FETCH_BOOK_LIST](state, data){
        state.bookList = data
    },
    [types.CREATE_BOOK](state, data){
        state.bookList.push({
            id: data,
            total_page: 1,
            share: true,
            booktitle: '',
            bookpage:[]
        })
    },
    [types.SET_BOOKTITLE](state, data){
        state.bookList.find(element => element.id === data.which_id).booktitle = data.value
    },
    [types.SET_BOOKPAGE](state, data){
        let add_page = state.bookList.find(element => element.id === data.which_id)
        add_page.total_page += 1
        add_page.bookpage.push({
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
                { title: '更換相片' },
                { title: '設定文章連結', href: '' },
                { title: '設定直播連結', href: '' },
                { title: '設定影片連結', href: ''}
            ]
        })
    },
    [types.SET_BOOKHEADER](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].header = data.value
    },
    [types.SET_BOOKPAGEIMG](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].img = data.value
    },
    [types.SET_BOOKTEXT](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].text = data.value
    },
    [types.SET_BOOKIMG](state, { which_id, which_page, value }){
        let theBook = state.bookImg.find(element => element.id === which_id)
        if(!theBook) return state.bookImg.push({ id: which_id, [`pages${which_page}`]: window.URL.createObjectURL(new Blob([value], { type: 'image/*' }))})
        theBook[`pages${which_page}`] =  window.URL.createObjectURL(new Blob([value], { type: 'image/*' }))
    },
    [types.SET_IMAGE_FROM_ACTION](state, params){
        state.bookImg = params
    },
    [types.SET_GRAYSCALE](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.grayscale = data.value
    },
    [types.SET_SEPIA](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.sepia = data.value
    },
    [types.SET_SATURATE](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.saturate = data.value
    },
    [types.SET_HUEROTATE](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.hueRotate = data.value
    },
    [types.SET_INVERT](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.invert = data.value
    },
    [types.SET_BRIGHTNESS](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.brightness = data.value
    },
    [types.SET_CONTRAST](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.contrast = data.value
    },
    [types.SET_BLUR](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].photo.blur = data.value
    },
    [types.SET_POSTLINK](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].options[1].href = data.value
    },
    [types.SET_LIVESTREAMLINK](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].options[2].href = data.value
    },
    [types.SET_VIDEOLINK](state, data){
        state.bookList.find(element => element.id === data.which_id).bookpage[data.which_page].options[3].href = data.value
    },
    [types.SELECTED_SHARE](state, data){
        state.bookList.find(element => element.id === data.which_id).share = data.value
    }
}