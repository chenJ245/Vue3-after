import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'

import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import Article from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  Article,
  ArticleCreaterRouter
]
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
