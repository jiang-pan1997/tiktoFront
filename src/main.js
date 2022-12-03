import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';

// 引入 axios
import axios from 'axios'
 
// 挂载一个自定义属性$http
Vue.prototype.$http = axios
//本机地址
// axios.defaults.baseURL = 'http://localhost:9696'

// 服务器地址
axios.defaults.baseURL = 'http://study-everyday.cn:9696'



Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
  Vue.prototype.$bus=this
    // Vue.prototype.$API=API
  },
}).$mount('#app')
