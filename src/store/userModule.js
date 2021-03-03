import login from '@/api/user-module/login'
import verifyCode from '@/api/user-module/verifyCode'
import register from '@/api/user-module/register'
import autoLogIn from '@/api/user-module/autoLogIn'
import logOut from '@/api/user-module/logOut'
import applyBecomeSupplier from '@/api/user-module/applyBecomeSupplier'

// 检查是否绑定了微信 ( 数据不保存，只有 true false )
import sureBindingWx from '@/api/user-module/sureBindingWx'

// 找回密码第一步
import checkUserMobile from '@/api/user-module/checkUserMobile'
// 找回密码第二步
import resetPasswd from '@/api/user-module/resetPasswd'

// 更改用户信息
import updateUserInfo from '@/api/user-module/updateUserInfo'

import { isSuccessful } from '../code-status-type'

import Cookies from 'js-cookie'
import userStateTypeMap from '@/type/userStateTypeMap.js'

export default {
  namespaced: true,
  state: {
    logInState: false,
    userName: '',
    // 申请成为分销商的进度
    rsstate: '',
    mobile: '',
    userId: '',
    merchreg: {}
  },
  mutations: {
    removeUserInfo(state) {
      state.logInState = false
      state.userName = ''
      state.mobile = ''
      state.userId = ''
    },
    saveUserInfo(
      state,
      {
        logInState,
        merchaccount: {
          mobile,
          id: userId,
          username: userName,
          state: rsstate
        },
        merchreg
      }
    ) {
      state.logInState = logInState
      state.userName = userName
      state.mobile = mobile
      state.userId = userId
      state.rsstate = rsstate
      state.merchreg = {
        ...merchreg
      }
    }
  },
  actions: {
    /**
     * resetPasswd
     */
    async resetPasswd(context, formData) {
      const {
        data: { code, message, data }
      } = await resetPasswd(formData)
      return {
        code,
        message,
        data
      }
    },
    /**
     * @param {*} context
     * @param {formData} formData 表单数据
     */
    async applyBecomeSupplier(context, formData) {
      const {
        data: { code, message, data }
      } = await applyBecomeSupplier(formData)
      return {
        code,
        message,
        data
      }
    },
    /**
     ** 登录
     */
    async logIn(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await login(payload)
      console.log(code, message, data)
      if (isSuccessful(code)) {
        commit('saveUserInfo', {
          ...data,
          logInState: true
        })
        Cookies.set('PHPSESSID_logIn_shop', '1', { expires: 365, path: '/' })
      } else {
        Cookies.set('PHPSESSID_logIn_shop', '0', { expires: 365, path: '/' })
      }
      return {
        code,
        message,
        data
      }
    },
    /**
     * * 自动登录的接口，用来从 cookie 获取 用户信息，刷新（重新获取）用户信息等
     */
    async autoLogin(context) {
      const PHPSESSIDLogInShop = Cookies.get('PHPSESSID_logIn_shop')
      if (parseInt(PHPSESSIDLogInShop) === 0) {
        return
      }
      const { commit } = context
      const {
        data: { code, message, data }
      } = await autoLogIn()

      if (isSuccessful(code)) {
        commit('saveUserInfo', {
          ...data,
          logInState: true
        })
      } else {
        Cookies.set('PHPSESSID_logIn_shop', '0', { expires: 365, path: '/' })
      }
      return {
        code,
        message,
        data
      }
    },
    /**
     * * nowOperation 注册 smsRegister 忘记密码 smsForget 登录 smsLogin
     * * 注册发送验证码
     */
    async verifyCode(context, { mobile, nowOperation }) {
      // const { commit } = context
      const {
        data: { code, message }
      } = await verifyCode({ mobile, nowOperation })
      return {
        code,
        message
      }
    },
    async checkUserMobile(context, formData) {
      const {
        data: { code, message }
      } = await checkUserMobile(formData)
      return { code, message }
    },
    /**
     ** 注册的一次性发送表单数据
     */
    async register(context, formData) {
      const {
        data: { code, message }
      } = await register(formData)
      return {
        code,
        message
      }
    },
    /**
     ** 退出登录
     */
    async logOut(context) {
      const { commit } = context
      const {
        data: { code, message }
      } = await logOut()

      if (isSuccessful(status)) {
        commit('removeUserInfo')
        Cookies.set('PHPSESSID_logIn_shop', '0', { expires: 365, path: '/' })
      }
      return {
        code,
        message
      }
    },
    /**
     * 更改用户信息 updateUserInfo
     */
    async updateUserInfo(context, payload) {
      const { dispatch } = context
      const {
        data: { code, message }
      } = await updateUserInfo(payload)
      if (isSuccessful(code)) {
        dispatch('autoLogin')
      }
      return { code, message }
    },
    /**
     * 确认是否绑定微信公众号
     */
    async sureBindingWx(context, payload) {
      // const { dispatch } = context
      const {
        data: { code, message }
      } = await sureBindingWx(payload)
      return { code, message }
    }
  },
  getters: {
    registerSupplierState(state) {
      return userStateTypeMap[state.rsstate]
    }
  }
}
