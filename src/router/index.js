import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/modelManage',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login')
  },
  {
    path: '/index',
    name: 'index', // 首页
    component: () => import('../views/index/index')
  },
  {
    path: '/modelManage',
    name: 'modelManage', // 模型管理页面
    redirect: '/modelManage/modelDetails',
    component: () => import('../views/modelManage/modelManage'),
    children: [
      {
        path: 'modelDetails',
        name: 'modelDetails', // 模型详情
        component: () => import('../views/modelManage/modelDetails/modelDetails'),
      },
      {
        path: 'modelList',
        name: 'modelList', // 模型列表
        component: () => import('../views/modelManage/modelList/modelList'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
