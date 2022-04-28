import {request} from 'umi';

/** 获取统计面板数据 GET /goods/getCountArr */

export async function getCountArr() {
  return request('/goods/getCountArr', {
    method: 'GET',
    // get请求使用params配置，post请求使用data配置。
  });
}
