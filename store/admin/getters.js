import * as icon from '@mdi/js'

export default{
    user: state => state.user_info,
    sidebar: state => {
        switch (state.sidebar_status) {
            case 'Dashboard':
                return [
                    { link: '/dashboard/self1', data: 'a' },
                    { link: '/dashboard/self2', data: 'b' },
                    { link: '/dashboard/self3', data: 'c' },
                ]
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
            default: return [
                { link: '/dashboard/self1', data: 'a' },
                { link: '/dashboard/self2', data: 'b' },
                { link: '/dashboard/self3', data: 'c' },
            ]
        }
    }
}