const assert = require('assert/strict')
const process = require('process')
const path = require('path')
const url = require('url')
const {echo, tr, grep} = require('.')

assert.equal(echo('foo').toString(), 'foo\n')
assert.equal(tr.call({input: 'bar'}, '[a-z]', '[A-Z]').toString(), 'BAR')
assert.equal(grep('something', 'somewhere').status, 2)

assert.equal(require('.').pwd().toString().trim(), process.cwd())
assert.equal(require('.')({cwd: '/private/tmp'}).pwd().toString().trim(), '/private/tmp')

const env = npmRunPathEnv()
const {e: e_} = require('.')({env})
const {e} = require('.')
require('.').env = env

// Adapted from:
// https://github.com/sindresorhus/path-key/blob/main/index.js
// https://github.com/sindresorhus/npm-run-path/blob/main/index.js
function pathKey({env} = {}) {
  if (process.platform !== 'win32') return 'PATH'
  return Object.keys(env).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path'
}

function npmRunPath(path_ = process.env[pathKey()]) {
  const cwd = process.cwd()
  const execPath = process.execPath

  let previous
  const cwdString = cwd instanceof URL ? url.fileURLToPath(cwd) : cwd
  let cwdPath = path.resolve(cwdString)
  const result = []

  while (previous !== cwdPath) {
    result.push(path.join(cwdPath, 'node_modules/.bin'))
    previous = cwdPath
    cwdPath = path.resolve(cwdPath, '..')
  }

  // Ensure the running `node` binary is used.
  result.push(path.resolve(cwdString, execPath, '..'))

  return [...result, path_].join(path.delimiter)
}

function npmRunPathEnv() {
  const env = {...process.env}
  const path = pathKey({env})
  env[path] = npmRunPath(env[path])

  return env
}

assert.equal(e('foo').toString(), 'foo\n')
assert.equal(e_('foo').toString(), 'foo\n')