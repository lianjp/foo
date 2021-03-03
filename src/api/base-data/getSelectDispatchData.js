import axios from '@/service'

// 品牌下拉框数据
export default () => {
  return axios.get('supdispatch/selectDispatch')
}
