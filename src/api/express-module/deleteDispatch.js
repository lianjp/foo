import axios from '@/service'

export default ({ ids }) => {
  return axios.post('supdispatch/batchdelete', {
    ids
  })
}
