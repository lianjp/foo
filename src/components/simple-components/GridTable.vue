<template>
  <section class="GridTable">
    <ol
      class="table table_ol grid_table"
      :style="gridStyle">
      <slot />
    </ol>
  </section>
</template>
<script>
export default {
  props: {
    alignItems: {
      type: String,
      default: ''
    },
    tableWidth: {
      type: Number,
      default: 1000
    },
    itemWidth: {
      type: Number,
      default: 200
    },
    itemXGap: {
      // X 方向的 item 基础间隔（会被剩余宽度平分而变大。）
      type: Number,
      default: 0
    },
    itemYGap: {
      // Y 方向的 item 间隔，固定值
      type: Number,
      default: 0
    }
    // , 不再给定 height， 自适应
    // itemHeight: {}
  },
  data() {
    return {}
  },
  computed: {
    gridStyle() {
      const tableWidth = parseInt(this.tableWidth)
      const itemXGap = parseInt(this.itemXGap)
      const itemYGap = parseInt(this.itemYGap)
      const itemWidth = parseInt(this.itemWidth)

      const x = parseInt((tableWidth + itemXGap) / (itemXGap + itemWidth))

      return {
        width: `${tableWidth}px`,
        'grid-template-columns': `repeat(${x}, ${itemWidth}px)`,
        'grid-gap': `${itemYGap}px ${itemXGap}px`,
        'align-items': `${this.alignItems}`
      }
    }
  }
}
</script>
<style lang="less" scoped>
.GridTable {
  .table_ol {
    display: grid;
    grid-gap: 10px 10px;
    // align-items: center;
    justify-items: stretch;
    justify-content: space-between;
    grid-template-columns: repeat(4, 1fr);
    margin: auto;
    // justify-content: center;
    // grid-template-rows: 200px;
    // .item {
    //   height: 300px;
    // }
  }
}
</style>
