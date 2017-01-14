import Vue from 'vue'
import App from './App'
import router from './router'
import Layout from './Layout'
import Doc from './Layout/doc-tabs.vue'
Vue.component('Layout', Layout)
Vue.component('vue-doc-tabs', Doc)
new Vue({
	router,
	...App
}).$mount('#app')
