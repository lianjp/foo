<template>
  <div id="app">
    <!-- <transition name="el-fade-in" mode="out-in"> -->
    <router-view class="router-view" />
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '海销供应商后台',
    // titleTemplate: '海销供应商后台 - %s',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      {
        name: 'keyWords',
        content: '海销供应商后台'
      }
    ]
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .router-view {
    .body {
      margin: auto;
      min-width: 1200px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1366px) {
      .body {
        width: 98%;
        margin: auto;
      }
    }

    @media only screen and (min-width: 1366px) and (max-width: 1600px) {
      .body {
        width: 95%;
      }
    }
    @media only screen and (min-width: 1600px) and (max-width: 1920px) {
      .body {
        width: 85%;
      }
    }
    @media only screen and (min-width: 1920px) {
      .body {
        width: 70%;
      }
    }
  }
}
</style>
