<template>
  <section class="resetSucceed">
    {{ title }}， 剩余 {{ time }} 秒
  </section>
</template>
<script>
export default {
  props: {
    timeCount: {
      default: 3,
      type: Number
    },
    title: {
      default: '操作成功',
      type: String
    }
  },
  data() {
    return {
      time: 0,
      timeId: null
    }
  },
  mounted() {
    this.goToHome(this.timeCount)
  },
  destroyed() {
    window.clearInterval(this.timeId)
  },
  beforeDestroy() {
    window.clearInterval(this.timeId)
  },
  methods: {
    // n 秒后跳转
    goToHome(time) {
      if (this.time > 0) return
      this.time = time
      this.timeId = setInterval(() => {
        if (--this.time === 0) {
          this.timerEnd()
        }
      }, 1000)
    },
    timerEnd() {
      window.clearInterval(this.timeId)
      this.$emit('timeEnd')
    }
  }
}
</script>
<style lang="less" scoped>
.resetSucceed {
  height: 300px;
  line-height: 300px;
  color: #303133;
  text-align: center;
}
</style>
