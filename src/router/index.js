import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'
import jwt_decode from 'jwt-decode'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
	{
		path: '/index',
		redirect: '/index/home'
	},
	{
		path: '/',
		redirect: '/index/home'
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
		children: [
			{
				path: 'home',
				component: Home,
				name: 'home'
			},
			{
				path: 'infoshow',
				component: () =>
					import(
						/* webpackChunkName: "Infoshow"*/ '@/views/infoShow'
					),
				name: 'infoshow'
			},
			{
				path: 'fundManage',
				component: () =>
					import(
						/* webpackChunkName: "profile"*/ '@/views/fundManage'
					),
				name: 'fundManage',
				children: [
					{
						path: 'fundlist',
						name: 'fundlist',
						component: () =>
							import(
								/* webpackChunkName: "fundlist"*/ '@/views/fundlist'
							)
					}
				]
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(
				/* webpackChunkName: "LoginAndRegister"*/ '@/views/loginAndRegister'
			)
	},
	{
		path: '/test',
		name: 'Test',
		component: () => import(/* webpackChunkName: "Test"*/ '@/views/test')
	},
	{
		path: '*',
		name: '/404',
		component: () =>
			import(/* webpackChunkName: "NotFound"*/ '@/views/404.vue')
	}
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	console.log('进入到了路由守卫')
	if (to.path === '/login') {
		next()
		return
	}

	//如果用户直接输入index但未登录
	if (!localStorage.getItem('eleToken')) {
		Vue.prototype.$message({
			type: 'warning',
			message: '请先登录，别想弯弯路~'
		})
		next('/login')
		return
	}
	//判断用户token是否过期
	try {
		const tokenDecode = jwt_decode(localStorage.getItem('eleToken'))
		if (!tokenDecode['exp']) {
			Vue.prototype.$message({
				type: 'warning',
				message: '居然没有过期时间，有内奸~~！！'
			})
			//TODO:  感觉可以设置一个牢房界面
			next('/login')
			return
		} else if (parseInt(tokenDecode['exp']) * 1000 <= Date.now()) {
			Vue.prototype.$message({
				type: 'warning',
				message: '身份认证过期，请重新登录'
			})
			next('/login')
			return
		} else if (parseInt(tokenDecode['exp']) * 1000 >= Date.now()) {
			next()
			return
		}
	} catch (err) {
		if (err)
			Vue.prototype.$message({
				type: 'warning',
				message: '别想用技术手段修改用户token~'
			})
	}
})

export default router
