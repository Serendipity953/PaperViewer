
import Vue from "vue";
import Router from 'vue-router';
//import { component } from "vue/types/umd";
//import { reject,resolve } from "core-js/fn/promise";
//import Home from '../components/Home.vue';

import { getToken } from '../utils/setToken.js'
Vue.use(Router);
const router = new Router({
  routes: [
    //公共路由
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      component: () => import('@/components/login'),//路由懒加载,
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: () => import('@/components/login'),//路由懒加载,

    },
    {
      path: '*',
      name: 'NotFound',
      hidden: true,
      component: () => import('@/components/NotFound'),//路由懒加载,
      //component: resolve =>require(['@/components/NotFound'],resolve)//路由异步加载

    },
  
    //学生端路由
    {
      path: '/Homestudent',
      name: '毕业生信息',
      meta: {
        requiresAuth: true,
        role:0
      },
      children: [
        {
          path: '/Homestudent/PersonInfo',
          name: '个人信息',
          component: () => import('@/components/student/PersonInfo'),
          meta: {
            role:0
          },
        },

        {
          path: '/Homestudent/upload',
          name: '材料上传',
          component: () => import('@/components/student/Upload'),
          meta: {
            role:0
          },
        },
        {
          path: '/Homestudent/GraduationProgress',
          name: '毕业进度',
          component: () => import('@/components/student/GraduationProgress'),
          meta: {
            role:0
          },
        },
      ],
      component: () => import('@/components/Home'),//路由懒加载,
    },
    //导师端路由
    {
      path: '/Homementor',
      name: '毕业学生管理',
      meta: {
        requiresAuth: true,
        role:1
      },
      children: [
        {
          path: '/Homementor/StudentList',
          name: '我的学生',
          component: () => import('@/components/mentor/StudentList'),
          meta: {
            role:1
          },
        },
      ],
      component: () => import('@/components/Home'),//路由懒加载,
    },
    //教务路由
    {
      path: '/Homeoffice',
      name: '学生列表',
      meta: {
        requiresAuth: true,
        role:2
      },
      children: [
        {
          path: '/Homeoffice/StudentList',
          name: '学生名单',
          component: () => import('@/components/AcademicAffairsOffice/StudentList'),
          meta: {
            role:2
          },
          
        },
      ],
      component: () => import('@/components/Home'),//路由懒加载,
    },
  ],
  mode: 'history'
});
router.beforeEach((to, from, next) => {
  //判断当前路由是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var userrole = getToken('userrole')
    //console.log(userrole)
    if ((userrole!=0)&&(userrole!=1)&&(userrole!=2)) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    else {
      if(to.meta.role==userrole){
        next()
      }
      else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
      
    }
  }
  else {
    next()
  }
})

export default router