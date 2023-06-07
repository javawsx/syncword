import service from './request.js'

// 注册
export const doRegister = (data) => {
  return service({
    url: '/users/my/register',
    method: 'post',
    data: data,
  })
}

// 登录
export const doLogin = (data) => {
  return service({
    url: '/users/my/login',
    method: 'post',
    data: data,
  })
}

// 加载用户数据
export const getUserInfo = () => {
  return service({
    url: '/users/userinfo',
    method: 'get',
  })
}
