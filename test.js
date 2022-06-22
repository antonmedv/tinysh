const assert = require('assert/strict')
const {echo, tr, grep} = require('.')

assert.equal(echo('foo').toString(), 'foo\n')
assert.equal(tr.call({input: 'bar'}, '[a-z]', '[A-Z]').toString(), 'BAR')
assert.equal(grep('something', 'somewhere').status, 2)
