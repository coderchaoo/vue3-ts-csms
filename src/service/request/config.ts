export const TIME_OUT =
  process.env.VUE_APP_TIME_OUT === undefined
    ? undefined
    : Number.parseInt(process.env.VUE_APP_TIME_OUT);

// let BASE_URL: string;

// /* 判断是生产环境还是开发环境方式 1 */
// if (process.env.NODE_ENV === "production") {
//   BASE_URL = "正式环境";
// } else if (process.env.NODE_ENV === "development") {
//   BASE_URL = "开发环境";
// } else {
//   BASE_URL = "测试环境";
// }

// export default BASE_URL;

/* 判断是生产环境还是开发环境方式 2，该变量查找的是.env.development或.env.production中的变量 */
export const BASE_URL = process.env.VUE_APP_BASE_URL;
