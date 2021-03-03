import axios from '@/service'
// 下架商品
export default ({ ids }) => {
  return axios.post('supgoods/batchLowerShelf', {
    ids
  })
}
