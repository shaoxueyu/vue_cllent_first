import { Loading } from 'element-ui'

let loading

export const startLoading = () => {
	loading = Loading.service({
		lock: true,
		text: '拼命登录中',
		background: 'rgba(0,0,0,.7)'
	})
}
export const endLoading = () => {
	loading.close()
}


