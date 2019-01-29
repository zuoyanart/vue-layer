<template>
  <div
    class="vl-notify vl-notify-main vl-notify-alert"
    :class="cls"
    @mousemove="move"
    @mouseup="moveEnd"
    @focus="resetZIndex"
    tabindex="1"
    :id="options.id"
    :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2],zIndex:zindex, width: options.area[0], height: options.area[1]}"
  >
    <h2 class="vl-notice-title" @mousedown="moveStart">
      {{options.title}}
      <i class="icon-remove" @click="close"></i>
    </h2>
    <slot></slot>
  </div>
</template>
<script>
import helper from "../../helper/helper.js";
export default {
  data() {
    return {
      moveLeft: 0, //左移的距离
      moveTop: 0, //上移的距离
      ismove: false,
      id: "vlip" + new Date().getTime(),
      zindex: 1
    };
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      }
    },
    cls: {
      type: Object,
      default: function () {
        return {
          "vl-notify-alert": true
        };
      }
    }
  },
  async mounted() {
    if (this.options.shade) {
      await helper.sleep(20);
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
    this.resetZIndex();
  },
  methods: {
    getStyle(el, styleProp) {
      var x = document.getElementById(el);
      if (window.getComputedStyle) {
        var y = document.defaultView
          .getComputedStyle(x, null)
          .getPropertyValue(styleProp);
      } else if (x.currentStyle) {
        var y = x.currentStyle[styleProp];
      }
      return y;
    },
    resetZIndex() {
      let max = 500;
      let keys = Object.keys(this.cls);
      let doms = document.querySelectorAll("." + keys[0]);//vl-notify-iframe
      let domZindex = 0;
      for (let i = 0, len = doms.length; i < len; i++) {
        let value = parseInt(this.getStyle(doms[i].id, "z-index"));
        if (this.options.id == doms[i].id) {
          domZindex = value;
        }
        if (max < value) {
          max = value;
        }
      }
      if (domZindex == max && max != 500) {
        return;
      }
      this.zindex = max + 1;
    },
    async close(event) {
      await helper.btncancel(event, this.options);
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
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
        let top = this.options.offset[1] + (event.clientY - this.moveTop);
        let docOffsetHeight = o.offsetHeight / 2;
        let left = this.options.offset[0] + (event.clientX - this.moveLeft);
        let docOffsetWidth = o.offsetWidth / 2;
        if (top <= docOffsetHeight) {//顶部边界
          top = docOffsetHeight;
        }
        if (left <= docOffsetWidth) {//左侧边界
          left = docOffsetWidth;
        }
        let docHeight = document.documentElement.clientHeight;
        let docWidth = document.documentElement.clientWidth;
        if (top >= docHeight - docOffsetHeight) {//底部边界
          top = docHeight - docOffsetHeight;
        }
        if (left >= docWidth - docOffsetWidth) {//右部边界
          left = docWidth - docOffsetWidth;
        }
        o.style.left = left + "px";
        o.style.top = top + "px";
        this.resetZIndex();
      }
    },
    moveEnd(event) {
      this.ismove = false;
    }
  }
}
</script>

<style>
</style>

