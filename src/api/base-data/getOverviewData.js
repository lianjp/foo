import axios from '@/service'

// 总览数据，首页的
export default () => {
  return axios.get('supindex/index')
}
