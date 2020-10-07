import * as types from './mutation-types'

export default{
    actionModule({ commit }, params){
        commit(types.SET_MODULE, params)
        commit(types.SET_NAME, params.name)
    }
}