<template>
  <div
    class="vl-notify vl-notify-main vl-notify-alert"
    :class="cls"
    @mousemove="move"
    @mouseup="moveEnd"
    @focus="resetZIndex"
    tabindex="1"
    :id="options.id"
    :style="getBaseStyle"
  >
    <h2 class="vl-notice-title" @mousedown="moveStart">
      <span v-html="options.title" class="lv-title"></span>
      <template v-if="options.maxmin == true">
        <span class="lv-icon-maxmini">
          <template v-if="maxMiniState === 0">
            <i class="vlayer vlicon-mini lv-icon-mini" @click="mini"></i>
            <i class="vlayer vlicon-max lv-icon-max" @click="max"></i>
          </template>
          <template v-else-if="maxMiniState === 1">
            <i class="vlayer vlicon-huanyuan lv-icon-max" @click="maxmini"></i>
          </template>
          <template v-else-if="maxMiniState === 2">
            <i class="vlayer vlicon-huanyuan lv-icon-max" @click="maxmini"></i>
          </template>
        </span>
      </template>
      <i class="icon-remove" @click="close"></i>
    </h2>
    <slot></slot>
    <span
      class="vl-drag-resize"
      @mousedown="resizeHand"
      @mouseup="resizeHandMoveEnd"
      v-if="options.resize"
    ></span>
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
      zindex: 1,
      addStyle: {},
      maxMiniState: 0, //0normal,1mini,2max
      resize: {
        isResize: false,
        oWidth: 0,
        oHeight: 0,
        moveLeft: 0,
        moveTop: 0,
        tt: {}
      }
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
        .getElementsByClassName("vl-notify-mask")[0]
        .addEventListener("mousemove", event => {
          this.move(event);
        });
      document
        .getElementsByClassName("vl-notify-mask")[0]
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
  computed: {
    getBaseStyle() {
      //获取z-index
      this.resetZIndex();
      const op = this.options;
      const styleBase = {
        left: op.offset[0] + "px",
        top: op.offset[1] + "px",
        margin: op.offset[2],
        zIndex: this.zindex,
        width: op.area[0],
        height: op.area[1]
      };
      let a = helper.deepClone(styleBase);
      return this.mergeJson(a, this.addStyle);
    }
  },
  methods: {
    mergeJson(options, def) {
      for (let key in def) {
        options[key] = def[key];
      }
      return options;
    },
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
    resetZIndex() {
      let max = 500;
      let keys = Object.keys(this.cls);
      let doms = document.querySelectorAll("." + keys[0]); //vl-notify-iframe
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
      //预留遮罩层z-index
      this.zindex = max + 2;
    },
    async close(event) {
      await helper.btncancel(event, this.options);
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
    },
    mini() {
      //最小化窗口
      this.addStyle = {
        overflow: "hidden",
        bottom: 0,
        left: "130px",
        width: "100px",
        height: "42px",
        minHeight: "42px",
        top: "auto"
      };
      this.maxMiniState = 1;
    },
    max() {
      //最大化窗口
      let height = document.documentElement.clientHeight;
      if (height % 2 === 1) {
        height += 1;
      }
      this.addStyle = {
        overflow: "hidden",
        left: "50%",
        width: "100%",
        height: height + "px",
        minHeight: "42px"
      };
      this.maxMiniState = 2;
    },
    maxmini() {
      document.getElementById(this.options.id).removeAttribute("style");
      this.addStyle = {
        left: "tpx",
        top: "tpx",
        margin: "t"
      };
      this.maxMiniState = 0;
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
        let left = this.options.offset[0] + (event.clientX - this.moveLeft);
        // 增加moveOut参数 为true则可移到屏幕外，默认不可移到屏幕外
        if (!this.options.moveOut) {
          let docOffsetHeight = o.offsetHeight / 2;
          let docOffsetWidth = o.offsetWidth / 2;
          if (top <= docOffsetHeight) {
            //顶部边界
            top = docOffsetHeight;
          }
          if (left <= docOffsetWidth) {
            //左侧边界
            left = docOffsetWidth;
          }
          let docHeight = document.documentElement.clientHeight;
          let docWidth = document.documentElement.clientWidth;
          if (top >= docHeight - docOffsetHeight) {
            //底部边界
            top = docHeight - docOffsetHeight;
          }
          if (left >= docWidth - docOffsetWidth) {
            //右部边界
            left = docWidth - docOffsetWidth;
          }
        }
        o.style.left = left + "px";
        o.style.top = top + "px";
        this.resetZIndex();
      }
    },
    moveEnd() {
      this.ismove = false;
    },
    resizeHand(event) {
      //拉伸操作
      let o = document.getElementById(this.options.id + "");
      this.resize.oWidth = o.offsetWidth;
      this.resize.oHeight = o.offsetHeight;
      this.resize.moveTop = event.clientY;
      this.resize.moveLeft = event.clientX;
      this.resize.isResize = true;
      document.body.addEventListener("mousemove", e => {
        this.resizeHandMove(e);
      });
    },
    resizeHandMove(event) {
      if (this.resize.isResize) {
        let o = document.getElementById(this.options.id + "");
        let top = event.clientY;
        let left = event.clientX;
        let oWidth = this.resize.oWidth + (left - this.resize.moveLeft) * 2;
        let oHeight = this.resize.oHeight + (top - this.resize.moveTop) * 2;

        if (oWidth < 200 || oHeight < 200) {
          return;
        }
        o.style.width = oWidth + "px";
        o.style.height = oHeight + "px";
      }
    },
    resizeHandMoveEnd() {
      setTimeout(() => {
        this.resize.isResize = false;
        document.body.removeEventListener("mousemove", e => {
          this.resizeHandMove(e);
        });
      }, 50);
    }
  }
};
</script>

<style>
</style>

