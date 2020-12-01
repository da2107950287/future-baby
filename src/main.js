import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem.js'
import { Swipe, SwipeItem,NoticeBar,Overlay   } from 'vant';
Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem).use(NoticeBar).use(Overlay );
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
