import axios from '@/service'

// 获取验证码 注册部分 找回密码部分
export default ({ mobile, nowOperation }) => {
  if (nowOperation === 'smsRegister') {
    return axios.post('supreg/send_sms', {
      mobile
    })
  }
  if (nowOperation === 'smsForgot') {
    return axios.post('suplogin/sendsmsrefind', {
      mobile
    })
  }
}
