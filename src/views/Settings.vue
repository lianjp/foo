<template>
  <div class="Setting">
    <HomeHeader
      v-bind="{
        userName
      }" />
    <section class="w-full body">
      <el-tabs
        v-model="localActivePageName"
        class="tabs">
        <!-- type="card" -->
        <!-- @tab-click="handleClick" -->
        <el-tab-pane label="退货地址管理" name="BackFreightAdress" />
        <el-tab-pane label="仓库管理" name="Warehouse" />
        <el-tab-pane label="配送方式" name="WayOfExpressage" />
        <el-tab-pane label="基本信息" name="BaseInformation" />
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
      default: 'BaseInformation'
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
.Setting {
  .w-full {
    .wf();
  }
  .tabs {
  }
}
</style>
