// 推广员列表
import { autoCancel } from '@/service'

const axios = autoCancel()
export default ({ id }) => {
  return axios.get('suppromoters/promotersDetail', {
    params: {
      id
    }
  })
}
