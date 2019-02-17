import Axios from 'axios'
import {
  Message
} from 'iview'
import qs from 'qs'
import {
  getUser
} from '@/libs/util'


const conf = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/'
}

const instance = Axios.create(conf)
//发送请求前处理
instance.interceptors.request.use(config => {
  if (!config.url.includes('/api/login')) {
    const user = getUser()
    if (user && user.token) {
      config.headers.Authorization =  "Bearer " + user.token
    }
  }
  config.withCredentials = true;
  //console.log(config)
  return config
})

instance.interceptors.response.use(res => {
  return res
}, error => {
  //handling errors
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      if (error.response.config.url === '/api/login') {
        return Promise.reject('401')
      } else {
        Message.error('login_timeout')
        window.$bus.$emit('login_exp')
        return Promise.reject('login expired.')
      }
    } else {
      if (error.response.data.message) {
        Message.error(error.response.data.message)
      } else {
        Message.error('ajax error')
      }
      return Promise.reject('ajax error:server response status ' + error.response.status)
    }
  } else if (error.request) {
    Message.error('ajax error')
    return Promise.reject('ajax error:The request was made but no response was received')
  } else {
    Message.error('ajax_error')
    return Promise.reject('ajax error:' + error.message)
  }
})

export default {
  request(options) {
    return instance(options)
  },
  formRequest(options) {
    if (!options.data) {
      return instance({
        url: options.url,
        method: 'get'
      })
    }
    return instance({
      url: options.url,
      method: 'post',
      data: qs.stringify(options.data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
