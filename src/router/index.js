/*
 * @Author: tian.fanfan
 * @Date: 2019-03-04 12:55:58
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-05-14 11:57:22
 */

import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import routerBeforeMW from './router-before-middleware'
import routerAfterMW from './router-after-middleware'
import needScrollToTopPage from './needScrollToTop'
// import deepKebabCase from './deepKebabCase'
Vue.use(Router)

/**
 * * meta.auth 决定该页面的权限
 * * 权限通过 router before moddleware 控制
 */

const options = {
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // 当前页跳转，仅查询参数在变化
    if (to.name === from.name) {
      return savedPosition
    }
    if (needScrollToTopPage[to.name]) {
      return { x: 0, y: 0 }
    }
    // (通过浏览器的 前进/后退 按钮触发) 时才可用
    if (savedPosition) {
      return savedPosition
    }
    return false
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: ['needLogIn', 'needRegistedSupplier']
      },
      redirect: { name: 'Overview' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */
          '../views/About.vue'
        )
    },
    {
      path: '/login',
      name: 'login',
      props: route => ({ redirectURL: route.query.redirectURL }),
      component: () =>
        import(
          /* webpackChunkName: "login" */
          '../views/LogInPage.vue'
        )
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(
          /* webpackChunkName: "register" */
          '../views/RegisterPage.vue'
        )
    },
    {
      path: '/forgot-passwd',
      name: 'ForgotPasswdPage',
      props: route => ({ step: parseInt(route.query.step) || 0 }),
      component: () =>
        import(
          /* webpackChunkName: "ForgotPasswdPage" */
          '../views/ForgotPasswdPage.vue'
        )
    },
    {
      path: '/register-supplier',
      name: 'RegisterSupplierPage',
      /**
       * ! deprecated 不再传入 step，由组件自己维护，且刷新时候，维持和用户状态一致
       */
      // props: route => ({ step: parseInt(route.query.step) || 0 }),
      meta: {
        // 需要登录权限
        auth: ['needLogIn']
      },
      component: () =>
        import(
          /* webpackChunkName: "RegisterSupplierPage" */
          '../views/RegisterSupplierPage.vue'
        )
    },
    {
      path: '/overview',
      name: 'Overview',
      meta: {
        auth: ['needLogIn', 'needRegistedSupplier']
      },
      component: () =>
        import(
          /* webpackChunkName: "Overview" */
          '../views/Overview.vue'
        )
    },
    // {
    //   path: '/goods-details/:id',
    //   name: 'GoodsDetails',
    //   props: route => ({
    //     id: parseInt(route.params.id) || 0
    //   }),
    //   component: () =>
    //     import(/* webpackChunkName: "GoodsDetails" */
    //     '../views/GoodsDetails.vue')
    // },
    // 商品
    {
      path: '/commodity',
      name: 'Commodity',
      props: route => ({
        currentPage: parseInt(route.query.currentPage) || 1,
        status: route.query.status || '1',
        keyword: route.query.keyword || ''
      }),
      meta: {
        auth: ['needLogIn']
      },
      component: () =>
        import(
          /* webpackChunkName: "Commodity" */
          '../views/Commodity.vue'
        )
    },
    // 品牌
    {
      path: '/trademark',
      name: 'Trademark',
      props: route => ({
        currentPage: parseInt(route.query.currentPage) || 1,
        status: route.query.status || '-1',
        keyword: route.query.keyword || ''
      }),
      meta: {
        auth: ['needLogIn']
      },
      component: () =>
        import(
          /* webpackChunkName: "Trademark" */
          '../views/Trademark.vue'
        )
    },

    // 订单
    {
      path: '/order',
      component: () =>
        import(
          /* webpackChunkName: "OrderIframe" */
          '../views/Order.vue'
        ),
      children: [
        {
          path: '',
          name: 'Order',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            status: route.query.status || '',
            selectType: route.query.selectType || '1',
            payType: route.query.payType || '',
            keyword: route.query.keyword || ''
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "Order" */
              '../views/order-children/OrderDefault.vue'
            )
        },
        {
          path: 'order-details/:id',
          name: 'OrderDetails',
          props: route => ({
            orderId: route.params.id
          }),
          component: () =>
            import(
              /* webpackChunkName: "OrderDetails" */
              '../views/OrderDetails.vue'
            )
        }
      ]
    },
    // 售后
    {
      path: '/after-sale-order',
      component: () =>
        import(
          /* webpackChunkName: "AfterSalePage" */
          '../views/AfterSalePage.vue'
        ),
      children: [
        {
          path: '',
          name: 'AfterSaleOrder',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            status: route.query.status || '6',
            selectType: route.query.selectType || '1',
            payType: route.query.payType || '',
            keyword: route.query.keyword || '',
            serviceType: route.query.serviceType || '',
            protectionType: route.query.protectionType || ''
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "AfterSaleOrder" */
              '../views/after-sale-order-children/AfterSaleOrder.vue'
            )
        },
        {
          path: 'after-order-details/:id',
          name: 'AfterOrderDetails',
          props: route => ({
            refundId: route.params.id
          }),
          component: () =>
            import(
              /* webpackChunkName: "AfterOrderDetails" */
              '../views/after-sale-order-children/AfterOrderDetails.vue'
            )
        }
      ]
    },
    // 结算，财务
    {
      path: '/financial',
      // name: 'FinancialIframe',
      component: () =>
        import(
          /* webpackChunkName: "FinancialIframe" */
          '../views/Financial.vue'
        ),
      meta: {
        auth: ['needLogIn']
      },
      children: [
        {
          path: '',
          name: 'Financial',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            status: route.query.status || '1',
            keyword: route.query.keyword || ''
          }),
          component: () =>
            import(
              /* webpackChunkName: "Financial" */
              '../views/financial-children/FinancialDefaultPage.vue'
            )
        },
        {
          path: 'request-withdraw-money',
          name: 'RequestWithdrawMoney',
          component: () =>
            import(
              /* webpackChunkName: "RequestWithdrawMoney" */
              '../views/financial-children/RequestWithdrawMoney.vue'
            )
        },
        {
          path: 'request-withdraw-money/:id',
          name: 'WithdrawalDetails',
          props: route => ({
            withdrawalId: route.params.id
          }),
          component: () =>
            import(
              /* webpackChunkName: "WithdrawalDetails" */
              '../views/financial-children/WithdrawalDetails.vue'
            )
        }
      ]
    },
    // 分销 Distributor
    {
      path: '/distributor',
      // name: 'DistributorIframe',
      props: route => ({
        activedPageName: route.name || ''
      }),
      component: () =>
        import(
          /* webpackChunkName: "DistributorIframe" */
          '../views/Distributor.vue'
        ),
      children: [
        {
          path: '',
          name: 'Distributor',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            status: route.query.status || '',
            keyword: route.query.keyword || ''
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "Financial" */
              '../views/distributor-children/DistributorDefault.vue'
            )
        },
        {
          path: 'promotion',
          name: 'Promotion',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            status: route.query.status || '',
            keyword: route.query.keyword || ''
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "Promotion" */
              '../views/distributor-children/Promotion.vue'
            )
        }
      ]
    },
    // 日志
    {
      path: '/history-log',
      name: 'HistoryLog',
      meta: {
        auth: ['needLogIn']
      },
      component: () =>
        import(
          /* webpackChunkName: "HistoryLog" */
          '../views/HistoryLog.vue'
        )
    },
    // 基础设置
    {
      path: '/settings',
      // name: 'Settings',
      props: route => ({
        activedPageName: route.name || ''
      }),
      component: () =>
        import(
          /* webpackChunkName: "SettingsIframe" */
          '../views/Settings.vue'
        ),
      children: [
        {
          path: '',
          name: 'Settings',
          redirect: {
            name: 'BaseInformation'
          },
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "SettingDefault" */
              '../views/setting-children/SettingDefault.vue'
            )
        },
        // 退货地址
        {
          path: 'back-freight-adress',
          name: 'BackFreightAdress',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            keyword: route.query.keyword
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "BackFreightAdress" */
              '../views/setting-children/BackFreightAdress.vue'
            )
        },
        // 基本资料
        {
          path: 'base-information',
          name: 'BaseInformation',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "BaseInformation" */
              '../views/setting-children/BaseInformation.vue'
            )
        },
        // 配送方式
        {
          path: 'way-of-expressage',
          name: 'WayOfExpressage',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            keyword: route.query.keyword,
            state: route.query.state || ''
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "WayOfExpressage" */
              '../views/setting-children/WayOfExpressage.vue'
            )
        },
        // 仓库管理
        {
          path: 'ware-house-management',
          name: 'Warehouse',
          props: route => ({
            currentPage: parseInt(route.query.currentPage) || 1,
            keyword: route.query.keyword
          }),
          meta: {
            auth: ['needLogIn']
          },
          component: () =>
            import(
              /* webpackChunkName: "Warehouse" */
              '../views/setting-children/Warehouse.vue'
            )
        }
      ]
    },
    // 测试路由
    {
      path: '/foo',
      component: () =>
        import(
          /* webpackChunkName: "Foo" */
          '../views/Foo.vue'
        )
    }
  ]
}

// const router = new Router(deepKebabCase(options))

const router = new Router(options)

window.router = router
routerBeforeMW.forEach(func => {
  router.beforeEach(func)
})
routerAfterMW.forEach(func => {
  router.afterEach(func)
})
export default router

// https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx01161417888497cd8f1bc4a90507686956&package=109004188&redirect_url=https%3A%2F%2Ftrade.youzan.com%2Ftrade%2Forder%2Fpaid%3Forder_no%3DE20190301161313060600016%26kdt_id%3D41285340
