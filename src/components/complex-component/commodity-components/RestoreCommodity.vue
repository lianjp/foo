<template>
  <el-popover
    v-model="visible"
    title="恢复商品申请"
    placement="top"
    popper-class="RestoreCommodity"
    width="160">
    <p class="m20">
      确定恢复吗？ {{ dispatchId }}
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
      class="popover_button"
      type="warning">
      恢复
    </el-button>
  </el-popover>
</template>
<script>
// trigger 默认 click
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    dispatchId: {
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
        return state['goodsModule/restoreGoods'] > 0
      }
    })
  },
  methods: {
    ...mapActions('goodsModule', ['restoreGoods']),
    async revokeHandler() {
      const { code, message } = await this.restoreGoods({
        ids: [this.dispatchId]
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
.RestoreCommodity {
  .m20 {
    margin: 20px 0;
  }
}
</style>
<style lang="less" scoped>
.popover_button {
  margin-left: 12px;
}
</style>
