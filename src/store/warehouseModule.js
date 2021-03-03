// 仓库管理 js
import warehouseList from '@/api/warehouse-module/warehouseList'
import deleteWarehouse from '@/api/warehouse-module/deleteWarehouse'
import getDetailById from '@/api/warehouse-module/getDetailById'
import editWarehouse from '@/api/warehouse-module/editWarehouse'
import addWarehouse from '@/api/warehouse-module/addWarehouse'

import { isSuccessful } from '../code-status-type'
const get = require('lodash/get')

export default {
  namespaced: true,
  state: {
    warehouseList: [],
    warehouseTotal: 0
  },
  mutations: {
    saveWarehouseList(state, data) {
      state.warehouseList = get(data, 'list', [])
      state.warehouseTotal = get(data, 'total', 0)
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

    async addWarehouse(context, payload) {
      const {
        data: { code, message }
      } = await addWarehouse(payload)
      return { message, code }
    },
    // 查询列表
    async getwarehouseList(context, payload) {
      const { commit } = context
      const {
        data: { code, message, data }
      } = await warehouseList(payload)
      if (isSuccessful(code)) {
        commit('saveWarehouseList', data)
      }
      return { message, data }
    },
    async editWarehouse(context, payload) {
      const {
        data: { code, message, data }
      } = await editWarehouse(payload)
      return { code, message, data }
    },
    // 删除
    async deleteWarehouse(context, payload) {
      const {
        data: { code, message }
      } = await deleteWarehouse(payload)
      return { message, code }
    }
  }
}
