import service from './request.js'
// 查询礼包列表
export const doGetList = () => {
  return service({
    url: '/api/pack/list',
    method: 'get',
  })
}

// 查询礼包ID下拉框数据
export const doGetPackSelect = () => {
  return service({
    url: '/api/pack/select',
    method: 'get',
  })
}

// 新增礼包
export const doPackAdd = (data) => {
  return service({
    url: '/api/pack/add',
    method: 'post',
    data: data,
  })
}
// 修改礼包
export const doPackEdit = (data) => {
  return service({
    url: '/api/pack/edit',
    method: 'post',
    data: data,
  })
}
// 删除礼包
export const doPackDelete = (data) => {
  return service({
    url: '/api/pack/delete',
    method: 'post',
    data: data,
  })
}

// 查询礼包代码列表
export const doGetCodeList = () => {
  return service({
    url: '/api/pack-code/list',
    method: 'get',
  })
}

// 新增礼包代码
export const doCodeAdd = (data) => {
  return service({
    url: '/api/pack-code/add',
    method: 'post',
    data: data,
  })
}
// 修改礼包代码
export const doCodeEdit = (data) => {
  return service({
    url: '/api/pack-code/edit',
    method: 'post',
    data: data,
  })
}
// 删除礼包代码
export const doCodeDelete = (data) => {
  return service({
    url: '/api/pack-code/delete',
    method: 'post',
    data: data,
  })
}

// 查询礼包道具列表
export const doGetItemList = () => {
  return service({
    url: '/api/pack-item/list',
    method: 'get',
  })
}

// 新增礼包道具
export const doItemAdd = (data) => {
  return service({
    url: '/api/pack-item/add',
    method: 'post',
    data: data,
  })
}

// 新增礼包道具
export const doItemAddBatch = (data) => {
  return service({
    url: '/api/pack-item/addBatch',
    method: 'post',
    data: data,
  })
}
// 修改礼包道具
export const doItemEdit = (data) => {
  return service({
    url: '/api/pack-item/edit',
    method: 'post',
    data: data,
  })
}
// 删除礼包道具
export const doItemDelete = (data) => {
  return service({
    url: '/api/pack-item/delete',
    method: 'post',
    data: data,
  })
}
