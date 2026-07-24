const FunctionUtil = {
  isFunction(func: unknown): func is (...args: never[]) => unknown {
    return typeof func === 'function'
  },

  isNotFunction(func: unknown) {
    return !this.isFunction(func)
  },
}

export default FunctionUtil
