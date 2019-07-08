

<template lang="html">
<div class="notify" @mousemove="move" @mouseup="moveEnd">
    <div class="notify-mask" @click="close"></div>
    <div :id="options.id + '_alert'" class="notify-main notify-alert"  :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2]}">
        <h2 class="title" @mousedown="moveStart">{{options.title}}</h2>
        <div class="notify-content" v-html="options.content"></div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      moveLeft: 0, //左移的距离
      moveTop: 0, //上移的距离
      ismove: false
    }
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {},
  mounted() { },
  methods: {
    'close': function (event) {
      let mask = event.target.getAttribute("class");
      if (mask && mask.indexOf("notify-mask") > -1) {
        this.options.layer.close(this.options.id);
      }
    },
    'btnyes': function () {
      if (typeof (this.options.yes) == "function") {
        this.options.yes();
      } else {
        this.options.layer.close(this.options.id);
      }
    },
    'btncancel': function () {
      if (typeof (this.options.cancel) == "function") {
        this.options.cancel();
      } else {
        this.options.layer.close(this.options.id);
      }
    },
    'moveStart': function (event) {
      this.options.offset = this.options.offset == 'auto' ? [] : this.options.offset;
      if (this.options.offset.length == 0) {
        this.options.offset.push(document.getElementById(this.options.id + "_alert").offsetLeft);
        this.options.offset.push(document.getElementById(this.options.id + "_alert").offsetTop);
        this.options.offset.push(0);
      }
      if (this.options.offset.length == 2) {
        this.options.offset.push(0);
      }
      this.options.offset[0] = (document.getElementById(this.options.id + "_alert").offsetLeft);
      this.options.offset[1] = (document.getElementById(this.options.id + "_alert").offsetTop);
      this.moveLeft = event.clientX;
      this.moveTop = event.clientY;
      this.ismove = true;
    },
    'move': function (event) {
      if (this.ismove) {
        let o = document.getElementById(this.options.id + "_alert");
        o.style.left = this.options.offset[0] + (event.clientX - this.moveLeft) + "px";
        o.style.top = this.options.offset[1] + (event.clientY - this.moveTop) + "px";
      }
    },
    'moveEnd': function () {
      this.ismove = false;
    }
  },
  watch: {

  },
  components: {

  }
}
</script>
