<template>
  <div class="register_page">
    <el-steps
      :active="step"
      finish-status="success">
      <el-step title="确认账号" />
      <el-step title="重置密码" />
      <el-step title="设置成功" />
    </el-steps>
    <CheckUserMobile
      v-if="localStep === 0"
      class="form_1"
      :clearable="checkUserMobileLoading <=0"
      :disable="checkUserMobileLoading >0"
      :loading="checkUserMobileLoading >0"
      @submit="submitCheckUserMobile" />
    <!-- 设置密码 -->
    <SetPasswdForm
      v-if="localStep === 1"
      ref="form2"
      clearable
      class="form_2"
      @submit="submitSetPassWd"
      @getVerifyCode="getVerifyCode" />
    <ActionSucceed
      v-if="localStep === 2"
      class="form_3"
      :time-count="5"
      @timeEnd="$router.push({name: 'home'})" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CheckUserMobile from './forgot-passwd-page-component/CheckUserMobile'
import SetPasswdForm from './forgot-passwd-page-component/SetPasswdForm'

export default {
  components: {
    CheckUserMobile,
    SetPasswdForm
  },
  props: {
    step: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('loading', {
      checkUserMobileLoading: 'userModule/checkUserMobile'
    }),
    localStep: {
      get() {
        return this.step
      },
      set(val) {
        this.$routerNQrep({ step: val })
      }
    }
  },
  methods: {
    ...mapActions('userModule', [
      'checkUserMobile',
      'verifyCode',
      'resetPasswd'
    ]),
    async submitCheckUserMobile(formData) {
      const { code, message } = await this.checkUserMobile(formData)
      if (this.isSuccessful(code)) {
        this.localStep = 1
      } else {
        this.$message({
          duration: 1500,
          message,
          type: 'error'
        })
      }
    },
    /**
     * * 重新设置
     */
    async submitSetPassWd(formData) {
      const { code, message } = await this.resetPasswd(formData)
      this.$message({
        duration: 1500,
        message,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
      if (this.isSuccessful(code)) {
        this.localStep++
      }
    },
    async getVerifyCode({ securityCode, mobile }) {
      console.log({ securityCode, mobile })
      const { code, message } = await this.verifyCode({
        mobile: mobile,
        nowOperation: 'smsForgot'
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
  border: 1px solid #ddd;
  padding: 120px 300px 0;
  .form_1,
  .form_2 {
    margin: auto;
  }
}
</style>
