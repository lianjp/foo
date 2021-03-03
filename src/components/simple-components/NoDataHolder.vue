<template>
  <div
    v-show="showNoData"
    class="NoDataHolder">
    <!-- {{loading}}{{showNoData}} {{ Object.keys(this.items).length === 0}} -->
    <p>
      <span>
        {{ message }}
      </span>
    </p>
    <slot />
    <!-- 无数据占位符 -->
  </div>
</template>
<script>
// loading 为 true 时候不显示文字，
// loading 为 false，如果数据是空，显示文字。
export default {
  props: {
    message: {
      default: '暂无数据',
      type: String
    },
    loading: {
      type: Boolean
    },
    items: {}
  },
  computed: {
    showNoData() {
      return !this.loading && Object.keys(this.items).length === 0
    }
  }
}
</script>

<style lang="less" scoped>
.NoDataHolder {
  color: #838383;
  font-size: 28px;
  text-align: center;
  padding: 40px;
  user-select: none;
  letter-spacing: 12px;
  background-color: #fff;
}
</style>
