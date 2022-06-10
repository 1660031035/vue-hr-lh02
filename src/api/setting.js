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
