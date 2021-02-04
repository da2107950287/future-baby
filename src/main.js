import Vue from 'vue'
import Vconsole from 'vconsole';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem.js'
import { http } from './assets/js/http.js'
import { Swipe, SwipeItem, NoticeBar, Overlay, Form, Field, Button,Calendar, Search, Tab, Tabs, Switch, ActionSheet, Toast, Step, Steps, uploader,PullRefresh,List,Cascader,Popup,TreeSelect,Picker,RadioGroup, Radio,DatetimePicker,Lazyload    } from 'vant';
Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem).use(NoticeBar).use(Overlay).use(Form).use(Field).use(Button).use(Calendar).use(Search).use(Tab).use(Tabs).use(Switch).use(Toast).use(Step).use(Steps).use(uploader).use(PullRefresh).use(List).use(Cascader).use(Popup).use(ActionSheet ).use(TreeSelect).use(Picker).use(RadioGroup).use(Radio).use(DatetimePicker).use(Lazyload );
Vue.prototype.$http = http;
new Vconsole()
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vue
