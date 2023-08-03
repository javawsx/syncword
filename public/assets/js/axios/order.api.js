import service from './request.js'
// 查询订单列表
export const doGetList = () => {
  return service({
    url: '/api/order/list',
    method: 'get',
  })
}

// 查询订单列表
export const doSearchOrderList = (data) => {
  return service({
    url: '/api/order/search-order',
    method: 'post',
    data: data,
  })
}

// 查询当天充值金额，订单数
export const doGetData = () => {
  return service({
    url: '/api/order/data',
    method: 'get',
  })
}

// 查询充值金额，订单数
export const doChartData = (data) => {
  return service({
    url: '/api/order/chart',
    method: 'post',
    data: data,
  })
}

// 查询每个游戏的充值金额
export const doDonutData = (data) => {
  return service({
    url: '/api/order/donut',
    method: 'post',
    data: data,
  })
}
