import { autoCancel } from '@/service'
const axios = autoCancel()
// 查询 商品列表接口
const pickBy = require('lodash/pickBy')
export default ({ currentPage, status, pageSize, status2, keyword }) => {
  return axios.get('supgoods/marketList', {
    params: pickBy({
      currentPage,
      type: status,
      pageSize,
      status: status2,
      keyword
    })
  })
}
