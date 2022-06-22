const cp = require('child_process')

module.exports = new Proxy(function() {}, {
  apply(target, thisArg, argArray) {
    return new Proxy(argArray[0] || {}, {
      get: (target, bin) => function (...args) {
        const self = this.__proto__ === Object.prototype ? {...this} : target
        const out = cp.spawnSync(bin, args, self)
        return Object.assign(new String(out.stdout), out)
      }
    })
  },
  get(t, key) {
    return module.exports()[key]
  }
})