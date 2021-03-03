import axios from '@/service'

// 确认发货详情页
export default ({ id }) => {
  return axios.get('suporder/sureDeliver', {
    params: {
      id
    }
  })
}
