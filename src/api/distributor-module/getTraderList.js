// 分销员列表
import { autoCancel } from '@/service'
const get = require('lodash/get')
const pickBy = require('lodash/pickBy')

const axios = autoCancel()
export default ({ status, keyword, currentPage, pageSize, timestamp }) => {
  const starttime = get(timestamp, '[0]', '')
  const endtime = get(timestamp, '[1]', '')

  return axios.get('supoftrader/traderMyList', {
    params: pickBy({
      status,
      keyword,
      page: currentPage,
      pageSize,
      starttime,
      endtime
    })
  })
}
