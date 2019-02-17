import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import policyInfo from '@/components/policy/policyInfo.vue'
import err401 from '@/components/err/err401.vue'
import auth from '@/components/policy/auth'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [{
    path: '/home',
    component: () => import('@/components/home.vue'),
    meta: {
      hideInMenu: false,
      access: ['role_user']
    },
    children: [{
      path: '/',
      name: 'home',
      meta: {
        title: '',
        hideInMenu: false,
        //access: ['role_user']
      },
      component: policyInfo,
    },
    {
      name: 'claim',
      path: '/claim',
      meta:{
        title: 'claiminfo',
        hideInMenu: 'false',
        access: ['role_user']
      },
      component: () => import('@/components/policy/claim.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login-登录',
      hideInMenu: true
    },
    component: login,
  },
  {
    path: '/err_401',
    name: 'err401',
    component: auth
  }
]
