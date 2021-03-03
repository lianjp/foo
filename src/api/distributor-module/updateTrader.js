import axios from '@/service'

export default ({ id, newStatus }) => {
  return axios.post('supoftrader/updateTrader', {
    id,
    status: newStatus
  })
}
