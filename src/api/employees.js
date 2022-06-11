import request from '@/utils/request'

/**
 * @description: 获取下拉员工数据
 * @param {*}
 * @return {*}
 */
export function getEmployee() {
  return request({
    url: '/api/sys/user/simple'
  })
}

/**
 * @description: 获取下拉员工数据
 * @param {*}
 * @return {*}
 */
export function getEmployeeList(page, size) {
  return request({
    url: '/api/sys/user',
    params: { page, size }
  })
}
