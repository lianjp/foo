// 售后模块 从订单模块拆离
// 售后订单列表
import getAfterSaleOrderList from '@/api/after-sale-order/getAfterSaleOrderList'
// 维权订单列表
import getProtectionOrderList from '@/api/after-sale-order/getProtectionOrderList'

// 售后维权订单各总数
import getAfterOrderSummary from '@/api/after-sale-order/getAfterOrderSummary'

import { isSuccessful } from '@/code-status-type'

// 获取售后订单详情页
import getAfterOrderDetailsById from '@/api/after-sale-order/getAfterOrderDetailsById'

import refundsRefuse from '@/api/after-sale-order/refundsRefuse'

import afterOrderStatusTypeMap from '@/type/afterOrderStatusTypeMap.js'

/**
 * * 售后模块 从订单模块拆离
 */
export default {
  namespaced: true,
  state: {
    // 订单首页数据
    orderSummary: {},
    // 售后订单列表数据
    afterSaleOrderList: [],

    // 维权订单列表数据
    protectionOrderList: [],

    // 订单总数
    afterSaleOrderTotal: 0,
    protectionOrderTotal: 0,

    // 售后维权订单各总数
    summaryData: {
      saleApplication: 0 /* 申请售后 */,
      maintain: 0 /* 维权订单 */
    },

    // 售后订单详情
    currentAfterOrderDetails: {}
  },
  mutations: {
    saveOrderSummary(state, data) {
      state.dispatchData = { ...state.orderSummary, ...data }
    },
    // 售后的订单
    saveAfterSaleOrderList(state, { list, total }) {
      state.afterSaleOrderList = list || []
      state.afterSaleOrderTotal = total || 0
    },
    // 维权的订单
    saveProtectionOrderList(state, { list, total }) {
      state.protectionOrderList = list || []
      state.protectionOrderTotal = total || 0
    },
    // 售后维权订单各总数
    saveAfterSaleOrderSummary(state, data) {
      state.summaryData = data
    },
    // 售后订单详情
    saveAfterOrderDetails(state, data) {
      state.currentAfterOrderDetails = data
    }
  },
  actions: {
    /**
     * @description 分发售后维权列表数据
     */
    async toDistributeContent(context, payload) {
      switch (afterOrderStatusTypeMap[payload.status]) {
        case 'afterSaleOrder': {
          await context.dispatch('getAfterSaleOrderList', payload)
          context.dispatch('getAfterOrderSummary')
          break
        }
        case 'protectionOrder': {
          await context.dispatch('getProtectionOrderList', payload)
          context.dispatch('getAfterOrderSummary')
          break
        }
      }
    },
    /**
     * @description 售后订单列表数据
     */
    async getAfterSaleOrderList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getAfterSaleOrderList(payload)
      if (isSuccessful(code)) {
        commit('saveAfterSaleOrderList', data)
      }
      return {
        code,
        message
      }
    },
    /**
     * @description 维权订单列表数据
     */
    async getProtectionOrderList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getProtectionOrderList(payload)
      if (isSuccessful(code)) {
        commit('saveProtectionOrderList', data)
      }
      return {
        code,
        message
      }
    },
    /**
     * @description 获取售后订单详情
     */
    async getAfterOrderDetailsById(context, payload) {
      const {
        data: { code, message, data }
      } = await getAfterOrderDetailsById(payload)
      context.commit('saveAfterOrderDetails', data)
      return {
        code,
        message,
        data
      }
    },
    /**
     * @description 卖家拒绝退货退款
     */
    async refundsRefuse(context, payload) {
      const {
        data: { code, message, data }
      } = await refundsRefuse(payload)
      return { code, message, data }
    },
    /**
     * @description 售后维权订单各状态总数
     */
    async getAfterOrderSummary(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getAfterOrderSummary(payload)
      if (isSuccessful(code)) {
        commit('saveAfterSaleOrderSummary', data)
      }
      return {
        code,
        message,
        data
      }
    }
  },
  getters: {}
}
