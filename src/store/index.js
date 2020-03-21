import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
	get SET_AUTHENTICATED() {
		return 'SET_AUTHENTICATED'
	},
	get SET_USER() {
		return 'SET_USER'
	}
}
const state = {
	isAuthenticated: true
}
const getters = {
	isAutheticated: state => state.isAuthenticated,
	user: state => state.user
}
const mutations = {
	//身份认证
	[types.SET_AUTHENTICATED](state, { isAuthenticated }) {
		if (isAuthenticated) {
			state.isAuthenticated = isAuthenticated
		} else {
			state.isAuthenticated = false
		}
	},
	//用户信息
	[types.SET_USER](state, { user }) {
		if (user) state.user = user
		else state.user = {}
	}
}
const actions = {
	//设置身份认证
	set_authenticated({ commit }, isAuthenticated) {
		commit(types.SET_AUTHENTICATED, { isAuthenticated })
	},
	// 用户信息
	set_user({ commit }, user) {
		commit(types.SET_USER, { user })
	},
	//清除用户信息
	clearCurrentState({ commit }) {
		commit(types.SET_AUTHENTICATED, false)
		commit(types.SET_USER,{})
	}
}
const modules = {}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules,
	getters
})
