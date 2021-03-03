import axios from '@/service'

export default ({ ids }) => {
  return axios.post('supdispatch/batchenabled', {
    ids,
    enabled: '1'
  })
}
