// submitinfo
import axios from '@/service'

export default ({ mobile, name }) => {
  return axios.post('/supuser/submitinfo', {
    mobile,
    username: name
  })
}
