import React from 'react'
import {renderToString} from 'react-dom/server'
import fs from 'fs'
import path from 'path'
import http from 'http'
import {ServerStyleSheet} from 'styled-components'

const html = fs.readFileSync(path.resolve(process.cwd(), 'dist', 'index.html')).toString()

const imageBaseDir = path.resolve(__dirname, 'images')
const images = fs.readdirSync(imageBaseDir)
const imageSources: Record<string, string> = {}
images.forEach(name => {
  if (!name.endsWith('.svg')) return
  const fl = path.resolve(imageBaseDir, name)
  imageSources[fl] = fs.readFileSync(fl).toString()
})

require.extensions['.svg'] = (module, filename) => {
  if (imageSources[filename]) {
    module.exports = imageSources[filename]
  } else {
    console.warn(`Not cached img: ${filename}`)
    const content = fs.readFileSync(filename, 'utf8')
    imageSources[filename] = content
    module.exports = content
  }
}

import App from './App'

const server = http.createServer((req, res) => {
  const pathname = req.url
  try {
    const sheet = new ServerStyleSheet()
    const result = renderToString(sheet.collectStyles(<App initLocation={pathname} />))
    const body = html.replace('<!--ssr-->', `${sheet.getStyleTags()}\n${result}`)
    res.end(body)
  } catch (e) {
    res.statusCode = 404
    res.end(`${pathname} not found`)
  }
})

const port = 9000
server.listen(port)
// tslint:disable-next-line
console.log(`server listen on ${port}`)
