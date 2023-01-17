/**
 * 请求地址统一处理／组装
 * @param {*} actionName action方法名称
 */

import Const from './constUrl'



export default function (actionName) {
  // return (Const.env.NODE_ENV !== 'production' && Const.env.OPEN_PROXY ? '/api/' : Const.BASE_URL) + actionName
  return Const.PROXY_URL + actionName
}