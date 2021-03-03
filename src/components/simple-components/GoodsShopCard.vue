<template>
  <div class="GoodsShopCard">
    <header class="GoodsShopCard_header">
      <span class="title">购物车</span> <span
        :data-shop-total="num"
        class="goods_num">您已购买 <b class="num">{{ num }}</b> 件商品</span>
    </header>
    <tf-hr />
    <footer class="GoodsShopCard_footer">
      <el-button
        type="primary"
        size="mini"
        @click="$router.push({name: 'ShoppingCart'})">
        进入购物车查看
      </el-button>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 10
    }
  }
}
</script>
<style lang="less" scoped>
.GoodsShopCard_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    color: @themeColor;
    font-size: 14px;
  }
  .goods_num {
    font-size: 12px;
    color: darken(#ffffff, 40%);
  }
  .num {
    color: @themeColor;
  }
}
.GoodsShopCard_footer {
  text-align: center;
}
</style>
