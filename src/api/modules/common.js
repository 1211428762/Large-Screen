/**
 * 1、接口地址统一在constUrl.js中编写
 * 
 */

import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import httpUrl from '../constUrl'


// 获取验证码
export function captcha(uuid) {
  //console.log('获取uuid....');
  return requestUrl(`${httpUrl.CAPTCHA}?uuid=${uuid}`)
}

// 登录
export function login(params) {
  return request({
    url: requestUrl(httpUrl.LOGIN),
    method: 'post',
    data: requestParam(params)
  })
}

// 退出
export function logout() {
  return request({
    url: requestUrl(httpUrl.LOGOUT),
    method: 'post',
    data: requestParam()
  })
}



/***
 * post  formdata方式demo
 */
// export function demo(params) {
//   return request({
//       url: requestUrl(httpUrl.XXXXX),
//       method: 'post',
//       headers: {
//           "Content-Type": "multipart/form-data"
//       },
//       data: params
//   })
// }