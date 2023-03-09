import {createRouter, createWebHistory} from 'vue-router'
import Layout from '../views/Layout.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'echarts',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../components/Echarts.vue')
                },
                {
                    path: '/bcharts',
                    name: 'bcharts',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../components/Bcharts.vue')
                },
                {
                    path: '/server',
                    name: 'server',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../components/Server.vue')
                },
                {
                    path: '/table',
                    name: 'table',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../components/Table.vue')
                },
            ]
        },
        {
            path: '/signin',
            name: 'signin',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Signin.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Signup.vue')
        },
    ]
})

export default router
