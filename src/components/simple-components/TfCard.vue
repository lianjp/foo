<template>
  <div :class="['TfCard', border?'border':'']">
    <header class="header">
      {{ title }}
    </header>
    <div class="card_content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '请设置 title 标题'
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
@padding: 10px;
.TfCard {
  .header {
    height: 50px;
    line-height: 50px;
    background-color: #eeeeee;
    text-indent: @padding;
  }
  .card_content {
    padding: @padding;
  }
}
.TfCard.border {
  border: 1px solid #ddd;
  .header {
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
