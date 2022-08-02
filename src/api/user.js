import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'post',
    data
  })
}

export function getVerificationCode(code) {
  return request({
    url: `/user-service/user/imageCode/${code}`,
    method: 'get',
    responseType: 'arraybuffer'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
