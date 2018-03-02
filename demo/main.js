import Vue from 'vue'
import App from './App'
import layer from '../src/layer.js';
import ElementUI from 'element-ui';


Vue.prototype.$layer = layer(Vue, {
    msgtime: 10
});
Vue.use(ElementUI);

const app = new Vue({
    el: '#app',
    render: h => h(App),
});