import httpRequest from '@/libs/httpRequest'
export const getModelData = (username) => {
  let option = {
    url: 'http://10.100.216.20:7999/api/getUserModel',
    method: 'POST',
    data: {
      username: username
    }
  }
  return httpRequest.request(option)
}

export const getOrder = () => {
  let option = {
    url: 'http://10.100.216.20:7999/api/order',
    method: 'GET'
  }
  return httpRequest.request(option)
}

export const getOrderPost = () => {
    let option = {
        url: 'http://10.100.216.20:7999/api/orders',
        method: 'POST'
      }
      return httpRequest.request(option)
}

export const getImgCode = () => {
    let option = {
        url: 'http://10.100.216.20:7999/validate/image',
        method: 'get'
    }
    return httpRequest.request(option)
}