// 提现总览接口
import axios from '@/service'
// const axios = autoCancel()
// const pickBy = require('lodash/pickBy')
// const get = require('lodash/get')
// const set = require('lodash/set')

export default () => {
  return axios.get('supapply/indexApply')
}
