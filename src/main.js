import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import { NavBar } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Uploader } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant'
import { Popup } from 'vant'
import { List } from 'vant'
Vue.use(NavBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Uploader)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popup)
Vue.use(List)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
