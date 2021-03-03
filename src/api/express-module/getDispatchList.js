// 运费模板列表
import { autoCancel } from '@/service'
const axios = autoCancel()
const pickBy = require('lodash/pickBy')

export default ({ currentPage, pageSize, keyword, state }) => {
  return axios.get('supdispatch/dispatchList', {
    params: pickBy(
      {
        page: currentPage,
        pageSize: pageSize,
        keyword,
        enabled: state
      },
      v => v !== ''
    )
  })
}
