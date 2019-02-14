import { isObject } from './util'

export default class InterceptorFactory {
  constructor() {
    this.interceptors = []
  }

  use(...args) {
    if (isObject(args[0])) {
      this.interceptors.push(args[0])
    } else {
      this.interceptors.push({
        fulfilled: args[0],
        rejected: args[1],
      })
    }
    return this.interceptors.length - 1
  }

  forEach(fn) {
    this.interceptors
      .filter(i => i)
      .forEach(i => fn(i))
  }
}
