// 退货地址模块 backFreightAdress
import getBackAdress from '@/api/back-freight-adress-module/getBackAdress'
import deleteBackAdress from '@/api/back-freight-adress-module/deleteBackAdress'
import addBackAdress from '@/api/back-freight-adress-module/addBackAdress'
import editBackAdress from '@/api/back-freight-adress-module/editBackAdress'
import getDetailById from '@/api/back-freight-adress-module/getDetailById'

// import localforage from '@/utils/localforageStore'
import { isSuccessful } from '@/code-status-type'
const get = require('lodash/get')
export default {
  namespaced: true,
  state: {
    backAdressList: [],
    backAdressTotal: 0,
    // 商品详情
    goodDetails: {}
  },
  mutations: {
    saveBackAdress(state, data) {
      state.backAdressTotal = get(data, 'total', 0)
      state.backAdressList = get(data, 'list', [])
    }
  },
  actions: {
    // 获取详情
    async getDetailById(context, payload) {
      const {
        data: { code, message, data }
      } = await getDetailById(payload)
      return { message, code, data }
    },
    async getBackAdressList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getBackAdress(payload)
      if (isSuccessful(code)) {
        commit('saveBackAdress', data)
      }
      return { code, message }
    },
    // 添加新退货地址
    async addBackAdress(context, payload) {
      const {
        data: { code, message, data }
      } = await addBackAdress(payload)
      return { code, message, data }
    },
    // 编辑退货地址品牌
    async editBackAdress(context, payload) {
      const {
        data: { code, message, data }
      } = await editBackAdress(payload)
      return { code, message, data }
    },

    // // 撤销
    // async revokeTrademark(context, payload) {
    //   const {
    //     data: { code, message, data }
    //   } = await revokeTrademark(payload)
    //   return { code, message, data }
    // },
    // // 删除
    async deleteBackAdress(context, payload) {
      const {
        data: { code, message, data }
      } = await deleteBackAdress(payload)
      return { code, message, data }
    }
    // // 获取品牌详情
    // async getTrademarkDetail(context, payload) {
    //   const {
    //     data: { code, message, data }
    //   } = await getTrademarkDetail(payload)
    //   return { code, message, data }
    // }
  }
}
