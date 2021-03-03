// 订单模块
import getOrderList from '@/api/order-module/getOrderList'
import getOrdersSummary from '@/api/order-module/getOrdersSummary'
import getOrderDetailsById from '@/api/order-module/getOrderDetailsById'

// 确认收货详情页 部分数据
import getSureDeliverInfoById from '@/api/order-module/getSureDeliverInfoById'
// 确认发货操作
import confirmDelivery from '@/api/order-module/confirmDelivery'
// 查看物流详情
import getExpressInfoById from '@/api/order-module/getExpressInfoById'

import { isSuccessful } from '@/code-status-type'
/**
 * * 订单模块
 */
export default {
  namespaced: true,
  state: {
    // 订单首页数据
    // orderSummary: {},
    // 订单列表数据
    orderList: [],
    // 订单总数
    orderTotal: 0,
    // 订单汇总
    ordersSummary: {
      allOrder: 0 /* 全部订单 */,
      paymenting: 0 /* 待付款 */,
      shipping: 0 /* 待发货 */,
      receiveing: 0 /* 待收货 */,
      finish: 0 /* 已完成 */,
      cancel: 0 /* 已关闭 */
    },
    currentOrderDetails: {},
    ExpressInfoData: []
  },
  mutations: {
    saveOrderList(state, { list, total }) {
      state.orderList = list || []
      state.orderTotal = total || 0
    },
    saveOrdersSummary(state, data) {
      state.ordersSummary = data
    },
    saveOrderDetails(state, data) {
      state.currentOrderDetails = data
    },
    saveOrderExpressInfoData(state, data) {
      state.ExpressInfoData = data
    }
  },
  actions: {
    /**
     * @description 订单各状态总数
     */
    async getOrdersSummary(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getOrdersSummary(payload)
      if (isSuccessful(code)) {
        commit('saveOrdersSummary', data)
      }
      return {
        code,
        message,
        data
      }
    },
    /**
     * @description 订单列表数据
     */
    async getOrderList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getOrderList(payload)
      context.dispatch('getOrdersSummary')
      if (isSuccessful(code)) {
        commit('saveOrderList', data)
      }
      return {
        code,
        message
      }
    },
    /**
     * @description 确认订单详情页部分数据
     */
    async getSureDeliverInfoById(context, payload) {
      const {
        data: { code, message, data }
      } = await getSureDeliverInfoById(payload)
      context.dispatch('getOrdersSummary')
      return {
        code,
        message,
        data
      }
    },
    async confirmDelivery(context, payload) {
      const {
        data: { code, message, data }
      } = await confirmDelivery(payload)
      context.dispatch('getOrdersSummary')
      return {
        code,
        message,
        data
      }
    },
    // 获取订单详情
    async getOrderDetailsById(context, payload) {
      const {
        data: { code, message, data }
      } = await getOrderDetailsById(payload)
      context.commit('saveOrderDetails', data)
      return {
        code,
        message,
        data
      }
    },
    // 获取物流信息
    async getExpressInfoById(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getExpressInfoById(payload)
      if (isSuccessful(code)) {
        commit('saveOrderExpressInfoData', data)
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
