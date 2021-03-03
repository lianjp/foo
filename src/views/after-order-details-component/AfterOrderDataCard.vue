<template>
  <div class="AfterOrderDataCard">
    <h5>退款详情</h5>
    <div class="cell">
      <span class="label">退款类型：</span>
      <span class="value">{{ rtype }}</span>
    </div>
    <div class="cell">
      <span class="label">退款金额：</span>
      <span class="value">{{ applyprice }}</span>
    </div>
    <div class="cell">
      <span class="label">退款原因：</span>
      <span class="value">{{ reason }}</span>
    </div>
    <div class="cell">
      <span class="label">退款说明：</span>
      <span class="value">{{ content }}</span>
    </div>
    <div class="cell">
      <span class="label">退款编号：</span>
      <span class="value">{{ refundno }}</span>
    </div>
    <div class="cell">
      <span class="label">订单编号：</span>
      <span class="value">{{ ordersn }}</span>
    </div>
    <div class="cell">
      <span class="label">订单金额：</span>
      <span class="value">{{ price }}</span>
    </div>
    <div class="cell">
      <span class="label">买家：</span>
      <span class="value">{{ username }}</span>
    </div>
    <div class="cell">
      <span class="label">付款时间：</span>
      <span class="value">{{ tt(paytime) }}</span>
    </div>
    <div class="cell">
      <span class="label">付款方式：</span>
      <span class="value">{{ paytype }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rtype: {
      default: '',
      type: String
    },
    applyprice: {
      default: '',
      type: String
    },
    reason: {
      default: '',
      type: String
    },
    content: {
      default: '',
      type: String
    },
    refundno: {
      default: '',
      type: String
    },
    ordersn: {
      default: '',
      type: String
    },
    price: {
      default: '',
      type: String
    },
    username: {
      default: '',
      type: String
    },
    paytime: {
      default: '',
      type: String
    },
    paytype: {
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
.AfterOrderDataCard {
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
    .label {
      min-height: 0;
      flex: 0 0 100px;
      text-align: right;
    }
    .value {
      min-height: 0;
      flex: 1 1 auto;
    }
  }
}
</style>
