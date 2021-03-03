<template>
  <div class="UserMenuCard">
    <!-- 用户的小卡片，可以和 vuex 直接交互，所以放在 complex-component -->
    <header class="UserMenuCard_header">
      <img
        class="UserMenuCard_avatar"
        src="/favicon.ico"
        alt="avatar"
      >
      <p class="userName line_clamp_1 coursor_default">
        {{ userName }}
      </p>
    </header>
    <!-- <GridTable
        :tableWidth="210"
        :itemWidth="90"
        :itemXGap="30"
        :itemYGap="10">
        <GridTableItem
          v-for="(item, index) in menuArray"
          :key="index">
          <router-link
            :to="item.link"
            class="nav_item link coursor_pointer"
            tag="div">
            <span class="link_span"> {{ item.name }} </span>
          </router-link>
        </GridTableItem>
      </GridTable> -->
    <tf-hr />
    <footer class="UserMenuCard_footer">
      <el-button
        size="mini"
        type="text"
        @click="logOut"
      >
        退出登录
      </el-button>
    </footer>
  </div>
</template>
<script>
// complex-component 基本不拿 props
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      menuArray: [
        { link: { name: '' }, name: '我的订单' },
        { link: { name: '' }, name: '收货地址' },
        { link: { name: '' }, name: '基本资料' },
        { link: { name: '' }, name: '修改密码' },
        { link: { name: '' }, name: '收藏夹' },
        { link: { name: '' }, name: '退换货' }
      ]
    }
  },
  computed: {
    ...mapState('userModule', {
      userName: 'userName'
    })
  },
  methods: {
    ...mapActions('userModule', {
      logOutAction: 'logOut'
    }),
    async logOut() {
      const { code, message } = await this.logOutAction()
      this.$message({
        message,
        duration: 1500,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
<style lang="less" scoped>
@userAvatarSize: 48px;
.UserMenuCard {
  // 用户小卡片
  .UserMenuCard_header {
    display: flex;
    height: 80px;
    align-items: center;
    .UserMenuCard_avatar {
      height: @userAvatarSize;
      width: @userAvatarSize;
      border-radius: 50%;
      display: block;
      background-color: darken(#fff, 20%);
    }
    .userName {
      color: @themeBlack;
      flex: 1 1 auto;
      width: 0;
      text-indent: 10px;
      font-size: 14px;
    }
  }
  .nav {
    .nav_item {
      width: 90px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: darken(#ffffff, 8%);
      color: lighten(#000000, 8%);
      &.router-link-active {
        background-color: lighten(#000000, 8%);
        color: darken(#ffffff, 8%);
      }
    }
  }
  .UserMenuCard_footer {
    text-align: right;
  }
}
</style>
