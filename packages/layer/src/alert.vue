<!--
@Author: 左盐
@Date:   2018-03-19 16:16:24
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 16:02:01
-->
<template>
  <base-drag :options="options" :cls="cls">
    <div class="vl-notify-content">
      <i
        class="vlayer vlicon-warning"
        v-if="this.options.icon == 0"
        style="color:#f4ea2a;font-size:32px"
      ></i>
      <i
        class="vlayer vlicon-error"
        v-if="this.options.icon == 1"
        style="color:#f4ea2a;font-size:32px"
      ></i>
      <i
        class="vlayer vlicon-success"
        v-if="this.options.icon == 2"
        style="color:#00ba9b;font-size:32px"
      ></i>
      <i
        class="vlayer vlicon-wenti"
        v-if="this.options.icon == 3"
        style="color:#f4ea2a;font-size:32px"
      ></i>
      <div class="vl-notify-content-div" v-html="options.content"></div>
    </div>
    <div class="vl-notify-btns">
      <pzbutton btn="primary" @click.native="btnyes" size="small">{{btns[0]}}</pzbutton>
      <pzbutton
        btn="default"
        @click.native="btncancel"
        size="small"
        v-if="typeof(options.cancel) == 'function' || options.cancel=='cancel'"
        style="margin-left:10px;"
      >{{btns[1]}}</pzbutton>
    </div>
  </base-drag>
</template>

<script>
import pzbutton from "./components/button/button.vue";
import helper from "./helper/helper.js";
import drag from "./components/drag/drag";

export default {
  data() {
    return {
      btns: [],
      cls: {
        "vl-notify-alert": true
      }
    };
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    btnyes(event) {
      helper.btnyes(event, this.options);
    },
    btncancel(event) {
      helper.btncancel(event, this.options);
    },
    formatBtnText() {
      const a = this.options.btn;
      if (typeof a === "string") {
        this.btns = [this.options.btn, "取消"];
        return;
      }
      if (a instanceof Array) {
        this.btns = [a[0] || "确定", a[1] || "取消"];
      }
    }
  },
  async mounted() {
    await helper.sleep(20);
    this.formatBtnText();
    helper.hiddenScrollBar(this.options);
  },
  components: {
    pzbutton,
    "base-drag": drag
  }
};
</script>
