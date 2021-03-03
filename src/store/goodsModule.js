// 商品模块 goodsModule
import getGoodsList from '@/api/goods-module/goodsList'
import deleteGoods from '@/api/goods-module/deleteGoods'
import addGoods from '@/api/goods-module/addGoods'
import editGoods from '@/api/goods-module/editGoods'
import getDetailById from '@/api/goods-module/getDetailById'
import getGoodsSummary from '@/api/goods-module/getGoodsSummary'

// 商品上下架
import pushToShelves from '@/api/goods-module/pushToShelves'
import pushOutShelves from '@/api/goods-module/pushOutShelves'

// 商品恢复
import restoreGoods from '@/api/goods-module/restoreGoods'
import removeCompletelyGoods from '@/api/goods-module/removeCompletelyGoods'

// import localforage from '@/utils/localforageStore'
import { isSuccessful } from '../code-status-type'
export default {
  namespaced: true,
  state: {
    goodsList: [],
    goodsTotal: 0,
    // 商品详情
    goodDetails: {},
    // 商品汇总
    summaryData: {
      inSaleing: 0 /* 出售中 */,
      pending: 0 /* 审核中 */,
      refuse: 0 /* 审核拒绝 */,
      soldOut: 0 /* 已售罄 */,
      wareHouseing: 0 /* 仓库中 */,
      recyclBin: 0 /* 回收站 */
    }
  },
  mutations: {
    saveGoodsList(state, { total, list }) {
      state.goodsTotal = total
      state.goodsList = list
    },
    saveGoodsSummary(state, data) {
      state.summaryData = data
    }
  },
  actions: {
    // 获取商品详情
    async getDetailById(context, payload) {
      const {
        data: { code, message, data }
      } = await getDetailById(payload)
      // 获取详情不需要重新获取个数
      return { code, message, data }
    },
    async editGoods(context, payload) {
      const {
        data: { code, message, data }
      } = await editGoods(payload)
      context.dispatch('getGoodsSummary')
      return { code, message, data }
    },
    // 通过条件搜索 商品 goods
    async searchGoodsList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getGoodsList(payload)
      if (isSuccessful(code)) {
        commit('saveGoodsList', data)
      }
      context.dispatch('getGoodsSummary')
      return { code, message }
    },
    // 删除商品
    async deleteGoods(context, payload) {
      const {
        data: { code, message, data }
      } = await deleteGoods(payload)
      context.dispatch('getGoodsSummary')
      return { code, message, data }
    },
    // 添加
    async addGoods(context, payload) {
      const {
        data: { code, message }
      } = await addGoods(payload)
      context.dispatch('getGoodsSummary')
      return { message, code }
    },
    // 商品恢复
    async restoreGoods(context, payload) {
      const {
        data: { code, message }
      } = await restoreGoods(payload)
      context.dispatch('getGoodsSummary')
      return { message, code }
    },
    // 彻底删除
    async removeCompletelyGoods(context, payload) {
      const {
        data: { code, message, data }
      } = await removeCompletelyGoods(payload)
      context.dispatch('getGoodsSummary')
      return {
        code,
        message,
        data
      }
    },
    /**
     * @description 商品各状态总数
     */
    async getGoodsSummary(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getGoodsSummary(payload)
      if (isSuccessful(code)) {
        commit('saveGoodsSummary', data)
      }
      return {
        code,
        message,
        data
      }
    },
    // 商品上架
    async pushToShelves(context, payload) {
      const {
        data: { code, message, data }
      } = await pushToShelves(payload)
      context.dispatch('getGoodsSummary')
      return { code, message, data }
    },
    // 商品下架
    async pushOutShelves(context, payload) {
      const {
        data: { code, message, data }
      } = await pushOutShelves(payload)
      context.dispatch('getGoodsSummary')
      return { code, message, data }
    }
  }
}
