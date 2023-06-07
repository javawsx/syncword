const service = axios.create({
  // 创建服务
  baseURL: 'http://localhost:3000', // 基础路径
  timeout: 10000, // 请求延时
})
service.interceptors.request.use(
  // 请求拦截
  (config) => {
    console.log('config:', config)
    console.log('token:', localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      console.log('token:', localStorage.getItem('token'))
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
    console.log('response:', response)
    switch (response.data.status) {
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

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default service
