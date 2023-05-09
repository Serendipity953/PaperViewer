import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
//import axios from 'axios';
import router from './router';
import service from './service';
//import tools from './utils/tools.js'

// 为了解决setItemEvent不立即生效，使用事件派发强制更高

//Vue.prototype.axios=axios
Vue.prototype.service=service
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
