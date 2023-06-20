import { getUserInfo } from '../axios/api.js'

const res = getUserInfo()

console.log(res)
// res.then((result) => {
//   const { user_image } = result.data.result
//   console.log(user_image)
//   localStorage.setItem('user_image', user_image)
// })
