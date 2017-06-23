// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import {mapActions} from 'vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
store.dispatch('session/load').then(init).catch(init);

function init() {
	new Vue({
		el: '#app',
		router,
		store,
		template: '<App/>',
		components: {App}
	})
}