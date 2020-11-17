export default{
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
                    { link: '/profile/sticker', data: 'sticker' },
                    { link: '/profile/self2', data: 'a' },
                    { link: '/profile/self3', data: 'c' },
                ]
            case 'Setting':
                return [
                    { link: '/setting/self1', data: 'c' },
                    { link: '/setting/self2', data: 'b' },
                    { link: '/setting/self3', data: 'a' },
                ]
            default: return [
                { link: '/dashboard/self1', data: 'a' },
                { link: '/dashboard/self2', data: 'b' },
                { link: '/dashboard/self3', data: 'c' },
            ]
        }
    }
}