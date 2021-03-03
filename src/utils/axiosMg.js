// 只用一个 axios 实例，可以设置 header。
// import Qs from 'qs'
import axios from 'axios'
// import Cookies from 'js-cookie'

axios.defaults.baseURL = '/api.php/api'
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['foo-bar'] = 'foo-baz'

// axios.defaults.paramsSerializer = function (params) {
//   return Qs.stringify(params, {
//     arrayFormat: 'repeat'
//   })
// }

axios.defaults.withCredentials = true
// 设置超时时间
axios.defaults.timeout = process.env
  ? process.env.VUE_APP_axio_timeout
    ? process.env.VUE_APP_axio_timeout
    : 6000
  : 6000

// Add a request interceptor
// 请求发送之前，的中间件，（可能是请求参数解析或其他错误）
axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应成功 和 错误中间件 超时直接结束
// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

// 错误 重新尝试的次数 1 次，读取环境变量，默认 0 次
const time = process.env
  ? process.env.VUE_APP_axios_retry_time
    ? process.env.VUE_APP_axios_retry_time
    : 0
  : 0

const ignoreErrorStatus = {
  400: true,
  418: true
}

axios.defaults.retry = time

// 重发请求的间隔时间
axios.defaults.retryDelay = process.env
  ? process.env.VUE_APP_axio_retry_delay
    ? process.env.VUE_APP_axio_retry_delay
    : 20000
  : 20000

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  console.error('============ ERROR ============')
  console.error(err)
  console.error('============ ERROR ============')
  const config = err.config
  err.response = err.response || {
    // 被取消了
    status: 418,
    data: ''
  }
  const status = err.response ? err.response.status : 418
  // If config does not exist or the retry option is not set, reject
  if (ignoreErrorStatus[status]) {
    return Promise.resolve(err).then(d => d.response, e => e.response)
  }
  if (!config || !config.retry || status < 500) {
    return Promise.reject(err).then(
      d => d,
      e => {
        console.log({
          title: 'AJAX 请求错误',
          message: `错误码： ${e.toString()}`,
          type: 'error',
          duration: 0
        })
        // e.response.data.error = true
        return e.response
      }
    )
  }
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err).then(
      d => d,
      e => {
        console.log({
          title: 'AJAX 请求，服务器错误',
          message: `错误码：${e.toString()}`,
          type: 'error',
          duration: 0
        })
        return e.response
      }
    )
  }

  // Increase the retry count
  config.__retryCount += 1

  // Create new promise to handle exponential backoff
  const backoff = new Promise(function(resolve) {
    // 暂停时间
    setTimeout(function() {
      resolve()
    }, config.retryDelay || 1)
  })

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    // axios 如果配置了 baseUrl , config 里面也会有，会产生多次拼接。
    // 所以 此处把 baseUrl 清空，因为已经拼接过了
    return axios({
      ...config,
      baseURL: ''
    })
  })
})

export default axios
