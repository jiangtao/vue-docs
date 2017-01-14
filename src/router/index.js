import Vue from 'vue'
import routes from './map'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    base: '/',
    routes: Object.keys(routes).reduce((previous, current) => {
        return (previous.push({path: current, ...routes[current]}), previous)
    }, []).concat({
        path: '*',
        meta: {
            title: '404 - Not Found'
        },
        component: {
            render(h){
                return h('h3', {class: 'title-404'}, '404 - Not Found')
            }
        }
    }),
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach(({ matched }, from, next) => {
    matched
        .filter(({ meta }) => meta.title)
        .map(({ meta }) => document.title = meta.title)

    next()
})

export default router
