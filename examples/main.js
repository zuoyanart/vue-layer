import Vue from 'vue'
import App from './App.vue'
// import layer from '../packages/layer/index';
import layer from '../lib/vue-layer.umd';
import '../lib/vue-layer.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$layer = layer();
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');

console.log('asdasdas', new Vue({
  render: h => h(App),
}));