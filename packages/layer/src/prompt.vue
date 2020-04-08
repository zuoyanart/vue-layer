<template>
  <base-drag :options="options" :cls="cls">
    <div class="vl-notify-content" :style="contentStyle" :id="id">
      <div style="width:100%;padding:20px 20px 0 20px;">
        <input :type="inputType" class="vl-input" v-model="form.value" v-if="options.formType!=3" />
        <textarea class="vl-textarea" v-model="form.value" v-else></textarea>
        <div class="prompt-btn">
          <pzbutton btn="primary" @click.native="btnyes" size="small">确定</pzbutton>
          <pzbutton btn @click.native="btncancel" size="small">取消</pzbutton>
        </div>
      </div>
    </div>
  </base-drag>
</template>

<script>
import helper from "./helper/helper.js";
import drag from "./components/drag/drag";
import pzbutton from "./components/button/button.vue";

export default {
  data() {
    return {
      cls: {
        "vl-notify-iframe": true
      },
      form: {
        value: this.options.value
      },
      id: "vlip" + new Date().getTime()
    };
  },
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  components: {
    "base-drag": drag,
    pzbutton
  },
  computed: {
    contentStyle() {
      const areaHeight = (parseInt(this.options.area[1]) || 100) - 50;
      return {
        height: areaHeight + "px",
        minHeight: "inherit",
        overflow: "auto"
      };
    },
    inputType() {
      let s = 'text';
      if (this.options.formType == 1) {
        s = 'text';
      } else if (this.options.formType == 2) {
        s = 'password';
      }
      return s;
    }
  },
  async mounted() {
    helper.hiddenScrollBar(this.options);
  },
  methods: {
    btnyes(event) {
      helper.btnyes(event, this.options, this.form.value);
    },
    btncancel(event) {
      helper.btncancel(event, this.options);
    }
  }
};
</script>


<style lang="less" scoped>
.vl-input {
  width: 100%;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-sizing: border-box;
}
.vl-textarea {
  width: 100%;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  line-height: 22px;
  padding: 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-sizing: border-box;
  word-break: break-all;
  height: calc(100% - 70px);
}

.prompt-btn {
  margin-top: 30px;
  text-align: right;
  button {
    margin-right: 20px;
  }
}
</style>
