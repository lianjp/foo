// 分销模块 distributorModule
import getPromotersMyList from '@/api/distributor-module/getPromotersMyList'
import getPromotesDetailsById from '@/api/distributor-module/getPromotesDetailsById'

import checkPromote from '@/api/distributor-module/checkPromote'

import getTraderList from '@/api/distributor-module/getTraderList'

// 获取分销商详情
import getTraderDetailsById from '@/api/distributor-module/getTraderDetailsById'
// 修改分销商状态
import updateTrader from '@/api/distributor-module/updateTrader'

import { isSuccessful } from '@/code-status-type'

export default {
  namespaced: true,
  state: {
    promotersList: [],
    promotersTotal: 0,
    traderList: [],
    traderTotal: 0
  },
  mutations: {
    savePromotersMyList(state, { list, total }) {
      state.promotersList = list
      state.promotersTotal = total
    },
    saveTraderList(state, { list, total }) {
      state.traderList = list
      state.traderTotal = total
    }
  },
  actions: {
    async getPromotersMyList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getPromotersMyList(payload)
      if (isSuccessful(code)) {
        commit('savePromotersMyList', data)
      }
      return {
        code,
        message
      }
    },
    // 获取需要审核的商品
    async getPromotesDetailsById(context, payload) {
      const {
        data: { code, message, data }
      } = await getPromotesDetailsById(payload)
      return {
        code,
        data,
        message
      }
    },
    // 审核 推广员
    async checkPromote(context, payload) {
      const {
        data: { code, message, data }
      } = await checkPromote(payload)
      return {
        code,
        data,
        message
      }
    },
    // 获取分销商列表
    async getTraderList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getTraderList(payload)
      if (isSuccessful(code)) {
        commit('saveTraderList', data)
      }
      return {
        code,
        data,
        message
      }
    },
    // 分销商详情
    async getTraderDetailsById(context, payload) {
      const {
        data: { code, message, data }
      } = await getTraderDetailsById(payload)
      return {
        code,
        data,
        message
      }
    },
    // 修改分销商状态
    async updateTrader(context, payload) {
      const {
        data: { code, message, data }
      } = await updateTrader(payload)
      return {
        code,
        data,
        message
      }
    }
  },
  getters: {}
}
