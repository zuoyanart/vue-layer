<style lang="scss">@import "../../../assets/scss/pizza.scss";
@import "../../../assets/site.scss";
#app {
    margin: 100px;
}
</style>

<template>
<div id="app">
    <h2 class="title">alert</h2>
    <pzbutton @click.native="submitHandle">提交</pzbutton>
    <h2 class="title">confirm</h2>
    <pzbutton @click.native="confirmHandle">删除</pzbutton>
    <h2 class="title">msg</h2>
    <pzbutton @click.native="msgHandle">msg</pzbutton>
    <pzbutton @click.native="msg1Handle">带回调</pzbutton>
    <h2 class="title">loading</h2>
    <pzbutton @click.native="loadingHandle">默认样式</pzbutton>
    <pzbutton @click.native="loading1Handle">第一种样式</pzbutton>
    <pzbutton @click.native="loading2Handle">第二种样式</pzbutton>
    <h2 class="title">tips</h2>
    <pzbutton id="tips" @click.native="tipsHandle">上</pzbutton>
    <pzbutton id="tips1" @click.native="tips1Handle">右</pzbutton>
    <pzbutton id="tips2" @click.native="tips2Handle">下</pzbutton>
    <pzbutton id="tips3" @click.native="tips3Handle">左-自定义样式</pzbutton>
    <h2 class="title">page</h2>
    <pzbutton id="tips" @click.native="pageHandle">自定义</pzbutton>
    <pzbutton id="tips1" @click.native="tips1Handle">右</pzbutton>
    <pzbutton id="tips2" @click.native="tips2Handle">下</pzbutton>
    <pzbutton id="tips3" @click.native="tips3Handle">左-自定义样式</pzbutton>
</div>
</template>

<script>
import pzbutton from 'pzvue-button';
import tools from './js/tools.js';

export default {
    data() {
        return {}
    },
    components: {
        pzbutton
    },
    methods: {
        submitHandle: function() {
            let id = this.$layer.alert("this is demo!!!");
        },
        confirmHandle: function() {
            let self = this;
            let id = this.$layer.confirm("确定要删除吗？", {
                title: "警告"
            }, async function() {
              console.log("执行了删除");
                self.$layer.close(id);
            });
        },
        msgHandle: function() {
            let id = this.$layer.msg("弱弱的提示");
        },
        msg1Handle: function() {
            let id = this.$layer.msg("2s后刷新页面", function() {
                document.location.reload();
            });
        },
        loadingHandle: function() {
            let id = this.$layer.loading({
                time: 2
            });
        },
        loading1Handle: function() {
          let self = this;
            let id = this.$layer.loading(1, {
                time:2
            });
            setTimeout(function() {
              self.$layer.close(id);
            },1000);
            let id1 = this.$layer.loading(2, {
                time: 5
            });
            setTimeout(function() {
              self.$layer.close(id1);
            },2000);
        },
        loading2Handle: function() {
            let id = this.$layer.loading(2, {
                time: 2
            });
        },
        tipsHandle: function() {
            let id = this.$layer.tips("在很久很久以前", '#tips');
        },
        tips1Handle: function() {
            let id = this.$layer.tips("在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，", '#tips1', {
                tips: 1
            });
        },
        tips2Handle: function() {
            let id = this.$layer.tips("在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，", '#tips2', {
                tips: 2
            });
        },
        tips3Handle: function() {
            let id = this.$layer.tips("在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，", '#tips3', {
                tips: [3, {
                    "selfa": true
                }]
            });
        },
        pageHandle: function() {
            let id = this.$layer.open({
                type: 2,
                content: 'http://www.baidu.com',
                area: ['800px', '400px']
            });
        },
    }
}
</script>
