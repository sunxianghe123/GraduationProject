import {request} from 'umi';

/**
 * 获取用户列表
 * @returns {Promise<void>}
 */
export async function getUsers(params) {
  return request('/users/getUserList', {
    method: 'GET',
    params
  });
}

/**
 * 禁用和启用用户
 * @returns {Promise<void>}
 */
export async function lockUser(user_id, is_locked) {
  return request('/users/changeUserLocked', {
    method: 'GET',
    params: {
      user_id,
      is_locked
    },
  });
}

/**
 * 添加用户
 * @returns {Promise<void>}
 */
export async function addUser(params) {
  return request('/users/postRegister', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前用户信息
 * @returns {Promise<void>}
 */
export async function getCurrentUserInfo(user_id) {
  return request('/users/getCurrentUserInfo', {
    method: 'GET',
    params: {
      user_id
    },
  });
}

/**
 * 更新用户
 * @returns {Promise<void>}
 */
export async function editUser(params) {
  return request('/users/editUserInfo', {
    method: 'POST',
    data: params,
  });
}
