<template>
  <div class="ProductionCard">
    <!-- {{ name }} {{ img }} -->
    <!-- <img class="left" :src="img" :alt="name"> -->
    <el-image class="left" :src="img" lazy />
    <div class="right">
      <p class="cate">
        [{{ cate }}]
      </p>
      <p class="name">
        {{ name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '商品名称未知'
    },

    cate: {
      type: String,
      default: '商品分类未知'
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
@picSize: 40px;
.ProductionCard {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  .left {
    display: block;
    height: @picSize;
    width: @picSize;
    /deep/ img {
      width: 100%;
    }
  }
  .right {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    margin-left: 10px;
    .cate {
      color: red;
      height: 20px;
      line-height: 20px;
    }
    .name {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
