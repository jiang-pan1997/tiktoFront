import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/Index.vue'
import Author from '../view/Author.vue'
import Play from '../view/Play.vue'
import Likes from '../view/Likes.vue'
import Collected from '@/view/Collected'
import VideoAdd from '@/view/VideoAdd'
import Login from '@/view/MyLogin'
import AuthorList from '@/view/AuthorList'
import Home from '@/view/Home.vue'
import Register from '@/view/Register.vue'
import Works from '@/view/author/works'
import Like from '@/view/author/like'
import Collect from '@/view/author/collect'
import UserHostory from '@/view/UserHostory.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/index',
    component:Index,

  },
  {
   path:'/index',
   name:'index',
   component:Index,

  },
  {
    path:'/author',
    name:'author',
    component:Author,
    redirect: '/author/works',
    children:[
      {
        path:'works',component:Works
      },
      {
        path:'like',component:Like
      },
      {
        path:'collect',component:Collect
      },]
   },
   {
    path:'/play',
    name:'play',
    component:Play,

   },
   {
    path:'/likes',
    name:'likes',
    component:Likes,

   },
   {
    path:'/collected',
    name:'collected',
    component:Collected,

   },
   {
    path:'/add',
    name:'add',
    component:VideoAdd,

   },
   {
    path:'/login',
    name:'login',
    component:Login,
   },
   {
    path:'/authorList',
    name:'authorList',
    component:AuthorList,
   },
   {
    path:'/home',
    name:'home',
    redirect: '/home/works',
    component:Home,
    children:[
      {
        path:'works',component:Works
      },
      {
        path:'like',component:Like
      },
      {
        path:'collect',component:Collect
      },]
   },
   {
    path:'/register',
    name:'register',
    component:Register,
   }, 
   {
    path:'/userHostory',
    name:'userHostory',
    component:UserHostory,
   }, 
   
]




const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to,from,next)=>{
  if(to.path==='/login' || to.path==='/register')
      return next()
    if(to.path!='/login')
    { 
    let token =  localStorage.getItem('token')
    if(!token)
    next('/login')
    }
    next()  
    
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
