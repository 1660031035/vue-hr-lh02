import request from '@/utils/request'

/**
 * @description: 获取下拉员工数据
 * @return {*}
 */
export function getEmployee() {
  return request({
    url: '/api/sys/user/simple'
  })
}

/**
 * @description: 获取下拉员工数据
 * @return {*}
 * @param page
 * @param size
 */
export function getEmployeeList(page, size) {
  return request({
    url: '/api/sys/user',
    params: { page, size }
  })
}

/**
 * @description: 删除员工
 * @param {*} id 员工id
 * @return {*}
 */
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/api/sys/user/${id}`
  })
}

/**
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/api/sys/user',
    data
  })
}

/**
 * @description: 导入excel
 * @param {*} data
 * @return {*}
 */
export function importEmployee(data) {
  return request({
    url: '/api/sys/user/batch',
    method: 'post',
    data
  })
}
