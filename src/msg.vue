

<template lang="html">

<label class="notify-msg">
    {{options.content}}
</label>

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
    let self = this;
    if (this.options.time == 0) {
      this.options.time = 2;
    }
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
