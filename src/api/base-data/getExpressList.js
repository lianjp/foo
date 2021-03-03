import { autoCancel } from '@/service'
const axios = autoCancel()

// 物流公司
export default () => {
  return axios.get('supdispatch/expressList')
}
