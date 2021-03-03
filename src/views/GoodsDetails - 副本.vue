<template>
  <div class="GoodsDetails">
    <HomeHeader
      v-bind="{
        logInState,
        userName
      }"
    />
    <HomeSearchSection
      :width="width"
      class="HomeSearchSection"
    />
    <section class="goodDetails">
      {{ goodDetails }}
      <VClamp
        :max-lines="3"
        autoresize
      >
        {{ text.repeat(1001) }}
        <el-button
          v-if="expanded || clamped"
          slot="after"
          slot-scope="{ toggle, expanded, clamped }"
          :style="{
            padding: 0
          }"
          class="toggle btn btn-sm"
          type="text"
          size="mini"
          @click="toggle"
        >
          {{ expanded?'【收起】':'【展开】' }}
        </el-button>
      </VClamp>
    </section>
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
      text: 'xaxs'
    }
  },
  watch: {
    querySearch: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.getGoodDetail(this.querySearch)
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
    ...mapState('baseData', {
      imgSrcArray: 'indexSliderImgSrcArray'
    }),
    ...mapState('userModule', ['logInState', 'userName']),
    ...mapState('goodsModule', ['goodDetails'])
  },
  methods: {
    ...mapActions('goodsModule', ['getGoodDetail'])
  }
}
</script>
<style lang="less" scoped>
.goodDetails {
  .wf();
  word-break: break-all;
}
</style>
