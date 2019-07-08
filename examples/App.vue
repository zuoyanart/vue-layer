<template>
  <div id="app">
    <h2 class="title">alert</h2>
    <el-button type="primary" @click="submitHandle">提交</el-button>
    <h2 class="title">confirm</h2>
    <el-button type="primary" @click="confirmHandle">删除</el-button>
    <h2 class="title">msg</h2>
    <el-button type="primary" @click="msgHandle">msg</el-button>
    <el-button type="primary" @click="msg1Handle">带回调</el-button>
    <h2 class="title">loading</h2>
    <el-button type="primary" @click="loadingHandle">默认样式</el-button>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    submitHandle() {
      this.$layer.alert(
        "this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!<br/>this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!",
        {
          shade: true,
          icon: 2
        },
        index => {
          this.$layer.close(index);
        }
      );
    },
    confirmHandle() {
      let id = this.$layer.confirm(
        "确定要<br/>删除吗？",
        {
          title: "ces",
          btn: ["asd", "4545"],
          icon: 3
        },
        () => {
          // this.$layer.msg("执行了删除");
          // this.$layer.close(id);
          this.$layer.alert(1);
        },
        () => {
          this.$layer.msg("执行取消");
          this.$layer.close(id);
        }
      );
    },
    msgHandle() {
      let id = this.$layer.msg("弱弱的提示");
    },
    msg1Handle() {
      let id = this.$layer.msg(
        "5s后刷新页面",
        {
          time: 5
        },
        () => {
          this.$layer.close(id);
        }
      );
    },
    loadingHandle() {
      let id = this.$layer.loading({
        time: 3
      });
      return id;
    },
    promptHandle() {
      this.$layer.prompt("你好");
    },
    tipsHandle() {
      let id = this.$layer.tips("在很久很久以前", "#tips", {
        tips: 0,
        time: 100
      });
    },
    tips1Handle() {
      let id = this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tips1",
        {
          tips: 1,
          time: 100
        }
      );
    },
    tips2Handle() {
      let id = this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tips2",
        {
          tips: 2
        }
      );
    },
    tips3Handle() {
      let id = this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tips3",
        {
          tips: [
            3,
            {
              selfa: true
            }
          ],
          time: 10
        }
      );
    },
    pageHandle() {
      let ids = this.$layer.iframe({
        content: {
          content: formComp,
          parent: this,
          data: {
            check: { a: "aaaaaaaaxxxx" },
            fn: () => {
              alert(1);
            }
          }
        },
        area: ["900px", "600px"],
        title: '这是一个标题这是一个标题这是一个标题这是一个标题',
        maxmin: true,
        shade: false,
        shadeClose: false,
        cancel: () => {
          alert(2110);
        }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
