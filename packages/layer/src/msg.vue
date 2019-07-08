<!--
@Author: 左盐
@Date:   2018-03-24 12:22:51
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 12:23:04
-->
<template>
  <label :id="options.id" class="vl-notify vl-notify-msg" v-html="options.content"></label>
</template>

<script>
import helper from './helper/helper.js';
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
  async mounted() {
    await helper.sleep(this.options.time * 1000);
    this.btnyes();
  },
  methods: {
    btnyes(event) {
      let o = document.getElementById(this.options.id);
      if (o) {
        helper.btnyes(event, this.options);
      }
    },
  },
}
</script>
