import axios from '@/service'
// 商品删除
export default ({ ids }) => {
  return axios.post('supgoods/batchdelete', {
    ids
  })
}
