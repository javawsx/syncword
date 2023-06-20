import service from './request.js'

// 注册
export const doRegister = (data) => {
  return service({
    url: '/api/register',
    method: 'post',
    data: data,
  })
}

// 登录
export const doLogin = (data) => {
  return service({
    url: '/api/login',
    method: 'post',
    data: data,
  })
}

// 修改用户信息
export const doUserEdit = (data) => {
  return service({
    url: '/api/users/edit',
    method: 'post',
    data: data,
  })
}

// 修改用户信息
export const doUserImageEdit = (data) => {
  return service({
    url: '/api/users/editImage',
    method: 'post',
    data: data,
  })
}

// 修改密码
export const doChangePassword = (data) => {
  return service({
    url: 'api/users/changePassword',
    method: 'patch',
    data: data,
  })
}

// 加载用户数据
export const getUserInfo = () => {
  return service({
    url: '/api/users/userinfo',
    method: 'get',
  })
}
