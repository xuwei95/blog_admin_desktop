import request from '@/utils/request'

export function get_user_list(params) {
  return request({
    url: '/user/list/',
    method: 'get',
    params
  })
}

export function user_config(params) {
  return request({
    url: '/user/config/',
    method: 'post',
    data: params
  })
}

export function get_article_list(params) {
  return request({
    url: '/article/',
    method: 'get',
    params
  })
}

export function add_article(params) {
  return request({
    url: '/article/',
    method: 'post',
    data: params
  })
}

export function update_article(params) {
  return request({
    url: '/article/',
    method: 'put',
    data: params
  })
}

export function delete_article(params) {
  return request({
    url: '/article/',
    method: 'delete',
    data: params
  })
}
export function get_recly_list(params) {
  return request({
    url: '/recly/',
    method: 'get',
    params
  })
}
export function recly_article(params) {
  return request({
    url: '/recly/',
    method: 'post',
    data: params
  })
}
export function get_category_list(params) {
  return request({
    url: '/category/',
    method: 'get',
    params
  })
}
export function edit_category(params) {
  return request({
    url: '/category/',
    method: 'put',
    data: params
  })
}
export function add_category(params) {
  return request({
    url: '/category/',
    method: 'post',
    data: params
  })
}
export function del_category(params) {
  return request({
    url: '/category/',
    method: 'delete',
    data: params
  })
}
export function get_comments_list(params) {
  return request({
    url: '/comments/',
    method: 'get',
    params
  })
}

export function del_comment(params) {
  return request({
    url: '/comments/',
    method: 'delete',
    data: params
  })
}

export function get_website_info(params) {
  return request({
    url: '/website/',
    method: 'get',
    params
  })
}

export function set_website_info(params) {
  return request({
    url: '/website/',
    method: 'post',
    data: params
  })
}

export function get_mail_info(params) {
  return request({
    url: '/email/',
    method: 'get',
    params
  })
}

export function set_mail_info(params) {
  return request({
    url: '/email/',
    method: 'post',
    data: params
  })
}

export function get_my_info(params) {
  return request({
    url: '/user/',
    method: 'get',
    params
  })
}

export function set_my_info(params) {
  return request({
    url: '/user/',
    method: 'post',
    data: params
  })
}

export function set_password(params) {
  return request({
    url: '/user/password/',
    method: 'post',
    data: params
  })
}

export function get_sys_info(params) {
  return request({
    url: '/sys_info/',
    method: 'get',
    params
  })
}

export function get_network_info(params) {
  return request({
    url: '/network_info/',
    method: 'get',
    params
  })
}

export function get_network_count(params) {
  return request({
    url: '/network_count/',
    method: 'get',
    params
  })
}

export function get_sys_log_list(params) {
  return request({
    url: '/sys_log/list/',
    method: 'get',
    params
  })
}

export function get_sys_log(params) {
  return request({
    url: '/sys_log/',
    method: 'get',
    params
  })
}

export function get_user_log(params) {
  return request({
    url: '/user_log/',
    method: 'get',
    params
  })
}

export function get_user_count(params) {
  return request({
    url: '/user_count/',
    method: 'get',
    params
  })
}

