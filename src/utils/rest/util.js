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
