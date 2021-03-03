<template>
  <div class="register_page">
    <h4 class="title">
      注册
    </h4>
    <RegisterForm
      class="registerForm"
      :clearable="registerLoading <=0"
      :disable="registerLoading >0"
      :loading="registerLoading >0"
      @submit="submit"
      @getVerifyCode="getVerifyCode"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {
      // step: 0
    }
  },
  computed: {
    ...mapState('loading', {
      registerLoading: 'userModule/register'
    })
  },
  methods: {
    ...mapActions('userModule', {
      verifyCode: 'verifyCode',
      register: 'register'
    }),
    async submit(formData) {
      const { code, message } = await this.register(formData)
      if (this.isSuccessful(code)) {
        this.$router.push({ name: 'login' })
      } else {
        this.$message({
          duration: 1500,
          message,
          type: 'error'
        })
      }
    },
    /**
     * * 获取验证码
     * * 只传输 mobile
     * * 注册验证码传输 securityCode = 'smsRegister'
     */
    async getVerifyCode({ securityCode, mobile }) {
      console.log({ securityCode, mobile })
      const { code, message } = await this.verifyCode({
        mobile: mobile,
        nowOperation: 'smsRegister'
      })
      this.$message({
        duration: 1500,
        message,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.register_page {
  .title {
    margin: 20px;
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
  }
  .registerForm {
    margin: auto;
  }
}
</style>
