import { getVerificationCode } from '@/api/user'

const state = {
  verificationCode: '',
  randomCode:'',
  userInfo:{}
}

const mutations = {
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
    // const imgUrl = 'data:image/png;base64' + btoa( new Un)
    // result为接收到的二进制流
    const imgBase64 = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    console.log(imgBase64)
    context.commit('GETVERFICATIONCODE', imgBase64)
  },
 async setUserInfo(context,info){
    context.commit('SET_USERINFO', await info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

