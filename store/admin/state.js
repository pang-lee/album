const state = () => ({
    user_info: {
        avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        first: 'John',
        last: 'Doe',
        gender: 'Male',
        date: new Date().toISOString().substr(0, 10)
    },
    sidebar_status: 'Dashboard'
})

export default state