import { autoCancel } from '@/service'
const axios = autoCancel()

// 获取供应商订单详情页
export default ({ id }) => {
  return axios.get('suporder/orderDetail', {
    params: {
      id
    }
  })
}
