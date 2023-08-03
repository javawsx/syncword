import service from './request.js'
// 查询列表
export const doGetList = () => {
  return service({
    url: '/api/player/list',
    method: 'get',
  })
}

// 更新玩家信息
export const doPlayerEdit = (data) => {
  return service({
    url: '/api/player/edit',
    method: 'post',
    data: data,
  })
}

// 删除玩家信息
export const doPlayerDelete = (data) => {
  return service({
    url: '/api/player/delete',
    method: 'post',
    data: data,
  })
}
