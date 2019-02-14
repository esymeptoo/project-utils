import { stringify } from 'query-string'

const toString = Object.prototype.toString

export function isAbsoluteUrl(url) {
  return url.indexOf('http') > -1
}

export function combineUrl(baseUrl, path) {
  return baseUrl.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '')
}

export function isObject(o) {
  return toString.call(o) === '[Object Object]'
}

export function isUrlSearchParams(val) {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function serializeUrl(url, params, paramsSerializer) {
  if (!params) return url
  let searchString
  if (paramsSerializer) {
    searchString = paramsSerializer(params)
  } else if (isUrlSearchParams(params)) {
    searchString = params.toString()
  } else {
    searchString = stringify(params, { encode: false })
  }

  if (searchString) {
    url += (URL.indexOf('?') > -1 ? '&' : '?') + searchString
  }
  return url
}
