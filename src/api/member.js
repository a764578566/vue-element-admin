import request from '@/utils/request'

export function getMembers() {
  return request({
    url: '/member',
    method: 'get'
  })
}

export function getMember(id) {
  return request({
    url: `/member/${id}`,
    method: 'get'
  })
}

export function getMemberCode() {
  return request({
    url: '/member/getCode',
    method: 'get'
  })
}

export function addMember(data) {
  return request({
    url: '/member',
    method: 'post',
    data
  })
}

export function updateMember(id, data) {
  return request({
    url: `/member/${id}`,
    method: 'put',
    data
  })
}

export function deleteMember(id) {
  return request({
    url: `/member/${id}`,
    method: 'delete'
  })
}

export function putMoney(data) {
  return request({
    url: '/member/PutMoney',
    method: 'post',
    data
  })
}

export function pageList(data) {
  return request({
    url: '/member/PageList',
    method: 'post',
    data
  })
}
