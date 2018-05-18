import path from 'path'
import fs from 'fs'

const _paths = {
  manifestServer: path.resolve('./docs/serverbuild/asset-manifest.json'),
  manifestClient: path.resolve('./docs/build/asset-manifest.json'),
  serverBuild: './docs/serverbuild',
  build: './docs/build'
}

const readFileUTF8 = src => fs.readFileSync(src, 'utf-8')

const manifestServer = JSON.parse(readFileUTF8(_paths.manifestServer))
const manifestClient = JSON.parse(readFileUTF8(_paths.manifestClient))

const cssPathClient = path.resolve(_paths.build, manifestClient['main.css'])
const jsPathClient = path.resolve(_paths.build, manifestClient['main.js'])
const { R } = require(path.resolve(_paths.serverBuild, manifestServer['main.js']))

const mainJsClient = fs.readFileSync(jsPathClient, 'utf-8')
const mainCssClient = fs.readFileSync(cssPathClient, 'utf-8')

module.exports = {
  _paths,
  mainJsClient,
  mainCssClient,
  R
}
