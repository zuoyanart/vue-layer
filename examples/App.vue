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
    <h2 class="title">prompt</h2>
    <el-button type="primary" @click="promptHandle">弹出</el-button>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h2 class="title">tips</h2>
    <el-button type="primary" id="tips" @click="tipsHandle">上</el-button>
    <el-button type="primary" id="tips1" @mouseenter.native="tips1Handle">右</el-button>
    <el-button type="primary" id="tips2" @click="tips2Handle">下</el-button>
    <el-button type="primary" id="tips3" @click="tips3Handle">左-自定义样式</el-button>
    <h2 class="title">page</h2>
    <el-button type="primary" id="tips" @click="pageHandle">自定义</el-button>
    <br />
    <br />
    <h2 class="title">表格测试</h2>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="submitHandle(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmHandle(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" id="tipst" @click="tipstHandle" size="mini">上</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import formComp from "./form.vue";
export default {
  name: "app",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    submitHandle() {
      this.$layer.alert(
        "这是个演示，this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!this is demo!!!",
        {
          shade: true,
          icon: 3,
          title: "dd"
        },
        laeryid => {
          this.$layer.close(laeryid);
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
        layerid => {
          // this.$layer.msg("执行了删除");
          alert(layerid);
          this.$layer.close(layerid);
        },
        layerid => {
          this.$layer.msg("执行取消");
          this.$layer.close(layerid);
        }
      );
      return id;
    },
    msgHandle() {
      this.$layer.msg("弱弱的提示");
    },
    msg1Handle() {
      let id = this.$layer.msg(
        "5s后刷新页面",
        {
          time: 5
        },
        layerid => {
          alert(layerid);
          this.$layer.close(id);
        }
      );
    },
    loadingHandle() {
      for (let i = 0; i < 10; i++) {
        console.log("i=", i);
        this.$layer.loading({
          time: i + 3
        });
      }
    },
    promptHandle() {
      this.$layer.prompt("你好");
    },
    tipsHandle() {
      this.$layer.tips("在很久很久以前", "#tips", {
        tips: 0,
        time: 100
      });
    },
    tips1Handle() {
      this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tips1",
        {
          tips: 1,
          time: 100
        }
      );
    },
    tips2Handle() {
      this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tips2",
        {
          tips: 2
        }
      );
    },
    tips3Handle() {
      this.$layer.tips(
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
    tipstHandle() {
      this.$layer.tips(
        "在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，在很久很久以前，",
        "#tipst",
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
      this.$layer.iframe({
        content: {
          content: formComp,
          parent: this
        },
        area: ["900px", "600px"],
        title: "这是一个标题这是一个标题这是一个标题这是一个标题",
        maxmin: true,
        shade: true,
        shadeClose: false,
        scrollbar: false,
        resize: true,
        cancel: () => {
          alert(2110);
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: 1000px;
}
</style>
