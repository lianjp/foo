<template>
  <section class="LogInPage">
    <!-- <span> -->
    <!-- 登录页面，登录完成后会跳转 {{redirectURL}} -->
    <!-- registerSupplierState: {{ registerSupplierState }} -->
    <!-- </span> -->
    <LogInForm
      :clearable="logInCount == 0"
      :loading="logInCount !== 0"
      class="form"
      @submit="logInAction"
    />
  </section>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: {
    redirectURL: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('loading', {
      logInCount: 'userModule/logIn'
    }),
    ...mapGetters('userModule', ['registerSupplierState'])
  },
  methods: {
    ...mapActions('userModule', {
      logIn: 'logIn'
    }),
    async logInAction(formData) {
      const { code, message } = await this.logIn(formData)
      console.log(code, message)
      /**
       * 登录平台成功后，判断是否已申请了加盟。
       */
      if (this.isSuccessful(code)) {
        if (this.registerSupplierState === 'NORMAL') {
          // 正常使用的 供应商
          return this.$router.push({
            name: 'home'
          })
        } else {
          // 等待审核
          return this.$router.push({ name: 'RegisterSupplierPage' })
        }
      }
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        duration: 1500,
        message
      })
    }
  }
}
</script>
<style lang="less" scoped>
.LogInPage {
  height: 100vh;
  // border: 1px solid #ddd;
  position: relative;
  .form {
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 15px;
    border: 1px solid #ddd;
    padding: 75px 45px 20px 45px;
    top: 0;
    bottom: 0;
    width: 500px;
    height: 250px;
    margin: auto;
  }
}
</style>
