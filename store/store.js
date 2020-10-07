import Vue from 'vue'
import Vuex from 'vuex'
import modA from '~/store/modA'
import books from '~/store/books'
import authentication from '~/store/authentication'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules:{
            modA,
            books,
            authentication
        }
    })
}

export default store