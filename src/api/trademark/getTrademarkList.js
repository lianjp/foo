import { autoCancel } from '@/service'
const axios = autoCancel()

// 查询 商品列表接口
const get = require('lodash/get')
const pickBy = require('lodash/pickBy')

export default ({ currentPage, status, pageSize, keyword, timestamp = [] }) => {
  return axios.get('supbrand/brandList', {
    params: pickBy({
      page: currentPage,
      status,
      keyword,
      pageSize,
      starttime: get(timestamp, '0', ''),
      endtime: get(timestamp, '1', '')
    })
  })
}
