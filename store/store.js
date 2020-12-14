import Vue from 'vue'
import Vuex from 'vuex'
import modA from '~/store/modA'
import books from '~/store/books'
import authentication from '~/store/authentication'
import admin from '~/store/admin'
import upload from '~/store/upload'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules:{
            modA,
            books,
            authentication,
            admin,
            upload
        }
    })
}

export default store