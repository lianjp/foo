import { autoCancel } from '@/service'
const axios = autoCancel()

// 品牌下拉框数据
export default () => {
  return axios.get('supbrand/selectBrand')
}
