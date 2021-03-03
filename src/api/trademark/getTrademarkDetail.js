import axios from '@/service'
import { filterServiceToLocalPic } from '@/api/filterPicArray'
const moment = require('moment')
// getTrademarkDetail
const get = require('lodash/get')
const has = require('lodash/has')
export default async ({ id }) => {
  const result = await axios.get('supbrand/detail', {
    params: {
      id
    }
  })
  if (has(result, 'data.data')) {
    const resultData = get(result, 'data.data', {})
    result.data.data = {
      name: resultData.name,
      type: parseInt(resultData.type),
      material: filterServiceToLocalPic(resultData.material),
      timestamp: [resultData.starttime, resultData.endtime].map(timeStamp =>
        moment.unix(timeStamp).valueOf()
      )
    }
  }
  return result
}
