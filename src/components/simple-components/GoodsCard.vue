<template>
  <section class="GoodsCard">
    <router-link
      :to="{
        name: 'GoodsDetails',
        params:{
          id: id
        }
      }"
      :title="title">
      <img
        :alt="`${title}_picture`"
        :src="picture"
        class="GoodsCard_img">
    </router-link>
    <div class="GoodsCard_more_info">
      <p class="title">
        <router-link
          :to="{
            name: 'GoodsDetails',
            params:{
              id: id
            }
          }"
          :title="title">
          <span class="content">
            {{ title }}
          </span>
        </router-link>
      </p>
    </div>
    <div class="GoodsCard_footer">
      <div class="marketprice">
        <strong>
          {{ marketprice }}
        </strong>
      </div>
      <div class="operation">
        <el-button
          class="add_button"
          type="text"
          size="mini">
          加入购物车
        </el-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    id: {},
    title: {
      type: String
    },
    picture: {
      type: String
    },
    marketprice: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
@goodsImgSize: 200px;
.GoodsCard {
  width: 240px;
  height: 334px;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.16);
}
.GoodsCard_img {
  display: block;
  margin: 0 auto 10px;
  width: @goodsImgSize;
  height: @goodsImgSize;
}
.GoodsCard_more_info {
  margin: 0 auto 10px;
  .title {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    word-break: break-all;
    .content {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      font-family: arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
      &:hover {
        color: @themeColor;
      }
    }
  }
}
.GoodsCard_footer {
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-between;
  .marketprice {
    color: #f04c4b;
    font-size: 18px;
    height: 25px;
    line-height: 25px;
  }
  .add_button {
    // opacity: 0;
    display: none;
  }
}
.GoodsCard:hover .GoodsCard_footer .add_button {
  // opacity: 1;
  display: block;
}
</style>
