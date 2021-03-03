import Vue from 'vue'
// function capitalizeFirstLetter (string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

const requireComponent = require.context(
  '.',
  true,
  /\.vue$/
  // 找到components文件夹下以.vue命名的文件，深度搜索
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  // if (fileName.match(/component\//gim)) {
  //   return
  // }

  // 得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  const componentName = fileName.match(/\/([^/\\]+)\.vue$/)[1]
  // debugger
  // console.log('已预加载组件：', componentName)
  Vue.component(componentName, componentConfig.default || componentConfig)
})
