<!--
@Author: 左盐
@Date:   2018-03-19 12:25:54
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-31 10:31:27
-->
<template lang="html">
<div class="vl-notify vl-notify-main vl-notify-alert"  @mousemove="move" @mouseup="moveEnd" @click="resetZIndex"  :id="options.id" :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2], zIndex: zindex, width: options.area[0], height: options.area[1]}">
        <h2 class="vl-notice-title" @mousedown="moveStart">{{options.title}}<i class="icon-remove" @click="close"></i></h2>
        <div class="vl-notify-content" :style="contentStyle" :id="id"></div>
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
      zindex: 10000
    }
  },
  props: {
    options: {
      type: Object,
      default: function() {
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
  async mounted() {
    this.getContent();
    await helper.sleep(20);
    if (this.options.shade) { //是否显示遮罩
      document.getElementById(this.options.id + '_mask').addEventListener('mousemove', (event) => {
        this.move(event);
      });
      document.getElementById(this.options.id + '_mask').addEventListener('mouseup', (event) => {
        this.moveEnd(event);
      });
    } else {
      document.addEventListener('mousemove', (event) => {
        this.move(event);
      });
      document.addEventListener('mouseup', (event) => {
        this.moveEnd(event);
      });
    }
  },
  methods: {
    resetZIndex() {
      this.zindex = (new Date().getTime() + '').substring(5);
    },
    async getContent() {
      await helper.sleep(10);
      let propsData = JSON.parse(JSON.stringify(this.options.content.data));
      propsData['layerid'] = this.options.id;
      let instance = new this.options.content.content({ //具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: propsData
      });
      instance.vm = instance.$mount();
      document.getElementById(this.id).appendChild(instance.vm.$el);
      this.options.layer.instancesVue[this.options.id].iframe = instance.vm;
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
        let o = document.getElementById(this.options.id + "");
        o.style.left = this.options.offset[0] + (event.clientX - this.moveLeft) + "px";
        o.style.top = this.options.offset[1] + (event.clientY - this.moveTop) + "px";
        this.resetZIndex();
      }
    },
    moveEnd(event) {
      this.ismove = false;
    }
  },
}
</script>
