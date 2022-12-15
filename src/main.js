import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
import { NavBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Uploader } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';


// 引入 axios
import axios from 'axios'
 

//本机地址
// axios.defaults.baseURL = 'http://localhost:9696'

// 服务器地址
axios.defaults.baseURL = 'http://study-everyday.cn:9696'

// 挂载一个自定义属性$http


axios.interceptors.request.use((config)=>{
   config.headers.token=localStorage.getItem('token')
   return config
})

// 响应拦截器
axios.interceptors.response.use((res)=>{
  if(res.data.msg=='NOTLOGIN'){
    localStorage.removeItem('token')
    router.replace({
      path:'/login'
    })
    return 
  }
  return res
},(error)=>{
  return Promise.reject(new Error('faile'))
})


Vue.prototype.$http = axios
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Uploader);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
  Vue.prototype.$bus=this
    // Vue.prototype.$API=API
  },
}).$mount('#app')
