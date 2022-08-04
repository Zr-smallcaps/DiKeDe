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
// 获取用户信息
export function getUserDetailInfo(id) {
  return request({
    url: `/user-service/user/${id}`,
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
