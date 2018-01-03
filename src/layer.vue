<template lang="html">
  <div class="notify" :id="id" :class="{'notify-msg-p':isMsg, 'notify-tips-p': isTips}">
    <pzalert :options="this.$data" v-if="this.$data.type==0"></pzalert>
    <pzpage :options="this.$data" v-if="this.$data.type==1"></pzpage>
    <pziframe :options="this.$data" v-if="this.$data.type==2"></pziframe>
    <pzloading :options="this.$data" v-if="this.$data.type==3"></pzloading>
    <pztips :options="this.$data" v-if="this.$data.type==4"></pztips>
    <pzmsg :options="this.$data" v-if="this.$data.type==5"></pzmsg>
</div>
</template>

<script>
import pzalert from './alert.vue';
import pzloading from './loading.vue';
import pzmsg from './msg.vue';
import pztips from './tips.vue';
import pzpage from './page.vue';
import pziframe from './iframe.vue';

export default {
    data() {
        return {
            id: '',
            type: 0, //0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
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
    },
    computed: {
        "isMsg": function() {
            return this.type == 5 ? true : false;
        },
        "isTips": function() {
            return this.type == 4 ? true : false;
        },
    },
    mounted() {},
    methods: {

    },
    watch: {

    },
    components: {
        pzalert,
        pzloading,
        pzmsg,
        pztips,
        pzpage,
        pziframe,
    }
}
</script>

<style lang="less">
@import './css/index.less';
</style>
