import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import settings from './modules/settings'
import createVuexPersisted from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    settings
  },
  getters,
  plugins:[
    createVuexPersisted({
      reducer(state){
        console.log(state,'state')
        return {
          user:{
            token:state.user.token,
            userInfo:state.user.userInfo,
            userId:state.user.userId,
            detailInfo:state.user.detailInfo
          }
        }
      } 
    })
  ]
})

export default store
