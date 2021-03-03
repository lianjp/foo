import { autoCancel } from '@/service'
const axios = autoCancel()
// 商品各状态总数
export default () => {
  return axios.get('supgoods/obtainGoodsTotal')
}
