export default {
	'/button': {
		component: (resolve) => {
			require(['pages/button.vue'], resolve)
		}
	},	'/README': {
		component: (resolve) => {
			require(['pages/README.vue'], resolve)
		}
	}
}