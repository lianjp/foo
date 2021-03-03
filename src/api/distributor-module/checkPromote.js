import axios from '@/service'

export default ({ id, newStatus }) => {
  return axios.post('suppromoters/checkStatus', {
    id,
    status: newStatus
  })
}
