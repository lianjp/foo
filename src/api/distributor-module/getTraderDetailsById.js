// 分销员详情
import { autoCancel } from '@/service'

const axios = autoCancel()
export default ({ id }) => {
  return axios.get('supoftrader/traderDetail', {
    params: {
      id
    }
  })
}
