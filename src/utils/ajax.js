import axios from 'axios'
import { startLoading, endLoading } from '@/utils/loading'
import Vue from 'vue'
// import router from '../router'
axios.defaults.baseURL = 'http://localhost:9000/api/'

//请求拦截
axios.interceptors.request.use(
	config => {
		startLoading()
		if (localStorage.eleToken) {
			config.headers.Authorization = localStorage.getItem('eleToken')
		} 
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//响应拦截
axios.interceptors.response.use(
	response => {
		endLoading()
		return response
	},
	error => {
		endLoading()
		const { status } = error.response

		/* console.log(error); */
		if (status === 401) {
			Vue.prototype.$message({
				type: 'warning',
				message: '请重新认证身份'
			})
			localStorage.removeItem('eleToken')
		}
		return Promise.reject(error)
	}
)

export default (url = '', params = {}, type = 'GET') => {
	let promise
	return new Promise((resolve, reject) => {
		type = type.toUpperCase()
		if (type === 'GET') {
			let paramsStr = ''
			Object.keys(params).forEach(key => {
				paramsStr += `${key}=${params[key]}&`
			})
			if (paramsStr !== '') {
				paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
			}
			url += '?' + paramsStr
			// get 请求
			promise = axios.get(url)
		} else if (type === 'POST') {
			promise = axios.post(url, params)
		}
		promise
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				console.log(error)
				reject(error)
			})
	})
}
