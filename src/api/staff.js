import request from '@/utils/request'

export function getStaffs() {
  return request({
    url: '/staff',
    method: 'get'
  })
}

export function getStaff(id) {
  return request({
    url: `/staff/${id}`,
    method: 'get'
  })
}

export function addStaff(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateStaff(id, data) {
  return request({
    url: `/staff/${id}`,
    method: 'put',
    data
  })
}

export function deleteStaff(id) {
  return request({
    url: `/staff/${id}`,
    method: 'delete'
  })
}
