import Layout from '@/layout'
export default {
  path: '/report',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/report'),  
      meta: { title: '对账统计', icon: 'duizhang' },

    }
  ]
}
