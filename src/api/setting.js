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
