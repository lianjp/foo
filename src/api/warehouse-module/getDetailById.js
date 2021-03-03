import axios from '@/service'
const get = require('lodash/get')
const set = require('lodash/set')
// 仓库详情
export default async ({ id }) => {
  const data = await axios.get('/supwarehouse/detail', {
    params: {
      id
    }
  })
  const zipcode = get(data, 'data.data.zipcode', '') || '------'
  set(data, 'data.data.zipcode', {
    province: zipcode.slice(0, 2) + '0000',
    city: zipcode.slice(0, 4) + '00',
    county: zipcode
  })
  return data
}
