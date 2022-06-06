import request from '@/utils/request'

// 封装登录接口
export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'post',
    data
  })
}

// 封装请求用户登录信息的函数
export function getUserProfile(token) {
  return request({
    url: '/api/sys/profile',
    method: 'post'
  })
}

export function logout() {

}
