import { autoCancel } from '@/service'
const axios = autoCancel()

// 商品品类下拉
export default () => {
  return axios.get('category/selectCateList')
}
