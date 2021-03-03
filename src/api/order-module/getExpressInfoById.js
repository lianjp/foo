import { autoCancel } from '@/service'
const axios = autoCancel()

// 查看物流信息
export default ({ id }) => {
  return axios.get('suporder/orderExpressInfo', {
    params: {
      id
    }
  })
}
