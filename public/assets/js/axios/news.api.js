import service from './request.js'

// 查询商品列表
export const doGetNewsList = () => {
  return service({
    url: '/api/news/list',
    method: 'get',
  })
}

// 增加商品
export const doNewsAdd = (data) => {
  return service({
    url: '/api/news/add',
    method: 'post',
    data: data,
  })
}

// 修改商品
export const doNewsEdit = (data) => {
  return service({
    url: '/api/news/edit',
    method: 'post',
    data: data,
  })
}

// 删除商品
export const doNewsDelete = (data) => {
  return service({
    url: '/api/news/delete',
    method: 'post',
    data: data,
  })
}
