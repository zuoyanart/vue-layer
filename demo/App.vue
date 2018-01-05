<style lang="less">
.title {
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    margin-bottom: 10px;
}
</style>
<template>
<div id="app" style="width:1000px;margin:100px auto;">
    <h2 class="title">alert</h2>
    <el-button type="primary" @click="submitHandle">提交</el-button>
    <h2 class="title">confirm</h2>
    <el-button type="primary" @click="confirmHandle">删除</el-button>
    <h2 class="title">msg</h2>
    <el-button type="primary" @click="msgHandle">msg</el-button>
    <el-button type="primary" @click="msg1Handle">带回调</el-button>
    <h2 class="title">loading</h2>
    <el-button type="primary" @click="loadingHandle">默认样式</el-button>
    <h2 class="title">tips</h2>
    <el-button type="primary" id="tips" @click="tipsHandle">上</el-button>
    <el-button type="primary" id="tips1" @mouseenter.native="tips1Handle">右</el-button>
    <el-button type="primary" id="tips2" @click="tips2Handle">下</el-button>
    <el-button type="primary" id="tips3" @click="tips3Handle">左-自定义样式</el-button>
    <h2 class="title">page</h2>
    <el-button type="primary" id="tips" @click="pageHandle">自定义</el-button>
</div>
</template>

<script>
import tools from './js/tools.js';
import formComp from './form.vue';

export default {
    data() {
        return {}
    },
    components: {
        'base-form': formComp,
    },
    mounted() {
        this.$on('asd', function(val) {
            alert(val);
        });
    },
    methods: {
        submitHandle: function() {
            let id = this.$layer.alert(
                "this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!"
            );
        },
        confirmHandle: function() {
            let self = this;
            let id = this.$layer.confirm("确定要<br/>删除吗？", function() {
                console.log("执行了删除");
                self.$layer.close(id);
            });
        },
        msgHandle: function() {
            let id = this.$layer.msg("弱弱的提示", {
                time: 10000
            });
        },
        msg1Handle: function() {
            let id = this.$layer.msg("5s后刷新页面", {
                time: 5
            }, function() {
                document.location.reload();
            });
        },
        loadingHandle: function() {
            let id = this.$layer.loading({
                time: 2
            });
        },
        tipsHandle: function() {
            let id = this.$layer.tips("在很久很久以前", '#tips');
        },
        tips1Handle: function() {
            let id = this.$layer.tips("在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，", '#tips1', {
                tips: 1,
                time: 10
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
                }],
                time: 10
            });
        },
        pageHandle: function() {
            let ids = this.$layer.iframe({
                content: {
                    content: formComp,
                    parent: this,
                    data: {
                        check: 'aaaaaaaaxxxx',
                        id: ids
                    }
                },
                area: ['800px', '500px'],
                title: '个人信息'
            });
        },
    }
}
</script>
