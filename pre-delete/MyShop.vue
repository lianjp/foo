<template>
  <section class="MyShop">
    <HomeHeader
      v-bind="{
        userName
      }" />
    <HomeSearchSection
      :width="1200"
      class="HomeSearchSection" />
    <section class="main">
      <div class="left_body">
        <section class="user_info">
          <img
            src="./../assets/logo.png"
            alt="user-icon">
          <div class="s-name line_clamp_1">
            {{ userName }}
          </div>
        </section>
        <tf-hr />
      </div>
      <div class="right_body">
        <transition
          name="el-fade-in-linear"
          mode="out-in">
          <router-view />
        </transition>
      </div>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      menuArray: [
        { link: { name: 'MyOrder' }, name: '我的订单' },
        { link: { name: 'ShippingAddress' }, name: '收货地址' },
        { link: { name: 'MyInformation' }, name: '基本资料' },
        { link: { name: 'ChangePassword' }, name: '修改密码' },
        { link: { name: 'ShoppingCart' }, name: '购物车' },
        { link: { name: 'MyFavorite' }, name: '收藏夹' },
        { link: { name: 'AfterSalesService' }, name: '退换货' }
      ]
    }
  },
  computed: {
    ...mapState('userModule', {
      userName: 'userName'
    })
  }
}
</script>
<style lang="less" scoped>
@userImgSize: 50px;
.link_span {
  color: @themeBlack;
}
.HomeSearchSection {
  background-color: #fff;
}
.MyShop {
  background: @themeGray;
  .main {
    display: flex;
    margin: auto;
    padding: 10px 0;
    justify-content: space-between;
    width: 1200px;
    .left_body {
      background-color: #fff;
      width: 216px;
      .user_info {
        padding: 20px;
        img {
          display: block;
          width: @userImgSize;
          height: @userImgSize;
          margin: auto;
        }
        .s-name {
          text-align: center;
          color: @themeBlack;
          font-size: 18px;
        }
      }
      .menu {
        width: 160px;
        margin: auto;
        .menu_item {
          margin-bottom: 10px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          &:hover {
            transition: all linear 0.3s;
            background-color: lighten(@themeColor, 20%);
          }
          .menu_button {
            min-width: 80px;
            text-align: justify;
            .link_icon {
              float: right;
            }
          }
          &.router-link-active {
            background-color: @themeColor;
            .link_span {
              color: white;
            }
          }
        }
      }
    }
    .right_body {
      background-color: #fff;
      width: 945px;
    }
  }
}
</style>
