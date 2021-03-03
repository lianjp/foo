import { autoCancel } from '@/service'
const axios = autoCancel()

// 获取售后订单详情页
export default ({ refundId }) => {
  return axios.get('suprefund/detail', {
    params: {
      refundid: refundId
    }
  })
}
