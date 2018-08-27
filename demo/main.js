import Vue from 'vue'
import App from './App'
import layer from '../src/layer.js';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$layer = layer(Vue, {
  msgtime: 1
});
Vue.use(ElementUI);

const app = new Vue({
  el: '#app',
  render: h => h(App),
});