//不用一个一个use
import Vue from 'vue'

export default (...args) => {
	args.forEach(plugins => {
		Vue.use(plugins)
	})
}
