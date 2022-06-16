import request from '@/utils/request'
/**
 * 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
export function getRoles(params) {
  return request({
    url: '/api/sys/role',
    method: 'get',
    'params': params
  })
}

/**
 * 删除角色
 * @returns
 */
export function delRole(id) {
  return request({
    url: `/api/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 新增角色
 * @param {*} data {name,description}
 * @return {*}
 */
export function addRole(data) {
  return request({
    url: '/api/sys/role',
    method: 'post',
    data
  })
}

/**
 * @description: 编辑角色
 * @param {*} data
 * @return {*}
 */
export function updateRole(data) {
  return request({
    url: `/api/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
export function getAssignRoles(params) {
  return request({
    url: '/api/sys/role',
    method: 'GET',
    params: params
  })
}
