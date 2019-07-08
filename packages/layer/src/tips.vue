<!--
@Author: 左盐
@Date:   2018-03-24 15:30:33
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 15:49:07
-->
<template>
  <label
    class="vl-notify vl-notify-tips"
    :class="[this.options.tips[1],'vl-notify-tips-'+ this.options.tips[0]]"
    :id="options.id"
    v-html="options.content"
  >
    <em></em>
  </label>
</template>

<script>
export default {
  data() {
    return {
      timeout: ''
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
  computed: {
    offset() {
      return this.getOffset();
    }
  },
  async mounted() {
    let self = this;
    if (this.options.time == 0) {
      this.options.time = 2;
    }

    setTimeout(function () {
      self.btnyes();
    }, self.options.time * 1000);

    await this.getOffset();

  },
  methods: {
    'btnyes': function () {
      let o = document.getElementById(this.options.id);
      if (o) {
        if (typeof (this.options.yes) == "function") {
          this.options.yes();
        }
        this.options.layer.close(this.options.id);
        // delete this.$layer.instances[this.options.id];
        // o.remove();
      }
    },
    sleep: function (ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },
    async getOffset() {
      await this.sleep(1);
      let o = document.querySelector(this.options.title); //用title传递that元素
      const bound = o.getBoundingClientRect();
      let oTips = document.querySelector("#" + this.options.id);
      let boundTips = oTips.getBoundingClientRect();

      let scrollTop = 0; //this.getScrollTop();
      let left = o.offsetLeft;
      let top = o.offsetTop - scrollTop;
      let jiantou = 8 + 1;
      while (o.offsetParent) {
        o = o.offsetParent;
        left += o.offsetLeft;
        top += o.offsetTop;
      }


      let offset = {};
      switch (this.options.tips[0]) {
        case 0:
          offset = {
            left: left + "px",
            top: top - boundTips.height - jiantou + "px"
          }
          break;
        case 1:
          offset = {
            left: (left + bound.width + jiantou) + "px",
            top: top + "px"
          }
          break;
        case 2:
          offset = {
            left: left + "px",
            top: (top + bound.height + jiantou) + "px"
          }
          break;
        case 3:
          offset = {
            left: (left - boundTips.width - jiantou) + "px",
            top: top + "px"
          }
          break;
      }
      oTips.style.left = offset.left;
      oTips.style.top = offset.top;
      // return offset;
    },
    getScrollTop() {
      var scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
  },
}
</script>
