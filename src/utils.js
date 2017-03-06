function utils (Vue) {
  Vue.prototype.$save = function (key, value) {
    window.localStorage.setItem(key, value)
  }
  Vue.prototype.$get = function (key) {
    return window.localStorage.getItem(key)
  }
  Vue.prototype.$del = function (key) {
    window.localStorage.removeItem(key)
  }
  Vue.prototype.formateDate = function (date) {
    const now = new Date(date)
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  }
}

export default utils
