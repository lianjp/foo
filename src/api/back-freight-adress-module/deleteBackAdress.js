import axios from '@/service'

export default ({ ids }) => {
  return axios.post('suprefundaddress/delete', {
    ids
  })
}
