<template>
  <div class="tf-qrcode">
    <canvas ref="qrcodeCanvas" class="qrcode-canvas" />
  </div>
</template>
<script>
const QRCode = require('qrcode')

export default {
  props: {
    text: {
      type: String,
      default: 'https://tianfanfan.com'
    }
  },
  data() {
    return {
      QRCode: null
    }
  },
  mounted() {
    this.initQrCode()
  },
  methods: {
    initQrCode() {
      const canvasDom = this.$refs.qrcodeCanvas
      this.QRCode = QRCode.toCanvas(
        canvasDom,
        this.text || 'http://www.baidu.com',
        {
          width: 130,
          height: 130,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: 'H'
        },
        (err, canvas) => {
          if (err) {
            console.error(canvas)
          }
        }
      )
    }
  }
}
</script>
<style lang="less">
.tf-qrcode {
  display: inline-block;
}
</style>
