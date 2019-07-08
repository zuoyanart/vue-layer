<!--
@Author: 左盐
@Date:   2018-03-19 16:16:24
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 16:02:01
-->
<template>
  <div
    class="vl-notify vl-notify-main vl-notify-alert"
    @mousemove="move"
    @mouseup="moveEnd"
    :id="options.id"
    :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2]}"
    style="max-width:500px;"
  >
    <h2 class="vl-notice-title" @mousedown="moveStart">
      {{options.title}}
      <i class="icon-remove" @click="close"></i>
    </h2>
    <div class="vl-notify-content">
      <input />
    </div>
    <div class="vl-notify-btns">
      <pzbutton btn="primary" @click.native="btnyes" size="small">确定</pzbutton>
      <pzbutton
        btn="default"
        @click.native="btncancel"
        size="small"
        v-if="typeof(options.cancel) == 'function' || options.cancel=='cancel'"
      >取消</pzbutton>
    </div>
  </div>
</template>

<script>
import pzbutton from "./components/button/button.vue";
import helper from "./helper/helper.js";

export default {
  data() {
    return {
      moveLeft: 0, //左移的距离
      moveTop: 0, //上移的距离
      ismove: false
    };
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    async close(event) {
      await helper.btncancel(event, this.options);
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
    },
    btnyes(event) {
      helper.btnyes(event, this.options);
    },
    btncancel(event) {
      helper.btncancel(event, this.options);
    },
    moveStart(event) {
      helper.moveStart(event, this.options);
      this.moveLeft = event.clientX;
      this.moveTop = event.clientY;
      this.ismove = true;
    },
    move(event) {
      if (this.ismove) {
        let o = document.getElementById(this.options.id + "");
        o.style.left =
          this.options.offset[0] + (event.clientX - this.moveLeft) + "px";
        o.style.top =
          this.options.offset[1] + (event.clientY - this.moveTop) + "px";
      }
    },
    moveEnd() {
      this.ismove = false;
    }
  },
  async mounted() {
    await helper.sleep(20);
    if (this.options.shade) {
      //是否显示遮罩
      document
        .getElementById(this.options.id + "_mask")
        .addEventListener("mousemove", event => {
          this.move(event);
        });
      document
        .getElementById(this.options.id + "_mask")
        .addEventListener("mouseup", event => {
          this.moveEnd(event);
        });
    } else {
      document.addEventListener("mousemove", event => {
        this.move(event);
      });
      document.addEventListener("mouseup", event => {
        this.moveEnd(event);
      });
    }
  },
  components: {
    pzbutton
  }
};
</script>
