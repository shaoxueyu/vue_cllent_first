import Vue from 'vue'
import ajax from '@/utils/ajax'
import {
	Message,
	MessageBox,
	Col,
	Row,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Table,
	TableColumn,
	Button,
	Form,
	FormItem,
	Dialog,
	Input,
	Select,
	Option,
	Pagination,
	DatePicker
} from 'element-ui'
import packagePlugin from '@/utils/vueUse'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/font.css'
import '../public/css/font.css'
import '@/assets/css/animate.min.css'
import debounce from '@/utils/debounce'
import throttle from '@/utils/throttle'
/* import list from "@/views/fundlist"
console.table(list.render); */
Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$debounce = debounce //防抖
Vue.prototype.$throttle = throttle // 节流
Vue.prototype.$ajax = ajax
Vue.prototype.$confirm = MessageBox.confirm
packagePlugin(
	Col,
	Row,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	MenuItem,
	Submenu,
	MenuItemGroup,
	Table,
	TableColumn,
	Button,
	Form,
	FormItem,
	Input,
	Dialog,
	Select,
	Option,
	Pagination,
	DatePicker
)
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
