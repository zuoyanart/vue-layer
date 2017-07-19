import Vue from 'vue'
import App from './App'
import layer from '../src/notification.js';

Vue.prototype.$layer = layer(Vue);

const app = new Vue({
    el: '#app',
    render: h => h(App),
});
