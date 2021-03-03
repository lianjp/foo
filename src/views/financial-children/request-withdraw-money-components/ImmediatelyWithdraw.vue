<template>
  <div class="ImmediatelyWithdraw">
    <div class="main_slot" @click="clickhandler">
      <slot :loading="sureBindingWxCount > 0 || applyWithdrawCount> 0" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    applyType: {
      default: '0',
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('loading', {
      sureBindingWxCount: 'userModule/sureBindingWx',
      applyWithdrawCount: 'financialModule/applyWithdraw'
    })
  },
  methods: {
    ...mapActions('userModule', ['sureBindingWx']),
    ...mapActions('financialModule', ['applyWithdraw']),
    clickhandler() {
      this.dialogVisible = true
      this.verifyBound()
    },
    async verifyBound() {
      const { code, message } = await this.sureBindingWx()
      if (this.isSuccessful(code)) {
        this.apply()
      } else {
        this.$message({
          type: 'error',
          message,
          duration: 3000
        })
      }
    },
    async apply() {
      const { code, message } = await this.applyWithdraw({
        applyType: this.applyType
      })
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        message,
        duration: 3000
      })
      if (this.isSuccessful(code)) {
        this.$emit('success')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ImmediatelyWithdraw {
  margin-left: 10px;
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>
