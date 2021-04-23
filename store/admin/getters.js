import * as icon from '@mdi/js'

export default{
    user: state => state.user_info,
    privacy_value: (state, _, __, rootGetters) => {
        switch(state.user_info.privacy){
            case 'Share All':
                return { notDisplay: true, share_btn: true }
            case 'Share I Selected':
                let selected = rootGetters['books/bookList']
                let arr = []
                for(let i in selected) arr[selected[i].id] = selected[i].share
                return { notDisplay: false, share_btn: arr }
            case 'Do Not Share Any':
                return { notDisplay: true, share_btn: false}
        }
    },
    sidestate: state => state.sidebar_status,
    sidebar: (state, _, __, rootGetters) => {
        switch (state.sidebar_status) {
            case 'Dashboard':
                let list = rootGetters['books/bookList']
                let arr = []
                for(let i in list) arr[i] = { link: '/dashboard/' + list[i].id , data: list[i].booktitle }
                return arr
            case 'Profile':
                return [
                    { link: '/profile/sticker', data: 'sticker', icon: icon.mdiStickerCircleOutline},
                    { link: '/profile/information', data: 'profile', icon: icon.mdiBookAccountOutline }
                ]
            case 'Setting':
                return [
                    { link: '/setting/privacy', data: 'privacy', icon: icon.mdiAccountLockOutline }
                ]
        }
    }
}