<template lang="html">
<div class="notify" @mousemove="move" @mouseup="moveEnd">
    <div class="notify-mask" @click="close"></div>
    <div :id="options.id + '_alert'" class="notify-main notify-alert notify-iframe"  :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2],width:options.area[0], height:options.area[1]}">
        <h2 class="notice-title" @mousedown="moveStart">{{options.title}}</h2>
        <div class="notify-content" :style="contentStyle" :id="id"></div>
    </div>
</div>
</template>

<script>
import helper from './helper/helper.js';

export default {
  data() {
    return {
      moveLeft: 0, //左移的距离
      moveTop: 0, //上移的距离
      ismove: false,
      id: 'vlip' + new Date().getTime(),
    }
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {

        }
      }
    }
  },
  computed: {
    contentStyle() {
      return {
        height: (parseInt(this.options.area[1]) - 50) + 'px',
        minHeight: 'inherit',
        overflow: 'auto',
      }
    },
  },
  mounted() {
    this.getContent();
  },
  methods: {
    async getContent() {
      await helper.sleep(10);
      let instance = new this.options.content.content({ //具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: JSON.parse(JSON.stringify(this.options.content.data))
      });
      instance.vm = instance.$mount();
      document.getElementById(this.id).appendChild(instance.vm.$el);
    },
    close(event) {
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
        let o = document.getElementById(this.options.id + "_alert");
        o.style.left = this.options.offset[0] + (event.clientX - this.moveLeft) + "px";
        o.style.top = this.options.offset[1] + (event.clientY - this.moveTop) + "px";
      }
    },
    moveEnd(event) {
      this.ismove = false;
    }
  },
}
</script>
