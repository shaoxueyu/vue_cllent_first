import Vue from 'vue'
import ajax from "@/utils/ajax"
import { Message } from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/css/font.css'
import debounce from '@/utils/debounce'
import throttle from "@/utils/throttle"
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$debounce = debounce //防抖
Vue.prototype.$throttle = throttle // 节流
Vue.prototype.$ajax = ajax

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
