<template>
  <el-popover
    v-model="visible"
    title="删除申请"
    placement="top"
    popper-class="deleteTrademark"
    width="160">
    <p class="m20">
      确定删除吗？ {{ trademarkId }}
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
      删除
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
        return state['trademarkModule/deleteTrademark'] > 0
      }
    })
  },
  methods: {
    ...mapActions('trademarkModule', ['deleteTrademark']),
    async revokeHandler() {
      const { code, message } = await this.deleteTrademark({
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
.deleteTrademark {
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
