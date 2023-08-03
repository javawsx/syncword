import service from './request.js'

// 查询商品列表
export const doGetShopList = () => {
  return service({
    url: '/api/shop/list',
    method: 'get',
  })
}

// 增加商品
export const doShopAdd = (data) => {
  return service({
    url: '/api/shop/add',
    method: 'post',
    data: data,
  })
}

// 修改商品
export const doShopEdit = (data) => {
  return service({
    url: '/api/shop/edit',
    method: 'post',
    data: data,
  })
}

// 删除商品
export const doShopDelete = (data) => {
  return service({
    url: '/api/shop/delete',
    method: 'post',
    data: data,
  })
}
