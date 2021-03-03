<template>
  <div class="OrderDataCard">
    <h5>订单信息</h5>
    <div class="cell">
      <span class="label">订单编号：</span>
      <span class="value">{{ ordersn }}</span>
    </div>
    <div class="cell">
      <span class="label">订单金额：</span>
      <span class="value">{{ price }}</span>
    </div>
    <div class="cell">
      <span class="label">付款方式：</span>
      <span class="value">{{ paytype }}</span>
    </div>
    <div class="cell">
      <span class="label">买家：</span>
      <span class="value">{{ realname }}</span>
    </div>
    <div class="cell">
      <span class="label">分销商：</span>
      <span class="value">{{ storename }}</span>
    </div>
    <!-- <div class="cell">
      <span class="label">买家：</span>
      <span class="value">{{ storename }}</span>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    ordersn: {
      default: '',
      type: String
    },

    price: {
      default: '',
      type: String
    },

    paytype: {
      default: '',
      type: String
    },

    realname: {
      default: '',
      type: String
    },
    // 分销商名称
    storename: {
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
.OrderDataCard {
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
