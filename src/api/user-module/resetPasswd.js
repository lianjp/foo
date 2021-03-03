import axios from '@/service'
// 找回密码
// nologinchangepwd
export default ({ mobile, password1, password2, securityCode }) => {
  console.log(mobile, password1, password2, securityCode)
  return axios.post('suplogin/nologinchangepwd', {
    mobile,
    code: securityCode,
    password: password1,
    againpassword: password2
  })
}
