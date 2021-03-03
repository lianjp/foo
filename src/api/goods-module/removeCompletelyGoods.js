import axios from '@/service'
// 商品彻底删除
export default ({ ids }) => {
  return axios.post('supgoods/realdelete', {
    ids
  })
}
