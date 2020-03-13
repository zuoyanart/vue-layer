<!--
@Author: 左盐
@Date:   2018-03-31 10:05:44
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-31 10:10:33
-->
<template lang="html">
  <el-form ref="form" :model="form" label-width="80px" style="height:100px;">
<el-form-item label="活动名称">
  <el-input v-model="form.name"></el-input>
</el-form-item>
<el-form-item label="活动区域">
  <el-select v-model="form.region" placeholder="请选择活动区域">
    <el-option label="区域一" value="shanghai"></el-option>
    <el-option label="区域二" value="beijing"></el-option>
  </el-select>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="onSubmit">立即创建</el-button>
  <el-button @click="quxiao">取消</el-button>
</el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      }
    },
    layerid: {
      type: String,
      default: ""
    },
    fn: {
      type: Function,
      default: function() { }
    },
    lydata: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      // alert(JSON.stringify(this.form));
      // console.log(this.parent);
      // console.log("$parent");
      // console.log(this.$parent);
      // console.log(this.form);
      this.$layer.msg("提交成功", () => {
        this.lydata.info.name = this.form.name;
        this.$layer.close(this.layerid);
      });
      // this.$parent.$emit('asd', 'kkk');
    },
    quxiao() {
      this.fn();
      this.$layer.close(this.layerid);
    }
  },
  mounted() {
    this.form = this.info;
  }
};
</script>

<style lang="css">
</style>