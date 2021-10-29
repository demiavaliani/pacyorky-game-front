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
	store.dispatch("setErrorCodeAction", error.response.data.code)
	return Promise.reject(error);
})

new Vue({
	router,
	store,
	render: h => h(App),
	mounted() {
		this.$store.dispatch("setRoomAction");
	}
}).$mount('#app')