import getOverviewData from '@/api/base-data/getOverviewData'
import getExpressList from '@/api/base-data/getExpressList'
import getBrandData from '@/api/base-data/getBrandData'
import getAllWareHouse from '@/api/base-data/getAllWareHouse'
import getDispatchData from '@/api/base-data/getDispatchData'
import getAllGoodsCateList from '@/api/base-data/getAllGoodsCateList'

import { isSuccessful } from '@/code-status-type'
const isEmpty = require('lodash/isEmpty')

/**
 * * 基础数据
 */
export default {
  namespaced: true,
  state: {
    // 首页的 overview 数据
    overviewData: {},
    // 快递公司
    // 1 : {
    //  express: 'sf',
    //  name: '顺丰'
    // }
    expressList: {},
    // 下拉品牌数据 map 形式
    brandData: {},
    // 仓库数据 map 形式
    wareHouseData: {},
    // 运费模板数据
    dispatchData: {},
    // 商品的分类列表
    goodsCateList: []
  },
  mutations: {
    saveOverviewData(state, data) {
      state.overviewData = data
    },
    saveExpressList(state, data) {
      state.expressList = data
    },
    saveBrandData(state, data) {
      state.brandData = { ...state.brandData, ...data }
    },
    saveAllWareHouse(state, data) {
      state.wareHouseData = { ...state.wareHouseData, ...data }
    },
    saveDispatchData(state, data) {
      state.dispatchData = { ...state.dispatchData, ...data }
    },
    saveAllGoodsCateList(state, data) {
      state.goodsCateList = data
    }
  },
  actions: {
    /**
     * @description overviewData 全部数据
     */
    async getOverviewData(context) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getOverviewData()
      if (isSuccessful(code)) {
        commit('saveOverviewData', data)
      }
      return {
        code,
        message
      }
    },
    /**
     * @description 快递公司名称，数据
     */
    async getExpressList(context) {
      const { rootState, commit, state } = context
      if (
        rootState.loading['baseData/getExpressList'] <= 1 &&
        isEmpty(state.expressList)
      ) {
        const {
          data: { code, message, data }
        } = await getExpressList()
        if (isSuccessful(code)) {
          commit('saveExpressList', data)
        }
        return {
          code,
          message
        }
      }
    },
    /**
     * @description 品牌下拉数据
     */
    async getBrandData(context) {
      const { rootState, commit, state } = context
      if (
        rootState.loading['baseData/getBrandData'] <= 1 &&
        isEmpty(state.brandData)
      ) {
        const {
          data: { code, message, data }
        } = await getBrandData()
        if (isSuccessful(code)) {
          commit('saveBrandData', data)
        }
        return {
          code,
          message
        }
      }
      // }
    },
    /**
     * @description 所有的可发货的仓库，数据，仅有 id 和名称
     */
    async getAllWareHouse(context) {
      const { commit, state } = context
      if (isEmpty(state.wareHouseData)) {
        const {
          data: { code, message, data }
        } = await getAllWareHouse()
        if (isSuccessful(code)) {
          commit('saveAllWareHouse', data)
        }
        return {
          code,
          message
        }
      }
    },

    async getDispatchData(context) {
      const { state, dispatch } = context
      // rootState.loading['baseData/getDispatchData'] <= 1 &&
      if (
        isEmpty(state.dispatchData)
      ) {
        const { code, message } = await dispatch('refreshDispatchData')
        return {
          code,
          message
        }
      }
    },

    async refreshDispatchData(context) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getDispatchData()
      if (isSuccessful(code)) {
        commit('saveDispatchData', data)
      }
      return {
        code,
        message
      }
    },
    async getAllGoodsCateList(context) {
      const { commit, state } = context
      if (isEmpty(state.goodsCateList)) {
        const {
          data: { code, message, data }
        } = await getAllGoodsCateList()

        if (isSuccessful(code)) {
          commit('saveAllGoodsCateList', data)
        }
        return {
          code,
          message
        }
      }
    }
  },
  getters: {}
}
