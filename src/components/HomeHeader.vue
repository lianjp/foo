<template>
  <header class="header">
    <ol class="ol_l">
      <li class="li left_menu">
        <router-link :to="{ name: 'home' }" class="link">
          <el-button
            type="text">
            <span class="a_text">
              首页
            </span>
          </el-button>
        </router-link>
      </li>
      <li class="li center_menu">
        <router-link
          v-for="(item, index) in centerMenuOptions"
          :key="index"
          :to="item.link"
          class="link">
          <el-button
            type="text">
            <span class="a_text">
              {{ item.name }}
            </span>
          </el-button>
        </router-link>
      </li>
      <li
        class="user_group_menu">
        <ELHoverPopover
          placement="bottom"
          width="210"
          trigger="hover">
          <div slot="reference">
            <router-link :to="{ name: 'Settings' }" class="link">
              <el-button
                class="lc1 w150"
                type="text">
                <span class="a_text">
                  {{ userName }}
                </span>
              </el-button>
            </router-link>
          </div>
          <UserMenuCard />
        </ELHoverPopover>
      </li>
    </ol>
  </header>
</template>

<script>
export default {
  props: {
    // logInState: {
    //   type: Boolean
    // },
    userName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      centerMenuOptions: [
        { name: '店铺概况', link: { name: 'Overview' } },
        { name: '商品管理', link: { name: 'Commodity' } },
        { name: '品牌管理', link: { name: 'Trademark' } },
        { name: '订单管理', link: { name: 'Order' } },
        { name: '售后维权', link: { name: 'AfterSaleOrder' } },
        { name: '金钱结算', link: { name: 'Financial' } },
        { name: '分销', link: { name: 'Distributor' } },
        { name: '操作日志', link: { name: 'HistoryLog' } },
        { name: '设置', link: { name: 'Settings' } }
      ]
    }
  },
  methods: {
    linkToLogIn() {
      this.$router.push({
        name: 'login',
        query: {
          redirectURL: encodeURI(location.href)
        }
      })
    },

    linkToRegister() {
      this.$router.push({
        name: 'register',
        query: {
          step: 0
          // redirectURL: encodeURI(location.href)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@grayColor: #333;
.router-link-active {
  .a_text {
    font-weight: bold;
    color: darken(@themeColor, 20%);
  }
}
.header {
  border-bottom: 2px solid @themeColor;
  background-color: #f2f2f2;
}
.header {
  height: 50px;
  .link {
    display: inline-block;
  }
  .ol_l {
    width: 1200px;
    margin: auto;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;

    .center_menu {
      flex: 1 1 auto;
      margin-left: 100px;
      .link {
        margin-right: 30px;
      }
    }
  }
}
</style>
