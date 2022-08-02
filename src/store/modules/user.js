import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

import { getVerificationCode } from '@/api/user'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  verificationCode: '',
  randomCode:'',
  userInfo:{}
}

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  GETVERFICATIONCODE(state, payload) {
    state.verificationCode = payload
  },
  GETRANDOMCODE(state,payload){
    state.randomCode=payload
  },
  SET_USERINFO(state,info){
    state.userInfo=info.data
  }
}

const actions = {
  async GetVerificationCode(context) {
    const code = Math.floor(Math.random()*10) 
    context.commit('GETRANDOMCODE',code)
    const res = await getVerificationCode(code)
    console.log(res)
    // result为接收到的二进制流
    const imgBase64 = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte)  =>
     data + String.fromCharCode(byte), ''))
    console.log(imgBase64)
    context.commit('GETVERFICATIONCODE', imgBase64)
  }, 
  async setUserInfo(context,info){
    context.commit('SET_USERINFO', await info)
  }
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

