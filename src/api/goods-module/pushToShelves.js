import axios from '@/service'
// 上架商品
export default ({ ids }) => {
  return axios.post('supgoods/batchUpShelf', {
    ids
  })
}
