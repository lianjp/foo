<template>
  <div class="Distributor">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <section class="w-full body">
      <el-tabs v-model="localActivePageName" class="tabs">
        <!-- type="card" -->
        <!-- @tab-click="handleClick" -->
        <el-tab-pane label="分销商" name="Distributor" />
        <el-tab-pane label="专属商品推广" name="Promotion" />
      </el-tabs>
    </section>
    <section class="w-full body">
      <router-view />
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    activedPageName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    localActivePageName: {
      set(val) {
        this.$router.push({ name: val })
      },
      get() {
        return this.activedPageName
      }
    },
    ...mapState('userModule', ['userName'])
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // }
  }
}
</script>
<style lang="less" scoped>
.Distributor {
  .w-full {
    .wf();
  }
  .tabs {
  }
}
</style>
