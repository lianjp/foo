
<template>
  <div class="magnifier-section">
    <div
      :ref="id"
      class="magnifier-box"
      :style="{
        border
      }"
      :class="vertical?'vertical':''"
      :data-ref-cavasid="id"
      @mousemove="mousemove"
      @mouseover="mouseover"
      @mouseleave="mouseleave">
      <img
        v-show="showImg"
        :src="imgUrl"
        alt="magnifier-img">
      <div class="mouse-cover" />
      <div
        v-if="showEidt"
        class="edit-wrap">
        <span
          class="rotate-left"
          @click="rotate('left')" />
        <span
          class="rotate-right"
          @click="rotate('right')" />
      </div>
    </div>
    <div
      ref="canvasSection"
      class="canvas" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
export default {
  name: 'PicZoom',
  props: {
    border: {
      type: String,
      default: ''
    },
    scale: {
      type: Number,
      default: 2.5
    },
    url: {
      type: String,
      required: true
    },
    bigUrl: {
      type: String,
      default: null
    },
    scroll: {
      type: Boolean,
      default: false
    },
    showEidt: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null,
      cover: null,
      imgbox: null,
      imgwrap: null,
      orginUrl: null,
      bigImgUrl: null,
      bigOrginUrl: null,
      imgUrl: null,
      img: null,
      canvas: null,
      ctx: null,
      rectTimesX: 0,
      rectTimesY: 0,
      imgTimesX: 0,
      imgTimesY: 0,
      init: false,
      step: 0,
      bigStep: 0,
      vertical: false,
      showImg: true
    }
  },
  watch: {
    url: function(val) {
      this.imgUrl = val
      this.orginUrl = val
      this.initTime()
    },
    bigUrl: function() {
      this.bigImgUrl = this.bigUrl
      this.bigOrginUrl = this.bigUrl
      this.initTime()
    }
  },
  created() {
    const $chars =
      'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < 10; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    this.id = str
    this.imgUrl = this.url
    this.orginUrl = this.url
    this.bigImgUrl = this.bigUrl
    this.bigOrginUrl = this.bigUrl
  },
  beforeDestroy() {
    // 卸载之前
    this.canavas = this.canvas || document.getElementById('canvas_' + this.id)
    if (this.canvas) {
      this.canvas.parentNode.removeChild(this.canvas)
      this.canvas = null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initTime()
    })
  },
  methods: {
    resetCanvas() {
      // 重设 canvas 位置和大小
      // this.canvas.style.left = this.imgbox.offsetLeft + this.imgbox.offsetWidth + 10 + 'px'
      this.canvas.style.left = this.imgbox.offsetWidth + 10 + 'px'
      // this.canvas.style.top = this.imgbox.offsetTop + 'px'
      this.canvas.style.top = '0px'
      this.canvas.height = this.imgbox.offsetHeight
      this.canvas.width = this.imgbox.offsetWidth
    },
    initTime() {
      this.init = false
      const box = this.$refs[this.id]
      this.imgbox = box
      this.cover = box.querySelector('.mouse-cover')
      this.cover.style.width = this.imgbox.offsetWidth / this.scale + 'px'
      this.cover.style.height = this.imgbox.offsetHeight / this.scale + 'px'
      this.cover.style.left = '-100%'
      this.cover.style.top = '-100%'
      this.imgwrap = box.querySelector('img')
      let imgsrc
      if (this.bigImgUrl) {
        imgsrc = this.bigImgUrl
      } else {
        imgsrc = this.imgUrl
      }

      this.img = new Image()
      this.img.src = imgsrc
      this.img.onload = () => {
        this.rectTimesX =
          this.imgbox.offsetWidth / this.scale / this.imgwrap.offsetWidth
        this.rectTimesY =
          this.imgbox.offsetHeight / this.scale / this.imgwrap.offsetHeight
        this.imgTimesX = this.img.width / this.imgwrap.offsetWidth
        this.imgTimesY = this.img.height / this.imgwrap.offsetHeight
        this.vertical = this.img.width < this.img.height
        this.init = true
      }

      this.canavas = this.canvas || document.getElementById('canvas_' + this.id)
      if (this.canvas) {
        this.canvas.parentNode.removeChild(this.canvas)
        this.canvas = null
      }

      this.canvas = document.createElement('canvas')
      this.canvas.id = 'canvas_' + this.id
      this.canvas.className = 'mouse-cover-canvas'
      this.canvas.style.position = 'absolute'
      // this.canvas.style.left = this.imgbox.offsetLeft + this.imgbox.offsetWidth + 10 + 'px'
      this.canvas.style.left = this.imgbox.offsetWidth + 10 + 'px'
      // this.canvas.style.top = this.imgbox.offsetTop + 'px'
      this.canvas.style.top = '0px'
      // this.canvas.style.border = '1px solid #eee'
      this.canvas.style.zIndex = '99999'
      this.canvas.height = this.imgbox.offsetHeight
      this.canvas.width = this.imgbox.offsetWidth
      this.canvas.style.display = 'none'
      // 不再加入到 body
      this.$refs.canvasSection.append(this.canvas)
      // document.body.append(this.canvas)
      this.ctx = this.canvas.getContext('2d')
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    initBox() {
      this.showImg = false
      this.canvas.style.display = 'none'
      const box = this.$refs[this.id]
      let imgsrc
      if (this.bigImgUrl) {
        imgsrc = this.bigImgUrl
      } else {
        imgsrc = this.imgUrl
      }
      this.img = new Image()
      this.img.src = imgsrc
      this.img.onload = () => {
        this.vertical = this.img.width < this.img.height
        this.showImg = true
        // let thumb = box.querySelector('img')
        setTimeout(() => {
          this.rectTimesX =
            this.imgbox.offsetWidth /
            this.scale /
            box.querySelector('img').offsetWidth
          this.rectTimesY =
            this.imgbox.offsetHeight /
            this.scale /
            box.querySelector('img').offsetHeight
        }, 20)
      }
    },
    mousemove(e) {
      if (!this.init) {
        return false
      }
      const _this = this
      // 获取实际的offset
      function offset(curEle) {
        let totalLeft = null
        let totalTop = null
        let par = curEle.offsetParent
        // 首先加自己本身的左偏移和上偏移
        totalLeft += curEle.offsetLeft
        totalTop += curEle.offsetTop
        // 只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
        while (par) {
          if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
            // 累加父级参照物的边框
            totalLeft += par.clientLeft
            totalTop += par.clientTop
          }

          // 累加父级参照物本身的偏移
          totalLeft += par.offsetLeft
          totalTop += par.offsetTop
          par = par.offsetParent
        }

        return {
          left: totalLeft,
          top: totalTop
        }
      }

      function getXY(eve) {
        return {
          x: eve.clientX - _this.cover.offsetWidth / 2,
          y: eve.clientY - _this.cover.offsetHeight / 2
        }
      }
      const oEvent = e || event
      const pos = getXY(oEvent)
      const imgwrap = offset(this.imgwrap)
      const range = {
        minX: imgwrap.left,
        maxX: imgwrap.left + this.imgwrap.offsetWidth - this.cover.offsetWidth,
        minY: imgwrap.top - document.documentElement.scrollTop,
        maxY:
          imgwrap.top -
          document.documentElement.scrollTop +
          this.imgwrap.offsetHeight -
          this.cover.offsetHeight
      }
      if (pos.x > range.maxX) {
        pos.x = range.maxX
      }
      if (pos.x < range.minX) {
        pos.x = range.minX
      }
      if (pos.y > range.maxY) {
        pos.y = range.maxY
      }
      if (pos.y < range.minY) {
        pos.y = range.minY
      }
      this.cover.style.left = pos.x + 'px'
      this.cover.style.top = pos.y + 'px'
      this.ctx.clearRect(
        0,
        0,
        this.imgwrap.offsetWidth,
        this.imgwrap.offsetHeight
      )
      const startX =
        pos.x - (imgwrap.left - document.documentElement.scrollLeft)
      const startY = pos.y - (imgwrap.top - document.documentElement.scrollTop)
      this.ctx.drawImage(
        this.img,
        startX * this.imgTimesX,
        startY * this.imgTimesY,
        this.img.width * this.rectTimesX,
        this.img.height * this.rectTimesY,
        0,
        0,
        this.imgbox.offsetWidth,
        this.imgbox.offsetHeight
      )
    },
    mouseover(e) {
      if (!this.init) {
        return false
      }
      e = e || event
      if (!this.scroll) {
        e.currentTarget.addEventListener(
          'mousewheel',
          function(ev) {
            ev.preventDefault()
          },
          false
        )

        e.currentTarget.addEventListener(
          'DOMMouseScroll',
          function(ev) {
            ev.preventDefault()
          },
          false
        )
      }

      this.cover.style.display = 'block'
      this.canvas.style.display = 'block'
    },
    mouseleave() {
      if (!this.init) {
        return false
      }
      this.cover.style.display = 'none'
      this.canvas.style.display = 'none'
    },
    rotate(direction) {
      const orginImg = new Image()
      orginImg.crossOrigin = 'Anonymous'
      orginImg.src = this.orginUrl
      orginImg.onload = () => {
        this.rotateImg(orginImg, direction, this.step)
      }
      if (this.bigOrginUrl) {
        const bigOrginImg = new Image()
        orginImg.crossOrigin = 'Anonymous'
        bigOrginImg.src = this.bigOrginUrl
        bigOrginImg.onload = () => {
          this.rotateImg(bigOrginImg, direction, this.bigStep, true)
        }
      }
    },
    rotateImg(img, direction, step, isBig = false) {
      const min_step = 0
      const max_step = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      const height = img.height
      const width = img.width

      if (step == null) {
        step = min_step
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      const canvas = document.createElement('canvas')

      // 旋转角度以弧度值为参数
      const degree = (step * 90 * Math.PI) / 180
      const ctx = canvas.getContext('2d')
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
      const newImg = canvas.toDataURL()

      if (isBig) {
        this.bigImgUrl = newImg
        this.bigStep = step
        this.initBox()
      } else {
        this.imgUrl = newImg
        this.step = step
        this.$nextTick(() => {
          this.initBox()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.magnifier-section {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.magnifier-box {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  .edit-wrap {
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.4);
    padding: 5px 15px 0 15px;
    border-radius: 15px;
    .rotate-left {
      display: inline-block;
      cursor: pointer;
      width: 16px;
      height: 16px;
      background: url('./rotate.png');
      background-size: 100% 100%;
      -moz-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      transform: scaleX(-1);
      /*IE*/
      filter: FlipH;
    }
    .rotate-right {
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('./rotate.png');
      background-size: 100% 100%;
    }
  }
  img {
    width: 100%;
  }
  .mouse-cover {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: move;
  }
  .mouse-cover-canvas {
    position: fixed;
    left: 100%;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &.vertical {
    img {
      height: 100%;
      width: auto;
    }
  }
}
.canvas {
  top: 0;
  // left: 500px;
  position: absolute;
}
</style>
