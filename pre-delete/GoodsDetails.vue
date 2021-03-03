<template>
  <div class="GoodsDetails">
    <HomeHeader
      v-bind="{
        logInState,
        userName
      }" />
    <HomeSearchSection
      :width="width"
      class="HomeSearchSection" />
    <!-- <section class="goodDetails">
      {{goodDetails}}
    </section> -->
    <div class="pic-box">
      <!--pic-box:width:500px;height:500px-->
      <div class="left_body">
        <pic-zoom
          ref="picbox"
          :url="picUrl"
          :big-url="picUrl"
          :style="picZoomSize"
          :border="'2px solid #eeeeee'"
          :scale="3"
          scroll />
        <!-- col 一行几个 -->
        <!-- width 自己宽度 -->
        <section class="pic-thumb-section">
          <pic-thumb
            :col="4"
            :width="460"
            :button-width="16"
            :button-margin="5"
            :item-width="85"
            :items="thumbImgSrcArray">
            <template v-slot:default="{item}">
              <div
                class="thumb_img"
                @mouseenter="choseItem(item)">
                <!-- <span>
                  {{item}}
                </span> -->
                <img
                  :src="item.src"
                  alt=""
                  srcset="">
                <!-- img -->
              </div>
            </template>
          </pic-thumb>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    // 商品 id
    id: {
      type: [String, Number]
    }
  },

  metaInfo() {
    return {
      title: '商品详情',
      titleTemplate: `%s_${this.id}`,
      meta: [
        {
          name: 'keyWords',
          content: '商品详情'
        }
      ]
    }
  },

  data() {
    return {
      text: 'xaxxxs',
      picZoomSize: {
        width: '460px',
        height: '460px'
      },
      picUrl: '/image/img0.jpg',
      bigPicUrl: '/image/img0.jpg',
      thumbImgSrcArray: new Array(9)
        .fill(null)
        .map((v, i) => ({ src: `/image/img${i}.jpg` }))
    }
  },
  watch: {
    querySearch: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.getGoodDetailMethods(this.querySearch)
      },
      immediate: true
    }
  },
  computed: {
    querySearch() {
      return {
        gid: this.id
      }
    },
    ...mapState('userModule', ['logInState', 'userName']),
    ...mapState('goodsModule', ['goodDetails'])
  },
  methods: {
    choseItem({ src }) {
      this.picUrl = src
      this.bigPicUrl = src
    },
    ...mapActions('goodsModule', ['getGoodDetail']),
    async getGoodDetailMethods(...args) {
      await this.getGoodDetail(...args)
      setTimeout(() => {
        this.$refs && this.$refs.picbox && this.$refs.picbox.resetCanvas()
      }, 200)
    }
  }
}
</script>
<style lang="less" scoped>
@imaSize: 85px;
.GoodsDetails {
  position: relative;
  .goodDetails {
    .wf();
    word-break: break-all;
  }
  .pic-box {
    .wf();
    display: flex;
    .left_body {
      width: 460px;
      .pic-thumb-section {
        padding-top: 20px;
      }
    }
    // border: 1px solid #eeeeee;
  }
}
.thumb_img {
  height: 85px;
  background-color: #ff6400;
  img {
    display: block;
    width: @imaSize;
    height: @imaSize;
  }
}
</style>
