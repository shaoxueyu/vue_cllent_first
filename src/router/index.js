import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/index',
		name: 'Index',
		component: Index
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "LoginAndRegister"*/"@/views/loginAndRegister")
	},
	{
		path: "*",
		name: "/404",
		component: () => import(/* webpackChunkName: "NotFound"*/"@/views/404.vue")
	}
]

const router = new VueRouter({
	routes
})

export default router
