import axios from '@/service'

export default ({ id }) => {
  return axios.post('supbrand/revoke', {
    id
  })
}
