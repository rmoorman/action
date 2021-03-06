/* cwd needs to be project root */
const fs = require('fs')
const webpack = require('webpack')
const config = require('./webpack.config.dll.js')
const crypto = require('crypto')
const path = require('path')
const scriptName = path.basename(__filename)

const CACHE_HASH_FN = 'dll/yarn.lock.md5'

let cacheHash
try {
  cacheHash = fs.readFileSync(CACHE_HASH_FN, 'utf8')
} catch (e) {
  cacheHash = ''
}

const lockfile = fs.readFileSync('yarn.lock', 'utf8')

const hash = crypto
  .createHash('md5')
  .update(lockfile)
  .digest('hex')
if (hash !== cacheHash) {
  webpack(config, () => {
    console.log(`${scriptName}: DLL created`)
  })
  if (!fs.existsSync('dll')) {
    fs.mkdirSync('dll')
  }
  fs.writeFileSync(CACHE_HASH_FN, hash)
} else {
  console.log(`${scriptName}: using cached DLL`)
}
