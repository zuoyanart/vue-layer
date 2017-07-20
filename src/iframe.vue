<template lang="html">
<div class="notify" @mousemove="move" @mouseup="moveEnd">
    <div class="notify-mask" @click="close"></div>
    <div :id="options.id + '_alert'" class="notify-main notify-alert notify-iframe"  :style="{left:options.offset[0] + 'px',top:options.offset[1] +'px', margin:options.offset[2],width:options.area[0], height:options.area[1]}">
        <h2 class="notice-title" @mousedown="moveStart">{{options.title}}</h2>
        <div class="notify-content" :style="{height:(options.area[1]-50)}" :id="id"></div>
    </div>
</div>
</template>

<script>
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
          id: '',
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
          cancel: ''
        }
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getContent();
  },
  methods: {
    async getContent() {
      await this.sleep(10);
      let instance = new this.options.content.content({ //具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: this.options.content.data
      });
      instance.vm = instance.$mount();
      document.getElementById(this.id).appendChild(instance.vm.$el);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    'close': function (event) {
      let mask = event.target.getAttribute("class");
      if (mask && mask.indexOf("notify-mask") > -1) {
        this.options.layer.close(this.options.id);
      }
    },
    'btnyes': function (event) {
      if (typeof (this.options.yes) == "function") {
        console.log("asdasd");
        this.options.yes();
      } else {
        this.options.layer.close(this.options.id);
      }
    },
    'btncancel': function (event) {
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
    'moveEnd': function (event) {
      this.ismove = false;
    }
  },
}
</script>
