<template>
  <div
    class="button_group__right">
    <span class="multipleSelection_length">
      已选：
      <em>
        {{ multipleSelection.length }}
      </em>
      个
    </span>
    <el-button
      size="small"
      type="text"
      @click="$emit('toggleSelection')">
      清空选择
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    multipleSelection: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
.pagination {
  position: relative;
  .button_group__right {
    .multipleSelection_length {
      font-size: 14px;
      color: lighten(black, 50%);
      em {
        color: red;
      }
      margin-right: 10px;
    }
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
