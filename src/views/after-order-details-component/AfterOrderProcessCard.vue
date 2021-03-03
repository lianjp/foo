<template>
  <div class="AfterOrderProcessCard">
    <div class="cell">
      <span class="label-head">请处理退货退款申请</span>
    </div>
    <div class="cell">
      <span class="label">如果您同意，请将正确的退货地址提供给买家</span>
    </div>
    <div class="cell">
      <span class="label">如果您拒绝买家可以申请客服介入</span>
    </div>
    <div class="cell">
      <span
        class="label"
      >如果您逾期未处理，系统将自动处理买家的退货退款申请</span>
    </div>
    <div class="cell">
      <span class="label">
        <AgreementMessageBox>
          <el-button>
            同意退货退款
          </el-button>
        </AgreementMessageBox>

        <RefundsRefuseMessageBox :refund-id="id">
          <el-button>
            拒绝申请
          </el-button>
        </RefundsRefuseMessageBox>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.AfterOrderProcessCard {
  padding: 10px;
  border: 1px solid #ddd;
  h5 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
  .cell {
    display: flex;
    margin-top: 15px;
    align-items: center;
    .label-head {
      color: rgb(255, 153, 0);
    }
    .label {
      min-height: 0;
      xflex: 0 0 100px;
      text-align: right;
    }
    .value {
      min-height: 0;
      flex: 1 1 auto;
    }
  }
}
</style>
