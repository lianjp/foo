import { autoCancel } from '@/service'
const axios = autoCancel()
// 品牌各状态总数
export default () => {
  return axios.get('supbrand/obtainBrandTotal')
}
