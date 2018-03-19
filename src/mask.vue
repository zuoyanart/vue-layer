<!--
@Author: 左盐
@Date:   2018-03-19 17:59:08
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-19 18:31:46
-->
<template lang="html">
      <div class="vl-notify-mask" @click="close" :id="id + 'asd'"></div>
</template>

<script>
import helper from './helper/helper.js';

export default {
  data() {
    return {
      id: '',
      type: 0, //0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
      title: '信息',
      content: '',
      area: 'auto',
      offset: 'auto',
      icon: -1,
      btn: '确定',
      time: 0,
      shade: true,
      yes: '',
      cancel: ''
    }
  },
  props: {

  },
  methods: {
    close(event) {
      alert(this.options.id);
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
    },

  },
}
</script>

<style lang="css">
.vl-notify-mask {
    background-color: #000;
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
