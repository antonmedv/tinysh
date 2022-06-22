# tinysh

A tiny spawn wrapper for Node.js.

```js
const {ls, curl} = require('tinysh')

const list = ls('-la').trim().split('\n')

const resp = curl('https://medv.io')
```

## Usage

```sh
npm i tinysh
```

Import any binary you would like to call. Use it like a function.

```js
const {cat} = require('tinysh')

const content = cat('README.md')
```

To get exit code or stderr, use `.status` or `.stderr`.

```js
const {git} = require('tinysh')

console.log(git('pull').status)
```

To pass options to the [spawn], bind to an options object.

```js
const {tee} = require('tinysh')

tee.call({input: 'Hello, world!'}, 'file.txt')
```

## License

MIT

[spawn]: https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
