import { getToken, setToken, removeToken,setTokenTime } from '@/utils/auth'
import {  getVerificationCode ,getUserDetailInfo} from '@/api/user'
import { login } from '@/api/user'

const state = {
  token: '',
  name: '',
  verificationCode: '',
  randomCode:'',
  userInfo:{},
  userId:'',
  detailInfo:{}
}

const mutations = {
  GETVERFICATIONCODE(state, payload) {
    state.verificationCode = payload
  },
  GETRANDOMCODE(state,payload){
    state.randomCode=payload
  },
  SET_USERINFO(state,info){
    state.userInfo=info
    state.userId=info.userId
    state.token=info.token,
    setTokenTime()
  },
  SET_DEATILUSERINFO(state,info){
    state.detailInfo=info
  }
}

const actions = {
  async GetVerificationCode(context) {
    const code = Math.floor(Math.random()*10) 
    context.commit('GETRANDOMCODE',code)
    const res = await getVerificationCode(code)
    // console.log('到的二进制流',res)
    // result为接收到的二进制流
    const imgBase64 = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte)  =>
     data + String.fromCharCode(byte), ''))
    // console.log(imgBase64)
    context.commit('GETVERFICATIONCODE', imgBase64)
  }, 
  async setUserInfo(context,info){
    const res = await login(info)
    context.commit('SET_USERINFO', res.data)
    const userDetailInfo = await getUserDetailInfo(res.data.userId)
    context.commit('SET_DEATILUSERINFO',userDetailInfo.data)
  },
  logout(context){
    context.commit('SET_USERINFO',{})
    context.commit('SET_DEATILUSERINFO',{})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

