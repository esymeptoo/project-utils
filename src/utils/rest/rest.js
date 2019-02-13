import { isAbsoluteUrl, combineUrl } from './util'
import InterceptorFactory from './interceptorFactory'

const DEFAULT_CONFIG = {
  url: '',
  method: 'GET',
  headers: {},
  cache: 'default',
  validateStatus: status => status >= 200 && status < 300,
}

const mergeConfig = (originalConfig, customConfig) => {
  const config = Object.assign({}, originalConfig, customConfig)
  config.header = Object.assign({}, originalConfig.header || {}, customConfig.header || {})
  return config
}

export default class ERest {
  constructor() {
    this.config = DEFAULT_CONFIG
    this.interceptor = {
      request: new InterceptorFactory(),
      response: new InterceptorFactory(),
    }
  }

  request(config) {
    const requestChains = []
    const responseChains = []
    const finalConfig = mergeConfig(this.config, config)
    let promise = Promise.resolve(finalConfig)
    this.interceptor.request.forEach(interceptor => {
      requestChains.push(interceptor.fulfilled, interceptor.rejected)
    })
    this.interceptor.response.forEach(interceptor => {
      responseChains.push(interceptor.fulfilled, interceptor.rejected)
    })
    const chains = [...requestChains, fetchAdapter, undefined, ...responseChains]
    while (chains.length) {
      promise = promise.then(chains.shift(), chains.shift())
    }
    return promise
  }

  get(url, config) {
    return this.request({
      url,
      method: 'GET',
      ...config,
    })
  }
  post() {}
  put() {}
  patch() {}
  delete() {}
}

const fetchAdapter = async (config) => {
  const { method, baseUrl, url, adapter } = config
  // 拼接url
  const fullUrl = baseUrl && !isAbsoluteUrl
    ? combineUrl(baseUrl, url)
    : baseUrl
  // 序列化query
  // url =
  await adapter({
    method,
    url: fullUrl,
  })
}
