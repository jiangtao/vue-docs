export default {
	'/': {
		component: (resolve) => {
			require(['pages/README.vue'], resolve)
		}
	},	'/button': {
		component: (resolve) => {
			require(['pages/button.vue'], resolve)
		}
	}
}