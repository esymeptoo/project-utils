import { isAbsoluteUrl, combineUrl, serializeUrl } from './util'
import { ALLOW_CACHE_METHODS } from './constants'
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
  constructor(customConfig) {
    this.config = DEFAULT_CONFIG
    this.cache = {}
    this.interceptor = {
      request: new InterceptorFactory(),
      response: new InterceptorFactory(),
    }
    this.setConfig(customConfig)
  }

  setConfig(config) {
    this.config = mergeConfig(this.config, config)
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
      // 这里实际是将多个interceptor通过promise的fulfilled和rejected状态一层层的包住 实现中间件的效果
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

const cache = Object.create(null)

const fetchAdapter = async (config) => {
  const { method, baseUrl, adapter } = config
  // 拼接url
  let url = baseUrl && !isAbsoluteUrl(config.url)
    ? combineUrl(baseUrl, config.url)
    : baseUrl
  // 序列化query
  url = serializeUrl(url, config.params || config.query, config.paramsSerializer)

  // 是否允许缓存
  const allowCache = ALLOW_CACHE_METHODS.includes(method)
  const cacheResponse = cache[url]
  if (allowCache && cacheResponse) {
    switch (config.cache) {
      case 'default':
        return {
          ...cacheResponse,
          usingCache: true,
        }
      case 'clear':
        delete cache[url]
        return {
          ...cacheResponse,
          using: true,
        }
      case 'no-cache':
      default: break
    }
  }

  try {
    const response = await adapter({
      method,
      url,
    })
    if (response.ok) {
      if (allowCache && !cache[url]) {
        cache[url] = response
      }
      return response
    } else {
      throw new Error(`request failed with status code ${response.status}`)
    }
  } catch (e) {
    throw e
  }
}
