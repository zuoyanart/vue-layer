<style lang="less" scoped>
@import "./css/button.less";
</style>

<template lang="html">

<button  v-on:click="clickon" :type="type" name="button" class="notify-btn" :class="[
    btn ? 'notify-btn-' + btn : '',
    size ? 'notify-btn-' + size : '',
    {
      'disabled': disabled,
    }
  ]">
  <slot></slot>
</button>

</template>

<script>
export default {
    props: {
        btn: { //btn的样式
            type: String,
            default: 'primary'
        },
        size: String,
        type: { //类型，
            type: String,
            default: 'button'
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
    },
    computed: {},
    mounted() {},
    methods: {
        clickon: function() {
            this.$emit("click", "");
        }
    },
    components: {}
}
</script>
