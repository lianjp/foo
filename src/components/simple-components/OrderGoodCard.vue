<template>
  <div class="OrderGoodCard">
    <img class="OrderCard_img" :src="goodPicture" :alt="goodsName">
    <div class="goodsName">
      <VClamp :max-lines="1" autoresize>
        {{ goodsName || '名称未知' }}
      </VClamp>
    </div>
    <div class="right">
      <div class="price">
        {{ price || '价格未知' }}
      </div>
      <div class="total">
        数量： {{ total || '数目未知' }}
      </div>
    </div>
  </div>
</template>
<script>
// 订单商品图片
export default {
  props: {
    goodId: {
      default: '',
      type: String
    },
    goodsName: {
      default: '',
      type: String
    },
    goodPicture: {
      default: '',
      type: String
    },
    total: {
      default: '',
      type: String
    },
    price: {
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
@OrderImgSize: 50px;
.OrderGoodCard {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  .OrderCard_img {
    width: @OrderImgSize;
    height: @OrderImgSize;
  }
  .goodsName {
    text-align: center;
    min-width: 0;
    flex: 1 1 auto;
  }
  .right {
    text-align: right;
    min-width: 0;
    flex: 0 0 100px;
  }
}
</style>
