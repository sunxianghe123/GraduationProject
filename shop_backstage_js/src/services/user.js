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
