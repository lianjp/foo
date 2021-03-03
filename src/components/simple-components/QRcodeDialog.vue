<template>
  <div class="QRCode">
    <el-dialog
      title="二维码扫描"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="200px"
      top="20vh"
      center
      :show-close="false"
      :modal="true"
      custom-class="QRcodeDialogDialog"
      :append-to-body="true"
    >
      <div class="tf-qrcode-group">
        <tf-qrcode
          :text="text"
        />
      </div>
    </el-dialog>
    <div class="main_slot" @click="clickhandler">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    beforeClose(done) {
      done()
    },

    clickhandler() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.QRCode {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>
<style lang="less">
.QRcodeDialogDialog {
  .tf-qrcode-group {
    text-align: center;
    min-height: 135px;
  }
}
</style>
