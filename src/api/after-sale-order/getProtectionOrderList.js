/*
 * @Author: tian.fanfan
 * @Date: 2019-04-12 22:16:17
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-04-23 17:13:55
 */
import { autoCancel } from '@/service'
const axios = autoCancel()
const get = require('lodash/get')
const pickBy = require('lodash/pickBy')

// 维权订单列表数据
export default ({
  currentPage: page,
  pageSize,
  status,
  payType: paytype,
  timestamp,
  selectType: selecttype,
  protectionType: protectiontype,
  keyword
}) => {
  const starttime = get(timestamp, '[0]', '')
  const endtime = get(timestamp, '[1]', '')
  return axios.get('suporder/protectionList', {
    params: pickBy({
      page,
      paytype,
      pageSize,
      starttime,
      endtime,
      selecttype,
      protectiontype,
      keyword
    })
  })
}
