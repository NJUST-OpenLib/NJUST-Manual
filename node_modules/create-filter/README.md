# createFilter

Constructs a filter function which can be used to determine whether or not certain modules should be operated upon.

> Fork for [rollup](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter)

## Install

```sh
# npm
npm i create-filter
# yarn
yarn add create-filter
# pnpm
pnpm add create-filter
```

## Usage

```ts
import createFilter from 'create-filter'

const filter = createFilter(['**/*.js'], ['**/__test__/**'], {
  resolve: true
})

const isSource = filter('src/index.js')
```

## `createFilter(include, exclude, options)`

### include and exclude

Type: `String | RegExp | Array[...String|RegExp]`

A valid [picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern, or array of patterns. If `options.include` is omitted or has zero length, filter will return true by default. Otherwise, an ID must match one or more of the `picomatch` patterns, and must not match any of the `options.exclude` patterns.

Note that `picomatch` patterns are very similar to [minimatch](https://github.com/isaacs/minimatch#readme) patterns, and in most use cases, they are interchangeable. If you have more specific pattern matching needs, you can view [this comparison table](https://github.com/micromatch/picomatch#library-comparisons) to learn more about where the libraries differ.

### options

**`resolve`**

Type: `String | Boolean | null`

Optionally resolves the patterns against a directory other than `process.cwd()`. If a `String` is specified, then the value will be used as the base directory. Relative paths will be resolved against `process.cwd()` first. If `false`, then the patterns will not be resolved against any directory. This can be useful if you want to create a filter for virtual module names.
