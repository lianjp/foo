<template>
  <div class="OrderDataCard">
    <h5>物流信息</h5>
    <div class="cell">
      <span class="label">配送方式：</span>
      <span class="value">{{ expresscom || '暂无' }}</span>
    </div>
    <div class="cell">
      <span class="label">物流单号：</span>
      <span class="value">{{ expresssn || '暂无' }}</span>
    </div>
    <div class="cell">
      <span class="label">物流收货人：</span>
      <span class="value">{{ address }}</span>
    </div>
    <div class="cell">
      <span class="label">邮编：</span>
      <span class="value">{{ zipcode || '暂无' }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    expresscom: {
      default: '',
      type: String
    },
    expresssn: {
      default: '',
      type: String
    },
    address: {
      default: '',
      type: String
    },

    zipcode: {
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
