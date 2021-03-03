import axios from '@/service'
import { filterLocalToServicePic } from '@/api/filterPicArray'
// editNewTrademark
const get = require('lodash/get')

export default ({ material, name, type, timestamp = [], id }) => {
  return axios.post('supbrand/edit', {
    name,
    type,
    material: filterLocalToServicePic(material),
    starttime: get(timestamp, '0', ''),
    endtime: get(timestamp, '1', ''),
    id
  })
}
