import axios from 'axios'
// import { Message } from 'element-ui';
import store from '@/store';
import { getTokenTime } from './auth';
import router from '@/router';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
 service.interceptors.request.use(
  // 每次请求都会返回config配置
  config => {
    if (store.state.user.userInfo.token) {
      const CurrentTime = Date.now()
      const times =3*1000
      if(CurrentTime-getTokenTime()>times){
        // token过期
        store.dispatch('user/logout').then(
          router.push('/login')
        )
        return Promise.reject(new Error('登录过期'))
      }else{
        config.headers['Authorization'] = store.state.user.token
      }
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  } 
) 

// 响应拦截器
// service.interceptors.response.use((res)=>{
//   console.log(res)
//   const { success , message , data } = res.data
//   if(success){
//     return data
//   }
//   Message.error(message);
//   return Promise.reject(new Error(message));
// },
// (error)=>{
//   Message.error('系统异常')
//   return Promise.reject(error);
// })

export default service
