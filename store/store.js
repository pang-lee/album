import Vue from 'vue'
import Vuex from 'vuex'
import books from '~/store/books'
import authentication from '~/store/authentication'
import admin from '~/store/admin'
import upload from '~/store/upload'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules:{
            books,
            authentication,
            admin,
            upload
        }
    })
}

export default store