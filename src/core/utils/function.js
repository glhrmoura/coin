export default {
  isFunction(func) {
    return func && typeof func === 'function';
  },

  isNotFunction(func) {
    return !this.isFunction(func);
  },
};
