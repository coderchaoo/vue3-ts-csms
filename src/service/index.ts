/**
 * @module: index
 * @author: coderchao coderchao@gmail.com
 * @description: 创建并导出自己封装的请求实例，可传入不同配置创建多个实例
 * @since: 2022-09-16 14:15
 */

import XCRequest from "./request/request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

export default new XCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  iterceptors: {
    requestInterceptorsSuccess(config) {
      // console.log("单个实例的请求成功拦截", config);
      // 携带token
      const token = localCache.getCache("token");
      if (token) {
        if (config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    requestInterceptorsError(err) {
      // console.log("单个实例的请求失败拦截", err);
      return err;
    },
    responseInterceptorsSuccess(response) {
      // console.log("单个实例的响应成功拦截", response);
      return response;
    },
    responseInterceptorsError(err) {
      // console.log("单个实例的响应失败拦截", err);
      return err;
    }
  }
});
