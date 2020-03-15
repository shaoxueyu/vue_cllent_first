import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9000/api/'
axios.defaults.timeout = 5000

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
			url = '?' + paramsStr
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
                console.log(error);
				reject(error)
			})
	})
}
