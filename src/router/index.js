import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'

Vue.use(VueRouter)

function checkAccess(to, from, next) {
    let isAuthenticated
    isAuthenticated = !!localStorage.getItem('leadhit-site-id');
    console.log(isAuthenticated)
    if (isAuthenticated) {
        next();
    } else {
        next('/')
    }
}

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: AnalyticsView,
        beforeEnter: checkAccess
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
