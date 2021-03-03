import axios from '@/service'
/**
 * ? 找回密码第一步
 */
export default formData => {
  return axios.post('/suplogin/retrieve', formData, {})
}
