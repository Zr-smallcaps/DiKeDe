import Layout from '@/layout'
export default {
  path: '/policy',
  component: Layout,
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/policy'),
      meta: { title: '策略管理' }
    }
  ]
}
