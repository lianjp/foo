import { autoCancel } from '@/service'
const axios = autoCancel()

// 查询 是否绑定公众号

export default () => {
  return axios.get('supapply/sureBinding', {})
}
