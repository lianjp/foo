export default {
  install(Vue) {
    Vue.filter('moneyToLabel', function(value) {
      return parseFloat(value) ? value : '-'
    })

    Vue.filter('enabledToLabel', function(value) {
      const map = {
        '0': '不启动',
        '1': '启动'
      }
      return map[value]
    })

    Vue.filter('isdefaultTolabel', function(value) {
      const map = {
        '0': '非默认',
        '1': '默认'
      }
      return map[value]
    })

    Vue.filter('applyStatusToLabel', function(value) {
      const map = {
        '0': '待审核',
        '1': '审核通过',
        '2': '审核拒绝'
      }
      return map[value]
    })

    Vue.filter('distributorStatusToLabel', function(value) {
      const map = {
        '0': '禁用',
        '1': '正常'
      }
      return map[value]
    })

    Vue.filter('commodityTypeToLabel', function(value) {
      const map = {
        '0': '禁用',
        '1': '出售中',
        '2': '审核中',
        '3': '已售罄',
        '4': '仓库中',
        '5': '回收站'
      }
      return map[value]
    })

    /* 订单状态，-1=全部、0=待付款订单 1=待发货 2=待收货 3=已完成 4=已关闭 */
    Vue.filter('orderTypeToLabel', function(value) {
      const map = {
        '0': '待付款订单',
        '1': '待发货',
        '2': '待收货',
        '3': '已完成',
        '4': '已关闭'
      }
      return map[value] || '未知'
    })

    /* 售后订单状态，空字符串=全部、0=待付款订单 1=未处理 */
    Vue.filter('afterSaleOrderTypeToLabel', function(value) {
      const map = {
        ' ': '全部',
        '1': '未处理',
        '2': '已处理'
      }
      return map[value] || '未知'
    })

    /* 维权订单状态，空字符串=全部、0=维权中 1=维权完结 */
    Vue.filter('protectionOrderTypeToLabel', function(value) {
      const map = {
        ' ': '全部',
        '1': '维权中',
        '2': '维权完结'
      }
      return map[value] || '未知'
    })

    /* 22 */
    Vue.filter('paytypeToLabel', function(value) {
      const map = {
        '21': '微信支付',
        '22': '支付宝支付'
      }
      return map[value] || '未知'
    })

    /* 22 付款方式的中文 */
    Vue.filter('applyTypeToLabel', function(value) {
      const map = {
        '0': '微信钱包',
        '22': '支付宝支付'
      }
      return map[value] || '未知'
    })

    /* "status": 1    -1=已无效 1=待审核 2=待结算 3=已结算 */
    Vue.filter('withdrawTypeToLabel', function(value) {
      const map = {
        '-1': '已无效',
        '1': '待审核',
        '2': '待结算',
        '3': '已结算'
      }
      return map[value] || '未知'
    })
  }
}
