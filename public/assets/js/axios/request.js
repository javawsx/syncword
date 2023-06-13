import { alertError } from '../axios/alerts.js'
const service = axios.create({
  // 创建服务
  baseURL: 'http://localhost:3000', // 基础路径
  timeout: 10000, // 请求延时
})
service.interceptors.request.use(
  // 请求拦截
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  // 回复拦截，主要针对部分回掉数据状态码进行处理
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error && error.response) {
      // 对错误按错误码进行分别处理
      switch (error.response.status) {
        case 401:
          window.location.href = '/login'
          break
        case 403:
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 404:
          window.location.href = '/auth-404-basic'
          break
        case 500:
          window.location.href = '/auth-500'
          break
        default:
          break
      }
    } else {
      alertError('后台接口无响应或网络错误!')
    }
    return Promise.reject(error)
  }
)
export default service
