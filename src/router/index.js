import Vue from 'vue'
import Router from 'vue-router'
import taskRouter from './modules/task'
import nodeRouter from './modules/node'
import vmRouter from './modules/vm'
import userRouter from './modules/user'
import skuRouter from './modules/sku'
import policyRouter from './modules/policy'
import ordersRouter from './modules/orders'
import reportRouter from './modules/report'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect:'/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '帝可得', icon: 'home' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const asyncRoutes = [
  taskRouter,
  nodeRouter,
  vmRouter,
  userRouter,
  skuRouter,
  policyRouter,
  ordersRouter,
  reportRouter
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes,...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
