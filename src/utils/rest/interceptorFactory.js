import { isObject } from './util'

export default class InterceptorFactory {
  constructor() {
    this.Interceptors = []
  }

  use(...args) {
    if (isObject(args[0])) {
      this.Interceptors.push(args[0])
    } else {
      this.Interceptors.push({
        fulfilled: args[0],
        rejected: args[1],
      })
    }
    return this.Interceptors.length - 1
  }
}
