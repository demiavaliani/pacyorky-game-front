import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/bootstrap-vue'
import './plugins/axios'
import './plugins/multi-lang'
import './plugins/moment'
import './plugins/cookie'

Vue.config.productionTip = false

axios.interceptors.response.use(response => {
	let data = response.data;
	return data;
}, error => {
	store.dispatch("setModalStatusAction", true)
	if (error.response.data.code) {
		store.dispatch("setErrorCodeAction", error.response.data.code)
	} else if (error.response.data.code == undefined) {
		store.dispatch("setErrorCodeAction", "UNDEFINED_ERROR")
	}
	return Promise.reject(error);
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')