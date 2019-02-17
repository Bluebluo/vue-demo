import httpRequest from '@/libs/httpRequest'
import qs from 'qs'

export const login = ({username, password, validateCode}) => {
  let option = {
    url: 'http://10.100.216.20:7999/api/login',
    data: {
      'username': username,
      'password': password,
      'validateCode': validateCode
    },
    method: 'post'
  }
  console.log(option)
  return httpRequest.formRequest(option)
}

export const logout = (token) => {
    return httpRequest.request({
        url: 'http://10.100.216.20:7999/api/logout',
        method: 'post'
    })
}