import axios from '@/service'

// 仓库下拉框数据
export default () => {
  return axios.get('supwarehouse/selectWareHouse')
}
