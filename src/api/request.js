import cookies from 'js-cookie'
import axios from 'axios'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  timeout: 600000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = cookies.get('token')
  return config
}, error => {
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    cookies.remove('token')
    router.push({
      name: 'login'
    })
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default service