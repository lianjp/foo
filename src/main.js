import Vue from 'vue'

import '../public/reset.css'
import './assets/css/global.less'

import '@/components/all-component'

import '@/assets/font-icon/iconfont.css'

import '../theme/index.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VClamp from 'vue-clamp'
// import PicZoom from './components/simple-components/'

import routerQueryPlugin from 'vue-router-query-merge'
import Meta from 'vue-meta'
import jump from 'jump.js'
import VueQuillEditor from 'vue-quill-editor'
import hljs from 'highlight.js'
import router from './router'
import store from './store'
import App from './App.vue'

import nameFilter from './filter/nameFilter'
import { isSuccessful, isError } from './code-status-type'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from '@/service'
window.axios = axios
Vue.use(VueQuillEditor, {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      // [{ size: ['小号', false, '大号', '超大号'] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video']
    ],
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    }
  },
  placeholder: '请在这里输入......'
})
const moment = require('moment')

require('moment/min/locales.min')

moment.locale('zh-cn')

Vue.mixin({
  computed: {
    tt() {
      return (timeStamp) => {
        return moment
          .unix(timeStamp)
          .utc()
          .format('YYYY-MM-DD hh:mm:ss')
      }
    }
  }
})

Vue.prototype.isSuccessful = isSuccessful
Vue.prototype.isError = isError
Vue.prototype.jump = jump

Vue.use(nameFilter)

Vue.use(routerQueryPlugin)

Vue.use(Meta)

Vue.use(ElementUI)

// 注册，clamp 组件
Vue.component('VClamp', VClamp)

// 注册 picture-zoom 组件
// Vue.component('PicZoom', PicZoom)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
