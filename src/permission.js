import router from "./router";
import store from "@/store";
import { Message } from 'element-ui';
// 白名单
const whiteList = ['/login','/404']
router.beforeEach((to,from,next)=>{
    // 是否已经登录
    // 1.若已经登录就直接进入 2.如果没有登录就条转到登录页面
   if(store.state.user.token){
        if(!store.state.user.userInfo.userId){
            store.dispatch('user/setUserInfo')
        }
     
      if(to.path==='/login')
        {
            next('/')
        }else{
            next()
        }
   }else{
    if(whiteList.includes(to.path)){
        next()
    }else{
        Message({
            showClose: true,
            message: '请重新登录',
            type: 'warning'
          });
        next('/login')
    }
   }

})