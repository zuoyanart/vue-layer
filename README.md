## vue-layer
install
```shell
npm install vue-layer
```

## Quick Start

with `main.js` or `index.js` add:
```js
import Vue from 'vue';
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
```
in component
```js
this.$layer.alert("找不到对象！");
```

## Demo
http://vue.zuoyan.space/#/component/layer

## Attribut
```js
{
  type: 0, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
  title: '信息',
  content: '',
  area: 'auto',
  offset: 'auto',
  icon: -1,
  btn: '确定',
  time: 0,
  shade: true,
  yes: '',
  cancel: '',
  tips: [0,{}],//支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
  tipsMore: false,//是否允许多个tips
  shadeClose: false,
}
```
## Method
```js
 layer.alert(contetn, options, yes);
```

```js
 layer.confirm(content, options, yes, cancel)
```
```js
 layer.msg(contetn, options, end);
```
```js
layer.tips(content, follow, options);
```
```js
layer.open(options);
```
```js
layer.close(id);
```
```js
layer.closeAll(type);
```
