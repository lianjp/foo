<template>
  <li
    class="PicThumbItem"
    :style="{
      marginRight: `${itemGap}px`,
      width: `${width}px`
    }">
    <!-- 使用位置没变化， name = default，可以传参 -->
    <slot :itemGap="itemGap" />
  </li>
</template>
<script>
export default {
  props: {
    itemGap: {},
    width: {}
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.PicThumbItem {
  // display: inline-block;
}
</style>
