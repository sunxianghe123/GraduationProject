import {request} from 'umi';

/**
 * 获取商品列表
 * @returns {Promise<void>}
 */
export async function getGoods(params) {
  return request('/goods/getGoodsList', {
    method: 'GET',
    params
  });
}

/**
 * 是否上架商品
 * @returns {Promise<void>}
 */
export async function lockGood(id, is_on) {
  return request('/goods/changeGoodOn', {
    method: 'GET',
    params: {
      id,
      is_on
    },
  });
}

/**
 * 是否推荐商品
 * @returns {Promise<void>}
 */
export async function isRecommendGood(id, is_recommend) {
  return request('/goods/changeGoodRecommend', {
    method: 'GET',
    params: {
      id,
      is_recommend
    },
  });
}

/**
 * 添加用户
 * @returns {Promise<void>}
 */
export async function addGoods(params) {
  return request('/goods/addGoods', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前商品信息
 * @returns {Promise<void>}
 */
export async function getCurrentGoodInfo(id) {
  return request('/goods/getCurrentGoodInfo', {
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
export async function editGoodInfo(params) {
  return request('/goods/editGoodInfo', {
    method: 'POST',
    data: params,
  });
}
