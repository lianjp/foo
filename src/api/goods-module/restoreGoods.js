import axios from '@/service'
// 商品恢复
export default ({ ids }) => {
  return axios.post('supgoods/recovery', {
    ids
  })
}
