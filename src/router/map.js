export default {
	'/': {
		meta: {
			title: 'README'
		},
		component: (resolve) => {
			require(['pages/README.vue'], resolve)
		}
	},
	'/button': {
		meta: {
			title: 'button'
		},
		component: (resolve) => {
			require(['pages/button.vue'], resolve)
		}
	}}