import service from './request.js'
// 查询常规问题列表
export const doGetList = () => {
  return service({
    url: '/api/faq/list',
    method: 'get',
  })
}

// 查询常规问题主题ID下拉框数据
export const doGetTopicSelect = () => {
  return service({
    url: '/api/faq-topic/select',
    method: 'get',
  })
}

// 新增常规问题
export const doFaqAdd = (data) => {
  return service({
    url: '/api/faq/add',
    method: 'post',
    data: data,
  })
}
// 修改常规问题
export const doFaqEdit = (data) => {
  return service({
    url: '/api/faq/edit',
    method: 'post',
    data: data,
  })
}
// 删除常规问题
export const doFaqDelete = (data) => {
  return service({
    url: '/api/faq/delete',
    method: 'post',
    data: data,
  })
}

// 查询问题主题列表
export const doGetTopicList = () => {
  return service({
    url: '/api/faq-topic/list',
    method: 'get',
  })
}

// 新增问题主题
export const doFaqTopicAdd = (data) => {
  return service({
    url: '/api/faq-topic/add',
    method: 'post',
    data: data,
  })
}
// 修改问题主题
export const doFaqTopicEdit = (data) => {
  return service({
    url: '/api/faq-topic/edit',
    method: 'post',
    data: data,
  })
}
// 删除问题主题
export const doFaqTopicDelete = (data) => {
  return service({
    url: '/api/faq-topic/delete',
    method: 'post',
    data: data,
  })
}
