// 提现记录历史列表接口
import { autoCancel } from '@/service'
const axios = autoCancel()
const pickBy = require('lodash/pickBy')
const get = require('lodash/get')

export default ({ status, keyword, currentPage, pageSize, timestamp }) => {
  const starttime = get(timestamp, '[0]', '')
  const endtime = get(timestamp, '[1]', '')
  return axios.get('supapply/applyList', {
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
