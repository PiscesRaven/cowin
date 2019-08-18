import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      alias: '/login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/user/user.vue'),
          children: [
            { path: '/user/:role', meta: { parentPath: '/user' } },
            {
              path: '/user/:role/:mode',
              component: () => import('./views/user/user_cu.vue'),
            },
          ]
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('./views/category/index.vue'),
          children: [
            { path: '/category/:role', meta: { parentPath: '/category' } },
            {
              path: '/category/:role/:mode',
              component: () => import('./views/category/category_cu.vue'),
            },
            {
              path: '/category/:role/:mode/:mode',
              name: 'categoryOrder',
              component: () => import('./views/category/category_order.vue')
            },
            // {
            //   path: '/category_Add',
            //   name: 'categoryAdd',
            //   component: () => import('./views/category/category_ad.vue')
            // },
            // {
            //   path: '/category_sp',
            //   name: 'categorySp',
            //   component: () => import('./views/category/category_sp.vue')
            // },
            // {
            //   path: '/category_repair',
            //   name: 'categoryOrder',
            //   component: () => import('./views/category/category_repair.vue')
            // }
          ]
        }
      ]
    },
    {
      path: '/category_pop',
      name: 'categoryAdd',
      component: () => import('./views/category/category_order.vue')
    },
  ]
})