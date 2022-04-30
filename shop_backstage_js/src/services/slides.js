import {request} from 'umi';

/**
 * 获取轮播图列表
 * @returns {Promise<void>}
 */
export async function getSlides(params) {
  return request('/slides/getSlidesList', {
    method: 'GET',
    params
  });
}

/**
 * 是否启用轮播图
 * @returns {Promise<void>}
 */
export async function changeSlideStatus(id, status) {
  return request('/slides/changeSlideStatus', {
    method: 'GET',
    params: {
      id,
      status
    },
  });
}


/**
 * 添加用户
 * @returns {Promise<void>}
 */
export async function addSlides(params) {
  return request('/slides/addSlides', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前商品信息
 * @returns {Promise<void>}
 */
export async function getCurrentSlideInfo(id) {
  return request('/slides/getCurrentSlideInfo', {
    method: 'GET',
    params: {
      id
    },
  });
}

/**
 * 更新用户
 * @returns {Promise<void>}
 */
export async function editSlideInfo(params) {
  return request('/slides/editSlideInfo', {
    method: 'POST',
    data: params,
  });
}
