import axios from '@/service'

// 注册接口 register

export default async ({ mobile, name, pass, pass2, securityCode }) => {
  const data = await axios.post('suplogin/register', {
    username: name,
    mobile: mobile,
    code: securityCode,
    pwd: pass,
    againpwd: pass2
  })
  // 请求结束，删除本次 jwt
  return data
}
