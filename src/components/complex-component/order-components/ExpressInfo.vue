<template>
  <div class="ExpressInfo">
    <el-dialog
      v-if="dialogVisible"
      title="查看物流"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="80%"
      top="5vh"
      :modal="true"
      custom-class="ExpressInfoDialog"
      :append-to-body="true"
    >
      <tf-loading :loading="[getExpressInfoByIdCount]">
        <div class="main">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in ExpressInfoData"
              :key="index"
              :color="''"
              :timestamp="item.time"
            >
              {{ item.step }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <div slot="footer" class="dialog_footer">
          <el-button @click="closeDialog">
            关闭
          </el-button>
        </div>
      </tf-loading>
    </el-dialog>

    <div class="main_slot" @click="clickhandler">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    dispatchId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('orderModule', ['ExpressInfoData']),
    ...mapState('loading', {
      getExpressInfoByIdCount: 'orderModule/getExpressInfoById'
    })
  },
  methods: {
    ...mapActions('orderModule', ['getExpressInfoById']),
    clickhandler() {
      this.dialogVisible = true
      this.getExpressInfoById({
        id: this.dispatchId
      })
    },
    closeDialog() {
      if (this.getExpressInfoByIdCount > 0) {
        return
      }
      this.dialogVisible = false
    },
    beforeClose(done) {
      if (this.getExpressInfoByIdCount > 0) {
        return
      }
      done()
    }
  }
}
</script>

<style lang="less" scoped>
// 组件表单
.ExpressInfo {
  display: inline-block;
  margin-left: 10px;
  .main_slot {
    display: inline-block;
  }
}
</style>

<style lang="less">
// 弹窗
@dialogGap: 190px;
.ExpressInfoDialog {
  .main {
    padding: 20px 40px 0px;
    min-height: 100px;
    overflow-y: auto;
    max-height: calc(90vh - @dialogGap);
  }
}
</style>
