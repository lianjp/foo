import axios from '@/service'

// 运费模块下拉框数据
export default () => {
  return axios.get('supdispatch/selectDispatch')
}
