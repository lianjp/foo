<template>
  <div class="home">
    <HomeHeader
      v-bind="{
        userName
      }" />
    <div class="main body">
      <h2 class="welcome">
        欢迎使用
      </h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {
    ...mapState('userModule', ['userName'])
  },
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.home {
  .welcome {
    margin: 20px;
  }
}
</style>
