// 提现某条 提现记录的详情 接口
import axios from '@/service'
// const axios = autoCancel()
// const pickBy = require('lodash/pickBy')
// const get = require('lodash/get')
// const set = require('lodash/set')

export default ({ id }) => {
  return axios.get('supapply/detail', {
    params: {
      id
    }
  })
}
