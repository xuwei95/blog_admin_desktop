import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/main/index',
    name: 'Admin',
    hidden: true,
    meta: { title: '主页', icon: 'example' },
    children: [{
      path: 'admin',
      component: () => import('@/views/main/index'),
      meta: { title: '主页', icon: 'example' }
    }]
  },
  {
    path: '/main',
    component: Layout,
    redirect: '/main/index',
    name: 'Main',
    meta: { title: '主页', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '控制台',
        component: () => import('@/views/main/index'),
        meta: { title: '控制台', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: { title: '用户', icon: 'user' },
    children: [
      {
        path: 'index',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/sys_setting',
    name: 'Setting',
    meta: {
      title: '设置',
      icon: 'example'
    },
    children: [
      {
        path: 'sys_setting',
        component: () => import('@/views/setting/sys_setting/sys_setting/index'),
        name: '网站设置',
        meta: { title: '网站设置', icon: 'example' }
      },
      {
        path: 'mail_setting',
        component: () => import('@/views/setting/sys_setting/mail_setting/index'),
        name: '邮件设置',
        meta: { title: '邮件设置', icon: 'example' }
      },
      {
        path: 'my_setting',
        component: () => import('@/views/setting/my_setting/my_setting/index'),
        name: '我的信息',
        meta: { title: '我的信息', icon: 'user' }
      },
      {
        path: 'password_setting',
        component: () => import('@/views/setting/my_setting/password_setting/index'),
        name: '修改密码',
        meta: { title: '修改密码', icon: 'password' }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'table' },
    children: [
      {
        path: 'write',
        name: '写文章',
        component: () => import('@/views/content/write'),
        meta: { title: '写文章', icon: 'form' }
      },
      {
        path: 'category',
        name: '分类管理',
        component: () => import('@/views/content/category'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'article',
        name: '文章管理',
        component: () => import('@/views/content/article'),
        meta: { title: '文章管理', icon: 'table' }
      },
      {
        path: 'comments',
        name: '评论管理',
        component: () => import('@/views/content/comments'),
        meta: { title: '评论管理', icon: 'table' }
      },
      {
        path: 'recly',
        name: '回收站',
        component: () => import('@/views/content/recly'),
        meta: { title: '回收站', icon: 'table' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/log/sys_log',
    name: 'Log',
    meta: { title: '日志管理', icon: 'nested' },
    children: [
      {
        path: 'sys_log',
        name: '系统日志',
        component: () => import('@/views/log/sys_log'),
        meta: { title: '系统日志', icon: 'nested' }
      },
      {
        path: 'user_log',
        name: '用户日志',
        component: () => import('@/views/log/user_log'),
        meta: { title: '用户日志', icon: 'nested' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

