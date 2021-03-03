import axios from '@/service'

// 仓库管理 仓库列表
export default ({ currentPage = 1, pageSize = 10, keyword }) => {
  return axios.get('/supwarehouse/warehouseList', {
    params: {
      page: currentPage,
      pageSize,
      keyword
    }
  })
}
