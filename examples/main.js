import Vue from 'vue'
import App from './App.vue'
import layer from '../packages/layer/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$layer = layer(Vue);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');