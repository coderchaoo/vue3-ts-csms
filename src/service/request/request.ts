import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { IBaseData } from "./response-type";
import loadingInstance from "@/utils/loading";
import { ElMessage } from "element-plus";

/**
 * 拦截器类型
 */
interface IIterceptorHooks {
  requestInterceptorsSuccess?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig;
  requestInterceptorsError?: (err: any) => any;
  responseInterceptorsSuccess?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorsError?: (err: any) => any;
}

/* 自定义config，可以将自定义拦截器传入 */
interface XCRequestConfig extends AxiosRequestConfig {
  iterceptors?: IIterceptorHooks;
  isShowLoading?: boolean;
}

export default class XCRequest {
  instance: AxiosInstance;
  interceptorsHooks?: IIterceptorHooks;
  DEFAUT_IS_SHOWLOADING = false;
  isShowLoading?: boolean = this.DEFAUT_IS_SHOWLOADING;
  constructor(config: XCRequestConfig) {
    // 将axios实例赋值给XCRequest实例的instance属性
    this.instance = axios.create(config);
    // 将config中的iterceptors拦截器复制给实例的interceptorsHooks属性
    this.interceptorsHooks = config.iterceptors;
    this.setIterceptors();
    this.isShowLoading = this.DEFAUT_IS_SHOWLOADING;
    if (config.isShowLoading !== undefined) {
      this.isShowLoading = config.isShowLoading;
    }
    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例都有的请求成功的拦截", config);
        if (this.isShowLoading) {
          loadingInstance.showLoading();
        }
        return config;
      },
      (err) => {
        // console.log("所有实例都有的请求失败的拦截", err);
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例都有的响应成功的拦截", res);
        loadingInstance.close();
        console.log(
          "%c响应成功拦截器：%s",
          "color:#e88b00",
          res.config.method,
          res.config.url,
          res
        );
        if (res instanceof AxiosError) {
          ElMessage({
            message: res.response?.data ? res.response?.data : res.message,
            type: "error"
          });
          throw res;
        }
        return res.data;
      },
      (err) => {
        loadingInstance.close();
        ElMessage({
          message: err.message,
          type: "error"
        });
        // console.log("所有实例都有的响应失败的拦截", err);
        console.log("%c响应错误拦截器：%s", "color:#e88b00", err);
        return err;
      }
    );
  }

  /**
   * 设置拦截器
   */
  private setIterceptors() {
    this.instance.interceptors.request.use(
      this.interceptorsHooks?.requestInterceptorsSuccess,
      this.interceptorsHooks?.requestInterceptorsError
    );
    this.instance.interceptors.response.use(
      this.interceptorsHooks?.responseInterceptorsSuccess,
      this.interceptorsHooks?.requestInterceptorsError
    );
  }

  /* T = BaseData表示当没有传入类型时，该类型默认值为IBaseData */
  request<E = any, T = IBaseData<E>>(config: XCRequestConfig) {
    if (config.iterceptors) {
      this.interceptorsHooks = config.iterceptors;
      this.setIterceptors();
    }
    if (config.isShowLoading !== undefined) {
      this.isShowLoading = config.isShowLoading;
    }
    // 这里自己再封装一层Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
          this.isShowLoading = this.DEFAUT_IS_SHOWLOADING;
        })
        .catch((err) => {
          reject(err);
          this.isShowLoading = this.DEFAUT_IS_SHOWLOADING;
        });
    });
  }

  get<E = any, T = IBaseData<E>>(config: XCRequestConfig) {
    return this.request<E, T>({ ...config, method: "GET" });
  }

  post<E = any, T = IBaseData<E>>(config: XCRequestConfig) {
    return this.request<E, T>({ ...config, method: "POST" });
  }
}
