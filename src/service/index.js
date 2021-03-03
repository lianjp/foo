/*
 * @Author: tian.fanfan
 * @Date: 2019-02-22 12:40:34
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-04-05 22:31:31
 */

/**
 ** service 层
 ** 用于处理 "损坏性" 请求错误，
 ** 返回错误码的后续操作
 ** 由于上层 axiosMg 已经把错误请求，处理成 resolve 的 promise，此处只需要 use 第一个参数
 */
import axios from '@/utils/axiosMg'
import brokenErrorMap from './brokenErrorMap'
import dataErrorMap from './dataErrorMap'
import _ from 'lodash'

axios.interceptors.response.use(function errorMiddleware(response) {
  const httpStatus = response.status
  const errorMessage = brokenErrorMap[httpStatus]
  const resMessage = _.get(response, 'data.msg', undefined)
  if (errorMessage !== undefined) {
    // http 层面的错误
    console.error(errorMessage)
    _.set(response, 'data.message', errorMessage)
    _.set(response, 'data.code', httpStatus * 10)
    _.set(response, 'data.errorMessage', errorMessage)
    return response
  } else {
    // 如果 data 不存在
    response.data = response.data || { code: 1 }
    response.data.message = resMessage
    return response
  }
})

axios.interceptors.response.use(function errorMiddleware(response) {
  // 数据层面的错误后续处理，需要统一处理的
  const code = _.get(response, 'data.code', undefined)
  const errorOption = _.get(dataErrorMap, code, undefined)
  if (errorOption && errorOption[1] && typeof errorOption[1] === 'function') {
    try {
      errorOption[1]()
    } catch (e) {}
  }
  return response
})

/**
 * * 自动取消上一次的 get 请求的插件函数
 * 使用方法：
 * import { autoCancel } from 'service'
 * const axios = autoCancel()
 * axios.get('/', {})
 * axios.get('/', {}) 瞬间第二次，会把第一次取消。
 */
export const autoCancel = () => {
  const CancelToken = axios.CancelToken
  let source
  return {
    async get(url, { cancelBefore = true, ...config } = {}) {
      if (source && cancelBefore) {
        source.cancel('Operation canceled')
        source = null
      }
      source = CancelToken.source()
      const result = await axios.get(url, {
        cancelToken: source.token,
        ...config
      })
      return result
    }
  }
}

axios.autoCancel = autoCancel
export default axios
