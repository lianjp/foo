<template>
  <div class="ProductionCard">
    {{ name }} {{ img }}
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '商品名称未知'
    },

    img: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.ProductionCard {
}
</style>
