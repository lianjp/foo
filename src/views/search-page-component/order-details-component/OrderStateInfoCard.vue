<template>
  <div class="OrderStateInfoCard">
    <h5>订单状态</h5>
    <div class="cell">
      <span class="label">订单状态：</span>
      <span class="value">{{ status | orderTypeToLabel }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: {
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
.OrderStateInfoCard {
  padding: 10px;
  border: 1px solid #ddd;
  h5 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
  .cell {
    display: flex;
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
  .cell + .cell {
    margin-top: 15px;
  }
}
</style>
