import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Logger } from './engine/utils/Logger';

Vue.config.productionTip = false
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = false //生产版本默认为 false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

