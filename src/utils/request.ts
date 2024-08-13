import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface OpInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestErrorInterceptor?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseErrorInterceptor?: (err: any) => any
}

interface OpConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: OpInterceptors<T>
}

// 拦截器
class OpRequest {
  instance: AxiosInstance
  interceptors?: OpInterceptors

  constructor(config: OpConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 创建实例时，如果有携带拦截器，则添加
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestErrorInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseErrorInterceptor
    )

    // 通用拦截器
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token') || ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        // TODO 添加一个用于错误提示的message
        return err.response
      }
    )
  }

  request<T>(config: OpConfig<T>): Promise<T> {
    return new Promise((resolve) => {
      this.instance.request<any, T>(config).then((res) => {
        resolve(res)
      })
    })
  }
}

export const commonOpReq = new OpRequest({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 10
})

export default OpRequest
