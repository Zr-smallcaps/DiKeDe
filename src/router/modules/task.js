import Layout from '@/layout'
export default {
  path: '/task',
  component: Layout,
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [
    {
      path: 'bussiness',
      component: () => import('@/views/task/bussiness'),
      meta: { title: '运营工单' }
    },
    {
        path: 'operation',
        component: () => import('@/views/task/operation'),
        meta: { title: '运维工单' }
      }
  ]
}
