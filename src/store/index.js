import Vue from 'vue'
import Vuex from 'vuex'
import { loadingPlugins } from 'vuex-store-plugins'

// 用户模块
import userModule from './userModule'

// 基础数据模块(数据预览模块)
import baseData from './baseData'

// 分销模块
import distributorModule from './distributorModule'

// 商品模块
import goodsModule from './goodsModule'

// 品牌模块
import trademarkModule from './trademarkModule'

// 仓库管理模块
import warehouseModule from './warehouseModule'

// 退货地址模块
import backFreightAdress from './backFreightAdress'

// 运费模板模块
import expressModule from './expressModule'

// 订单模块
import orderModule from './orderModule'

// 售后订单模块
import afterSaleOrder from './afterSaleOrder'

// 提现模块
import financialModule from './financialModule'

// vuex 状态管理
Vue.use(Vuex)

const storeOptions = {
  namespace: true,
  strict: process.env.NODE_ENV === 'production',
  modules: {
    // 用户+登录+登录后数据模块
    userModule,
    // 基础数据模块
    baseData,
    // 商品模块
    goodsModule,
    // 品牌模块
    trademarkModule,
    warehouseModule,
    backFreightAdress,
    expressModule,
    distributorModule,
    orderModule,
    afterSaleOrder,
    financialModule
  },
  state: {},
  mutations: {},
  actions: {
    // 第一次进入页面，需要的 action
    async firstEnterAfterFunc(store, payload) {
      await Promise.all([])
    }
  },
  getters: {
    logInState(state) {
      return state.userModule.logInState
    },
    registedSupplierSuccessState(state) {
      return parseInt(state.userModule.rsstate) === 1
    },
    loading(state) {
      return key => {
        // 和第 64 行的 loading 结合使用
        if (typeof key === 'string') {
          return state.loading[key]
        }
        if (Array.isArray(key)) {
          return key.map(v => state.loading[v]).some(v => v > 0)
        }
      }
    }
  }
}

const store = loadingPlugins(Vuex, storeOptions, 'loading', false)
window.store = store
export default store
