// 推广员商品列表
import { autoCancel } from '@/service'

const axios = autoCancel()
export default ({ status, keyword, currentPage, pageSize }) => {
  return axios.get('suppromoters/promotersMyList', {
    params: {
      status,
      keyword,
      page: currentPage,
      pageSize
    }
  })
}
