import axios from '@/service'

export default ({ gid }) => {
  return axios.get(`goods/goodDetail/${gid}`)
  // return axios.get('goods/goodDetail', {
  //   params: {
  //     gid
  //   }
  // })
}
