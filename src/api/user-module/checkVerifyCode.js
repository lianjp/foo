import axios from '@/service'

import localforage from '@/utils/localforageStore'
// 注册接口 验证二维码接口

export default async ({ mobile, verifyCode }) => {
  const result = await axios.post('account/checkVerifyCode', {
    mobile,
    verifyCode
  })
  await localforage.setItem('jwt', result.data.data)
  return result
}
