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
export function getProfile() {
  return request({
    url: '/api/sys/profile',
    method: 'post'
  })
}
// 获取用户头像
export function getUserInfo(id) {
  return request({
    url: '/api/sys/user/' + id,
    method: 'get'
  })
}
export function logout() {

}

/**
 * @description: 获取用某个用户的信息
 * @param {*} id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/api/sys/user/${id}`
  })
}

/**
 * @description: 保存员工信息
 * @param {*} data
 * @return {*}
 */
export function saveUserDetailById(data) {
  return request({
    url: `/api/sys/user/${data.id}`,
    method: 'put', // 全量修改
    data
  })
}
