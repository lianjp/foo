// 提现模块 financialModule
import getFinacialOverview from '@/api/financial-module/getFinacialOverview'
import getFinacialRecordList from '@/api/financial-module/getFinacialRecordList'

// 提现
import applyWithdraw from '@/api/financial-module/applyWithdraw'

// 提现详情
import getApplyWithdrawDetailById from '@/api/financial-module/getApplyWithdrawDetailById'

// import localforage from '@/utils/localforageStore'
import { isSuccessful } from '../code-status-type'
export default {
  namespaced: true,
  state: {
    // 总览数据
    overViewData: {
      auditing: '',
      settled: '',
      settlement: '',
      status: '',
      withdrawable: '',
      // 可提现订单的 汇总数据
      orderAmount: {},
      // 可提现订单的 列表
      orderList: []
    },
    finacialRecordList: [],
    finacialRecordTotal: 0,
    // 一条详情的数据
    oneDetail: {}
  },
  mutations: {
    saveFinacialOverview(state, overViewData) {
      state.overViewData = overViewData
    },
    saveFinacialRecordList(state, { list = [], total = 0 }) {
      state.finacialRecordList = list
      state.finacialRecordTotal = total
    },
    saveOneDetail(state, data) {
      state.oneDetail = data
    }
  },
  actions: {
    //
    async getFinacialOverview(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getFinacialOverview(payload)
      if (isSuccessful(code)) {
        commit('saveFinacialOverview', data)
      }
      return { code, message }
    },

    // 提现记录列表,
    async getFinacialRecordList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getFinacialRecordList(payload)
      if (isSuccessful(code)) {
        commit('saveFinacialRecordList', data)
      }
      return { code, message }
    },
    // 提现
    async applyWithdraw(context, payload) {
      const {
        data: { code, message }
      } = await applyWithdraw(payload)
      return { code, message }
    },
    // 提现详情
    async getApplyWithdrawDetailById(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getApplyWithdrawDetailById(payload)
      if (isSuccessful(code)) {
        commit('saveOneDetail', data)
      }
      return { code, message, data }
    }
  }
}
