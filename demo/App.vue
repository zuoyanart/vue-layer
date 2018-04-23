<!--
@Author: 左盐
@Date:   2018-03-05 16:18:21
@Email:  huabinglan@163.com
@Last modified by:   左盐
@Last modified time: 2018-03-31 10:10:13
-->



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
  async mounted() {
    let ids = [];
    for (let i = 0; i < 10; i++) {
      await tools.sleep(1000);
      let id = this.loadingHandle();
      ids.push(id);
    }
    await tools.sleep(2000);
    for (let i = 0; i < 10; i++) {
      this.$layer.close(ids[i]);
    }
    this.$on('asd', function(val) {
      this.$layer.msg(val);
    });
  },
  methods: {
    submitHandle: function() {
      let id = this.$layer.alert(
        "this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!", {
          shade: true
        },
        () => {
          alert(1);
          this.$layer.close(id);
        });
    },
    confirmHandle: function() {
      let id = this.$layer.confirm("确定要<br/>删除吗？", () => {
        this.$layer.msg("执行了删除");
        // this.$layer.close(id);
      });
    },
    msgHandle: function() {
      let id = this.$layer.msg("弱弱的提示");
    },
    msg1Handle: function() {
      let id = this.$layer.msg("5s后刷新页面", {
        time: 5
      }, () => {
        this.$layer.close(id);
      });
    },
    loadingHandle: function() {
      let id = this.$layer.loading({
        time: 500
      });
      return id;
    },
    tipsHandle: function() {
      let id = this.$layer.tips("在很久很久以前", '#tips', {
        tips: 0,
        time: 100
      });
    },
    tips1Handle: function() {
      let id = this.$layer.tips("在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，", '#tips1', {
        tips: 1,
        time: 100
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
            check: 'aaaaaaaaxxxx'
          }
        },
        area: ['900px', '600px'],
        title: '',
        shade: false
      });
    }
  }
}
</script>
