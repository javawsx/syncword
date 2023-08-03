import service from './request.js'
// 查询游戏列表
export const doGetList = () => {
  return service({
    url: '/api/game/list',
    method: 'get',
  })
}

// 查询游戏列表
export const doGetGameSelect = () => {
  return service({
    url: '/api/game/select',
    method: 'get',
  })
}

// 增加游戏
export const doGameAdd = (data) => {
  return service({
    url: '/api/game/add',
    method: 'post',
    data: data,
  })
}

// 修改游戏
export const doGameEdit = (data) => {
  return service({
    url: '/api/game/edit',
    method: 'post',
    data: data,
  })
}

// 删除游戏
export const doGameDelete = (data) => {
  return service({
    url: '/api/game/delete',
    method: 'post',
    data: data,
  })
}

// 查询游戏语言列表
export const doGetLocaleList = () => {
  return service({
    url: '/api/game-locale/list',
    method: 'get',
  })
}

// 增加游戏语言信息
export const doLocaleAdd = (data) => {
  return service({
    url: '/api/game-locale/add',
    method: 'post',
    data: data,
  })
}

// 修改游戏语言信息
export const doLocaleEdit = (data) => {
  return service({
    url: '/api/game-locale/edit',
    method: 'post',
    data: data,
  })
}

// 删除游戏语言信息
export const doLocaleDelete = (data) => {
  return service({
    url: '/api/game-locale/delete',
    method: 'post',
    data: data,
  })
}

// 查询游戏服务器列表
export const doGetServerList = () => {
  return service({
    url: '/api/game-server/list',
    method: 'get',
  })
}

// 增加游戏服务器
export const doServerAdd = (data) => {
  return service({
    url: '/api/game-server/add',
    method: 'post',
    data: data,
  })
}

// 修改游戏服务器
export const doServerEdit = (data) => {
  return service({
    url: '/api/game-server/edit',
    method: 'post',
    data: data,
  })
}

// 删除游戏服务器
export const doServerDelete = (data) => {
  return service({
    url: '/api/game-server/delete',
    method: 'post',
    data: data,
  })
}

// 查询游戏商品列表
export const doGetShopList = () => {
  return service({
    url: '/api/game-shop/list',
    method: 'get',
  })
}

// 增加游戏商品
export const doShopAdd = (data) => {
  return service({
    url: '/api/game-shop/add',
    method: 'post',
    data: data,
  })
}

// 修改游戏商品
export const doShopEdit = (data) => {
  return service({
    url: '/api/game-shop/edit',
    method: 'post',
    data: data,
  })
}

// 删除游戏商品
export const doShopDelete = (data) => {
  return service({
    url: '/api/game-shop/delete',
    method: 'post',
    data: data,
  })
}
