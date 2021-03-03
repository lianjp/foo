<template>
  <div class="EditCommodity">
    <EditCommodityForm
      v-if="dialogVisible"
      :key="dispatchId"
      :dispatch-id="dispatchId"
      :visible.sync="dialogVisible"
      @success="$emit('success')"
    />
    <div class="main_slot" @click="clickhandler">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
// 金钱正则
// const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
// const reg1 = '/^(0|[1-9]\d{0,3})(\.\d{1,2})?$/';
// import hljs from 'highlight.js'

export default {
  props: {
    dispatchId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},

  created() {
    // this.getBrandData()
    // this.getAllWareHouse()
    // this.getDispatchData()
    // this.getAllGoodsCateListData()
  },

  methods: {
    clickhandler() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
// 组件表单
.EditCommodity {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>

<style lang="less">
// 弹窗
@dialogGap: 122px;
.EditCommodityDialog {
  .AddNewCommodityForm,
  .AddNewCommodityForm2,
  .AddNewCommodityForm3 {
    // padding-top: 20px;
    .pt(20px);
    margin: auto;
  }
  .AddNewCommodityForm2 {
    .not_hasoption {
      min-height: 275px;
    }
    .has_option {
      min-height: 275px;
    }
  }
  .AddNewCommodityForm3 {
    min-height: 160px;
  }
  .dialog_body {
    max-height: calc(90vh - @dialogGap);
    overflow-y: auto;
    .title {
      text-indent: 2em;
      font-size: 16px;
      line-height: 2;
      border-bottom: 1px solid #dddddd;
    }
  }
  .dialog_footer {
    text-align: center;
    min-height: 40px;
  }
  .commodity-el-upload {
    min-height: 208px;
  }
}
</style>
