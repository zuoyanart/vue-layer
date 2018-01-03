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
    <el-button type="primary" @click="loading1Handle">第一种样式</el-button>
    <el-button type="primary" @click="loading2Handle">第二种样式</el-button>
    <h2 class="title">tips</h2>
    <el-button type="primary" id="tips" @click="tipsHandle">上</el-button>
    <el-button type="primary" id="tips1" @click="tips1Handle">右</el-button>
    <el-button type="primary" id="tips2" @click="tips2Handle">下</el-button>
    <el-button type="primary" id="tips3" @click="tips3Handle">左-自定义样式</el-button>
    <h2 class="title">page</h2>
    <el-button type="primary" id="tips" @click="pageHandle">自定义</el-button>
    <el-button type="primary" id="tips1" @click="tips1Handle">右</el-button>
    <el-button type="primary" id="tips2" @click="tips2Handle">下</el-button>
    <el-button type="primary" id="tips3" @click="tips3Handle">左-自定义样式</el-button>
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
            let id = this.$layer.alert("this is demo!!!");
        },
        confirmHandle: function() {
            let self = this;
            let id = this.$layer.confirm("确定要删除吗？", async function() {
                console.log("执行了删除");
                self.$layer.close(id);
            }, function() {
                alert('取消');
            });
        },
        msgHandle: function() {
            let id = this.$layer.msg("弱弱的提示");
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
        loading1Handle: function() {
            let self = this;
            let id = this.$layer.loading(1, {
                time: 20
            });
            setTimeout(function() {
                self.$layer.close(id);
            }, 3000);
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
            this.$layer.iframe({
                content: {
                    content: formComp,
                    parent: this,
                    data: {
                        check: 'aaaaaaaaxxxx'
                    }
                },
                area: ['800px', '400px'],
                title: 'asdasdad'
            });
            return;
            let id = this.$layer.open({
                type: 2,
                content: {
                    content: formComp,
                    parent: this,
                    data: {
                        check: 'aaaaaaaaxxxx'
                    }
                },
                area: ['800px', '400px'],
                title: 'asdasd'
            });
        },
    }
}
</script>
