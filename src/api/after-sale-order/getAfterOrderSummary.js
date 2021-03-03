import { autoCancel } from '@/service'
const axios = autoCancel()
// 售后维权订单各状态总数
export default () => {
  return axios.get('suporder/obtainServiceOrderTotal')
}
