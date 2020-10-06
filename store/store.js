import Vue from 'vue'
import Vuex from 'vuex'
import modA from '~/store/modA'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules:{
            modA
        }
    })
}

export default store