import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '@/view/Index.vue'
// import Author from '@/view/Author.vue'
// import Play from '@/view/Play.vue'
// import Likes from '@/view/Likes.vue'
import Index from '../view/Index.vue'
import Author from '../view/Author.vue'
import Play from '../view/Play.vue'
import Likes from '../view/Likes.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/index',
    component:Index
  },
  {
   path:'/index',
   name:'index',
   component:Index
  },
  {
    path:'/author',
    name:'author',
    component:Author
   },
   {
    path:'/play',
    name:'play',
    component:Play
   },
   {
    path:'/likes',
    name:'likes',
    component:Likes
   },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
