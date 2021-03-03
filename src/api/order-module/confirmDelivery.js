import axios from '@/service'

export default ({ id, express, expresssn }) => {
  return axios.post('suporder/confirmShipment', {
    id,
    express,
    expresssn
  })
}
