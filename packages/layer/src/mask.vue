<!--
@Author: 左盐
@Date:   2018-03-19 17:59:08
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 15:29:43
-->
<template>
  <div class="vl-notify-mask" @click="close" :id="id + '_mask'" :style="setOpacity"></div>
</template>

<script>
import helper from "./helper/helper.js";

export default {
  data() {
    return {
      id: "",
      type: 0, //0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
      title: "信息",
      content: "",
      area: "auto",
      offset: "auto",
      icon: -1,
      btn: "确定",
      time: 0,
      shade: true,
      yes: "",
      cancel: ""
    };
  },
  props: {},
  computed: {
    setOpacity() {
      if (this.type == 3) {
        return {
          opacity: 0
        };
      } else if (this.type == 2) {
        //iframe层级 需要给遮罩层设置z-index
        return {
          "z-index": parseInt(this.getStyle(this.id, "z-index")) - 1
        };
      }
      return {};
    }
  },
  methods: {
    getStyle(el, styleProp) {
      let x = document.getElementById(el);
      let y = 0;
      if (window.getComputedStyle) {
        y = document.defaultView
          .getComputedStyle(x, null)
          .getPropertyValue(styleProp);
      } else if (x.currentStyle) {
        y = x.currentStyle[styleProp];
      }
      return y;
    },
    close(event) {
      if (this.shadeClose) {
        helper.clickMaskCloseAll(event, this.layer, this.id);
      }
    }
  },
  mounted() { }
};
</script>

<style lang="css">
.vl-notify-mask {
  background-color: #ccc;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
