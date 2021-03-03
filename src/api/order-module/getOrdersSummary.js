import { autoCancel } from '@/service'
const axios = autoCancel()
// 订单各状态总数
export default () => {
  return axios.get('suporder/obtainOrdersTotal')
}
