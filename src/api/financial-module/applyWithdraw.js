import axios from '@/service'

export default ({ applyType }) => {
  return axios.post('supapply/applyCash', {
    applyType
  })
}
