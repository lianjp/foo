<template>
  <span :class="['colored_span', type.toLowerCase() || 'main']">
    <slot />
  </span>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      // primary / success / warning / danger / info
      default: 'main'
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  color: #303133;
}
.primary {
  color: #3bb0eb;
}
.success {
  color: #67c23a;
}
.warning {
  color: #e6a23c;
}
.danger {
  color: #f56c6c;
}
.info {
  color: #909399;
}
</style>
