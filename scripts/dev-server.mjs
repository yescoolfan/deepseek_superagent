import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, sep, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const index = process.argv.indexOf('--port')
const port = index === -1 ? 18780 : Number(process.argv[index + 1])
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('端口必须是 0–65535 的整数。')
const root = fileURLToPath(new URL('../public/', import.meta.url))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' }

const server = createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed')
    return
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname)
    const filename = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname))
    if (!filename.startsWith(resolve(root) + sep) || /(^|\/)\./.test(pathname)) {
      response.writeHead(403).end('Forbidden')
      return
    }
    if (!(await stat(filename)).isFile()) {
      response.writeHead(404).end('Not found')
      return
    }
    response.setHeader('Content-Type', types[extname(filename)] ?? 'application/octet-stream')
    const bytes = await readFile(filename)
    response.writeHead(200, { 'Content-Length': bytes.length })
    response.end(request.method === 'HEAD' ? undefined : bytes)
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end('Not found')
  }
})

server.on('error', error => { console.error(error.message); process.exitCode = 1 })
server.listen(port, '127.0.0.1', () => {
  console.log('设备异常台账 · 仅监听本机')
  console.log('Local: http://127.0.0.1:' + server.address().port)
  console.log('Source: ' + root)
})
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
