import axios from '@/service'

// 删除仓库
export default ({ ids }) => {
  return axios.post('/supwarehouse/delete', {
    ids
  })
}
