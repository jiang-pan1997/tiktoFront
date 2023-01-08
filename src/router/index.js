import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  if (to.path != '/login') {
    const token = localStorage.getItem('token')
    if (!token) next('/login')
  }
  next()
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
