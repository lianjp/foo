// import Cookies from 'js-cookie'
import { Notification } from 'element-ui'
import store from '../store/index'
const once = require('lodash/once')
// const needLogPageName = ['ShoppingCart']

// 新版本提示
const remind = once(() => {
  window.email = `admin.tianfanfan.com`
  let time = window.localStorage.getItem('remindTile')
  if (time > 2) return
  window.localStorage.setItem('remindTile', ++time)
  Notification({
    title: '新版本提示',
    dangerouslyUseHTMLString: true,
    message: `
    <ol>
      <li>
        <strong>
          版本正在开发，有新提议请联系：
        </strong>
      </li>
      <li>
        <strong style="color: #ff6600;">
          email: <i> admin@tianfanfan.com </i>
        </strong>
      </li>
      <li>
        <strong >
          <i style="color: #ff6600;"> ctrl </i> + <i style="color: #ff6600;"> 鼠标滚轮 </i>可放大缩小
        </strong>
      </li>
      <li>
        <strong>
          忘记请按 <span style="color: #ff6600;">F12</span> ，输入<span style="color: #ff6600;"> email </span>
        </strong>
      </li>
    </ol>
    `,
    type: 'success',
    showClose: true,
    duration: 0
  })
})

const newVersionRemind = (to, from, next) => {
  remind()
  next()
}

const logRouterName = (to, from, next) => {
  next()
}

// 验证登录权限
const verifyLogIn = async (to, from, next) => {
  // 需要登录才可以进的页面
  if (to.meta && to.meta.auth && to.meta.auth.includes('needLogIn')) {
    // 登录状态是 false
    if (store.getters.logInState === false) {
      await store.dispatch('userModule/autoLogin', {})
    }
    // 登录状态是 true
    if (store.getters.logInState === true) {
      return next()
    } else {
      return next({ name: 'login' })
    }
  } else {
    // 不需要登录的页面，不等待自动登录
    if (store.getters.logInState === false) {
      store.dispatch('userModule/autoLogin', {})
    }
    return next()
  }
}

// 验证会员权限，是否加入了供应商
const verifyRegistedSupplier = async (to, from, next) => {
  // 如果需要加入了供应商权限
  if (
    to.meta &&
    to.meta.auth &&
    to.meta.auth.includes('needRegistedSupplier')
  ) {
    // 如果当前未登录
    if (store.getters.logInState === false) {
      await store.dispatch('userModule/autoLogin', {})
    }
    // 获取登录状态
    if (store.getters.logInState === false) {
      return next({ name: 'login' })
    }
    // 登录了，获取供应商状态
    if (store.getters.registedSupplierSuccessState === true) {
      return next()
    }
    // 登录了，获取供应商状态是否
    if (store.getters.registedSupplierSuccessState === false) {
      return next({ name: 'RegisterSupplierPage' })
    }
  } else {
    return next()
  }
}
export default [
  // newVersionRemind,
  logRouterName,
  verifyLogIn,
  verifyRegistedSupplier
]
