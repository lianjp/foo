// 运费模板(配送方式)
import getDispatchList from '@/api/express-module/getDispatchList'
import addDispatch from '@/api/express-module/addDispatch'
import editDispatch from '@/api/express-module/editDispatch'
import deleteDispatch from '@/api/express-module/deleteDispatch'
import enableDispatch from '@/api/express-module/enableDispatch'
import disableDispatch from '@/api/express-module/disableDispatch'
import getDetailById from '@/api/express-module/getDetailById'

import { isSuccessful } from '../code-status-type'
const get = require('lodash/get')

export default {
  namespaced: true,
  state: {
    dispatchList: [],
    dispatchListTotal: 0
  },
  mutations: {
    saveDispatchList(state, data) {
      state.dispatchList = get(data, 'list', [])
      state.dispatchListTotal = get(data, 'total', 0)
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
    // 获取列表
    async getDispatchList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await getDispatchList(payload)
      if (isSuccessful(code)) {
        commit('saveDispatchList', data)
      }
      return { message, code }
    },
    // 添加
    async addDispatch(context, payload) {
      const {
        data: { code, message }
      } = await addDispatch(payload)
      return { message, code }
    },
    // 编辑
    async editDispatch(context, payload) {
      const {
        data: { code, message }
      } = await editDispatch(payload)
      return { message, code }
    },
    // 删除
    async deleteDispatch(context, payload) {
      const {
        data: { code, message }
      } = await deleteDispatch(payload)
      return { message, code }
    },
    // 启用
    async enableDispatch(context, payload) {
      const {
        data: { code, message }
      } = await enableDispatch(payload)
      return { message, code }
    },
    // 禁用
    async disableDispatch(context, payload) {
      const {
        data: { code, message }
      } = await disableDispatch(payload)
      return { message, code }
    }
  }
}
