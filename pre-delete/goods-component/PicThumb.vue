<template>
  <div
    class="PicThumb"
    :style="{
      width: `${width}px`
    }">
    <button
      class="thumb-btn thumb-left"
      :style="{
        width: `${buttonWidth}px`,
        marginRight: `${buttonMargin}px`
      }"
      @click="prePage">
      <i class="el-icon-caret-left" />
    </button>
    <div
      class="thumb_slider"
      :style="{
        width: `${thumbSliderWidth}px`
      }">
      <ol
        :style="{
          width: `${olWidth}px`,
          marginLeft: `${olOffsetWidth}px`
        }">
        <PicThumbItem
          v-for="(item, index) in items "
          :key="index"
          class="PicThumbItem"
          :width="itemWidth"
          :item-gap="itemGap">
          <!-- 需要往下传 slot 时候，尽量写 v-slot:default，具名和具名都可以。如果不写，没法接收参数 -->
          <template v-slot:default="{itemGap}">
            <slot
              :itemGap="itemGap"
              :item="item" />
          </template>
        </PicThumbItem>
      </ol>
    </div>
    <button
      class="thumb-btn thumb-right"
      :style="{
        width: `${buttonWidth}px`,
        marginLeft: `${buttonMargin}px`
      }"
      @click="nextPage">
      <i class="el-icon-caret-right" />
    </button>
  </div>
</template>
<script>
export default {
  props: {
    col: {
      // 一行显示几个
      type: Number,
      default: 4
    },
    width: {
      // 组件宽度
      type: Number,
      default: 400
    },
    buttonMargin: {
      // 按钮和主体内容的间隔
      type: Number,
      default: 2
    },
    itemWidth: {
      // 项的宽度
      type: Number,
      default: 85
    },
    items: {
      type: Array
    },
    buttonWidth: {
      // 按钮的宽度
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      olPaddingLeft: 0,
      xCount: 0
    }
  },
  computed: {
    thumbSliderWidth() {
      const width = this.width
      const buttonWidth = this.buttonWidth
      const buttonMargin = this.buttonMargin
      return width - (buttonWidth + buttonMargin) * 2
    },
    // 项的个数
    itemLength() {
      return this.items.length
    },
    // 滑动区域 左侧滑动长度
    olOffsetWidth() {
      const xCount = this.xCount
      const itemGap = this.itemGap
      const itemWidth = this.itemWidth
      return xCount * (itemGap + itemWidth)
    },
    // 滑动区域，内部长度
    olWidth() {
      const itemLength = this.itemLength
      const itemGap = this.itemGap
      const itemWidth = this.itemWidth
      return itemLength * (itemGap + itemWidth)
    },
    // item 的间隔
    itemGap() {
      // 每个元素间隔
      const width = this.width
      const itemWidth = this.itemWidth
      const col = this.col
      const buttonWidth = this.buttonWidth
      const buttonMargin = this.buttonMargin
      // width + gap = col * (itemWidth + gap)
      const gap =
        (width - (buttonWidth + buttonMargin) * 2 - col * itemWidth) / (col - 1)
      return gap
    }
  },
  methods: {
    // 翻一页
    prePage() {
      const xCount = this.xCount
      if (xCount < 0) {
        this.xCount++
      }
    },
    nextPage() {
      const xCount = this.xCount
      const col = this.col
      const itemLength = this.itemLength
      if (xCount > col - itemLength) {
        this.xCount--
      }
    }
  }
}
</script>
<style lang="less" scoped>
.PicThumb {
  display: flex;
  user-select: none;
  align-items: stretch;
  .thumb-btn {
    display: flex;
    border: none;
    padding: 0;
    flex: 0 0 auto;
    justify-content: space-around;
    align-items: center;
    transition: background-color linear 0.3s, opacity linear 0.2s;
    opacity: 0.5;
    background-color: rgba(126, 126, 126, 0.329);
    &:hover {
      opacity: 1;
      background-color: rgba(126, 126, 126, 0.678);
    }
  }
  .thumb-left {
  }
  .thumb-right {
  }
  .thumb_slider {
    overflow: hidden;
  }
  ol {
    overflow: hidden;
    display: flex;
    transition: all ease-in-out 0.21s;
    .PicThumbItem {
      flex: 0 0 auto;
    }
  }
}
</style>
