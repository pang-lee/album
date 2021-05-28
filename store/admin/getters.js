import * as icon from '@mdi/js'

export default{
    user: state => state.user_info,
    privacy_value: (state, _, __, rootGetters) => {
        switch(state.user_info.privacy){
            case '全部分享':
                return { notDisplay: true, share_btn: true }
            case '分享我選擇的':
                let selected = rootGetters['books/bookList']
                let arr = []
                for(let i in selected) arr[selected[i].id] = selected[i].share
                return { notDisplay: false, share_btn: arr }
            case '全部都不要分享':
                return { notDisplay: true, share_btn: false}
        }
    },
    sidestate: state => state.sidebar_status,
    sidebar: (state, _, __, rootGetters) => {
        switch (state.sidebar_status) {
            case '作品集':
                let list = rootGetters['books/bookList']
                let arr = []
                for(let i in list) arr[i] = { link: '/dashboard/' + list[i].id , data: list[i].booktitle }
                return arr
            case '個人資料':
                return [
                    { link: '/profile/sticker', data: '頭像', icon: icon.mdiStickerCircleOutline},
                    { link: '/profile/information', data: '個資設定', icon: icon.mdiBookAccountOutline }
                ]
            case '設定':
                return [
                    { link: '/setting/privacy', data: '隱私', icon: icon.mdiAccountLockOutline }
                ]
        }
    }
}