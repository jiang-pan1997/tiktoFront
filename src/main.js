import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';

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
