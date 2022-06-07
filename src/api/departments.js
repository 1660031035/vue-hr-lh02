import request from '@/utils/request'
export function getDepartments() {
  return request({
    url: '/api/company/department',
    method: 'get',
  })
}