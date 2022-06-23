const cp = require('child_process')

module.exports = new Proxy(() => {}, {
  apply: (target, thisArg, [defaults = {}]) =>
    new Proxy(defaults, {
      get: (target, bin) => function (...args) {
        const out = cp.spawnSync(bin, args, this.__proto__ === Object.prototype ? this : target)
        return Object.assign(new String(out.stdout), out)
      }
    }),
  get: (_, key) => module.exports()[key]
})
