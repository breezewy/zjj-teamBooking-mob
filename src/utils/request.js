import axios from 'axios'
import isPlainObject from 'lodash/isPlainObject'
import qs from 'qs'
import router from '@/router'
import { clearLoginInfo } from '@/utils'
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 5000
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Cookies.get('token') || ''


  // 默认参数
  var defaults = {}
  // 防止缓存，GET请求默认带_t参数
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      ...{ '_t': new Date().getTime() }
    }
  }
  if (isPlainObject(config.params)) {
    config.params = {
      ...defaults,
      ...config.params
    }
  }
  if (isPlainObject(config.data)) {
    config.data = {
      ...defaults,
      ...config.data
    }
    if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
      config.data = qs.stringify(config.data)
    }
  }

  // // 默认参数
  // if (isPlainObject(config.params)) {
  //   config.params = {
  //     ...config.params
  //   }
  // }
  // if (isPlainObject(config.data)) {
  //   config.data = {
  //     ...config.data
  //   }
  // }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data.code === '401' || response.data.code === '10001') {

    clearLoginInfo()
    router.replace({ path: '/' })
    return Promise.reject(response.data.msg)
  }

  return response
}, error => {
  return Promise.reject(error)
})

export default http
