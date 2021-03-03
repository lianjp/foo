<template>
  <el-popover
    v-model="visible"
    title="撤销申请"
    placement="top"
    popper-class="canceltrademark"
    width="160">
    <p class="m20">
      确定撤销吗？ {{ trademarkId }}
    </p>
    <div style="text-align: right; margin: 0">
      <el-button
        :disabled="loading"
        size="mini"
        type="text"
        @click="visible = false">
        取消
      </el-button>
      <el-button
        type="primary"
        size="mini"
        :loading="loading"
        @click="revokeHandler">
        确定
      </el-button>
    </div>
    <el-button
      slot="reference"
      size="mini"
      type="warning">
      撤销
    </el-button>
  </el-popover>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    trademarkId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState('loading', {
      loading: state => {
        return state['trademarkModule/revokeTrademark'] > 0
      }
    })
  },
  methods: {
    ...mapActions('trademarkModule', ['revokeTrademark']),
    async revokeHandler() {
      const { code, message } = await this.revokeTrademark({
        id: this.trademarkId
      })
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        message
      })
      this.visible = false
      if (this.isSuccessful(code)) {
        this.$emit('success', { code, message })
      }
    }
  }
}
</script>
<style lang="less">
.canceltrademark {
  .m20 {
    margin: 20px 0;
  }
}
</style>
