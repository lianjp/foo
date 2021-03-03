import axios from '@/service'
import { filterLocalToServicePic } from '@/api/filterPicArray'
// supbrand/add
const get = require('lodash/get')

export default ({ material, name, type, timestamp = [] }) => {
  return axios.post('supbrand/add', {
    name,
    type,
    material: filterLocalToServicePic(material),
    starttime: get(timestamp, '0', ''),
    endtime: get(timestamp, '1', '')
  })
}
