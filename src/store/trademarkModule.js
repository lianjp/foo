// 品牌模块 trademarkModule
import getTrademarkList from '@/api/trademark/getTrademarkList'
import addNewTrademark from '@/api/trademark/addNewTrademark'
import editNewTrademark from '@/api/trademark/editNewTrademark'
import revokeTrademark from '@/api/trademark/revokeTrademark'
import deleteTrademark from '@/api/trademark/deleteTrademark'
import getTrademarkDetail from '@/api/trademark/getTrademarkDetail'
import getTrademarkSummary from '@/api/trademark/getTrademarkSummary'

// import localforage from '@/utils/localforageStore'
import { isSuccessful } from '@/code-status-type'
const get = require('lodash/get')
export default {
  namespaced: true,
  state: {
    trademarkList: [],
    trademarkTotal: 0,
    // 商品详情
    goodDetails: {},
    // 品牌汇总
    summaryData: {
      allBrand: 0 /* 全部 */,
      auditing: 0 /* 待审核 */,
      audited: 0 /* 审核通过 */,
      refuse: 0 /* 审核拒绝 */
    }
  },
  mutations: {
    saveTrademarkList(state, data) {
      state.trademarkTotal = get(data, 'total', 0)
      state.trademarkList = get(data, 'list', [])
    },
    saveTrademarkSummary(state, data) {
      state.summaryData = data
    }
  },
  actions: {
    // 通过条件搜索 Trademark
    async searchTrademarkList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getTrademarkList(payload)
      context.dispatch('getTrademarkSummary')
      if (isSuccessful(code)) {
        commit('saveTrademarkList', data)
      }
      return { code, message }
    },
    // 添加新品牌
    async addNewTrademark(context, payload) {
      const {
        data: { code, message, data }
      } = await addNewTrademark(payload)
      context.dispatch('getTrademarkSummary')
      return { code, message, data }
    },
    // 编辑新品牌
    async editNewTrademark(context, payload) {
      const {
        data: { code, message, data }
      } = await editNewTrademark(payload)
      context.dispatch('getTrademarkSummary')
      return { code, message, data }
    },
    // 撤销
    async revokeTrademark(context, payload) {
      const {
        data: { code, message, data }
      } = await revokeTrademark(payload)
      context.dispatch('getTrademarkSummary')
      return { code, message, data }
    },
    // 删除
    async deleteTrademark(context, payload) {
      const {
        data: { code, message, data }
      } = await deleteTrademark(payload)
      context.dispatch('getTrademarkSummary')
      return { code, message, data }
    },
    /**
     * @description 品牌各状态总数
     */
    async getTrademarkSummary(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getTrademarkSummary(payload)
      if (isSuccessful(code)) {
        commit('saveTrademarkSummary', data)
      }
      return {
        code,
        message,
        data
      }
    },
    // 获取品牌详情
    async getTrademarkDetail(context, payload) {
      const {
        data: { code, message, data }
      } = await getTrademarkDetail(payload)
      context.dispatch('getTrademarkSummary')
      return { code, message, data }
    }
  }
}
