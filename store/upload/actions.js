import * as types from './mutation-types'

export default{
    async fetchSave({ commit }, params){
        try {
            commit(types.SET_IMAGE, params)
        } catch (error) {
            console.log('set image error', error)
        }
    }
}