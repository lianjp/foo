<template>
  <el-popover
    v-model="visible"
    title="上架商品申请"
    placement="top"
    popper-class="pushToShelves"
    width="160">
    <p class="m20">
      确定上架此商品吗？ {{ dispatchId }}
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
      class="popover_button">
      上架
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
        return state['goodsModule/pushToShelves'] > 0
      }
    })
  },
  methods: {
    ...mapActions('goodsModule', ['pushToShelves']),
    async revokeHandler() {
      const { code, message } = await this.pushToShelves({
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
.pushToShelves {
  .m20 {
    margin: 20px 0;
  }
}
</style>
<style lang="less" scoped>
.popover_button {
  margin-right: 12px;
}
</style>
