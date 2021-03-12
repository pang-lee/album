import * as icon from '@mdi/js'

export default{
    user: state => state.user_info,
    sidestate: state => state.sidebar_status,
    sidebar: (state, _, __, rootGetters) => {
        switch (state.sidebar_status) {
            case 'Dashboard':
                let list = rootGetters['books/bookList']
                let arr = []
                for(let i in list) {
                    arr[i] = { link: '/dashboard/' + list[i].id , data: list[i].pages1.title }
                }
                return arr
            case 'Profile':
                return [
                    { link: '/profile/sticker', data: 'sticker', icon: icon.mdiStickerCircleOutline},
                    { link: '/profile/information', data: 'profile', icon: icon.mdiBookAccountOutline }
                ]
            case 'Setting':
                return [
                    { link: '/setting/privacy', data: 'privacy', icon: icon.mdiAccountLockOutline },
                    { link: '/setting/language', data: 'language', icon: icon.mdiEarth },
                ]
        }
    }
}