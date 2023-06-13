import { getUserInfo } from '../axios/api.js'

const res = getUserInfo()

console.log(res)
// res.then((result) => {
//   const { user_name, is_admin, email } = result.data.result
//   console.log(user_name)
//   localStorage.setItem('username', user_name)
//   localStorage.setItem('is_admin', is_admin)
//   localStorage.setItem('email', email)

//   document.getElementById('user_name').innerHTML = user_name
//   document.getElementById('topBar_user_name').innerHTML = user_name
//   if (is_admin) {
//     document.getElementById('auth').innerHTML = '管理员'
//   } else {
//     document.getElementById('auth').innerHTML = '普通用户'
//   }
// })
