module.exports = new Proxy({}, {
  get: (_, bin) => function (...args) {
    const out = require('child_process').spawnSync(bin, args, {...this})
    return Object.assign(new String(out.stdout), out)
  }
})
