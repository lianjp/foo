import axios from '@/service'
// deleteTrademark
export default ({ id }) => {
  return axios.post('supbrand/delete', {
    id
  })
}
