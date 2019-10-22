<!--
@Author: 左盐
@Date:   2018-03-24 12:33:19
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 12:33:28
-->
<template >
  <label class="vl-notify vl-notify-loading" :id="options.id">
    <span></span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      // timeout: ""
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
  computed: {},
  mounted() {
    setTimeout(() => {
      this.options.layer.close(this.options.id);
    }, this.options.time * 1000);
  }
};
</script>
