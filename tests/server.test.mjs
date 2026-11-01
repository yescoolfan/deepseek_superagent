import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'

test('local preview serves the page and modules without exposing repository files', { timeout: 10000 }, async () => {
  const child = spawn(process.execPath, [new URL('../scripts/dev-server.mjs', import.meta.url).pathname, '--port', '0'],
    { stdio: ['ignore', 'pipe', 'pipe'] })
  try {
    const origin = await new Promise((resolve, reject) => {
      let output = ''
      child.stdout.on('data', chunk => {
        output += chunk
        const match = /Local: (http:\/\/127\.0\.0\.1:\d+)/.exec(output)
        if (match) resolve(match[1])
      })
      child.once('error', reject)
      child.once('exit', code => reject(new Error('Preview exited with ' + code)))
    })
    const page = await fetch(origin)
    assert.equal(page.status, 200)
    assert.ok((await page.text()).includes('设备异常台账'))
    const module = await fetch(origin + '/ledger.js')
    assert.equal(module.status, 200)
    assert.ok(module.headers.get('content-type').includes('javascript'))
    const head = await fetch(origin, { method: 'HEAD' })
    assert.equal(head.status, 200)
    assert.equal(await head.text(), '')
    assert.equal((await fetch(origin + '/package.json')).status, 404)
    assert.equal((await fetch(origin + '/.git/config')).status, 403)
    assert.equal((await fetch(origin + '/index.html', { method: 'POST' })).status, 405)
    assert.equal((await fetch(origin + '/%E0%A4%A')).status, 400)
  } finally {
    if (child.exitCode === null) {
      const exited = once(child, 'exit')
      child.kill('SIGTERM')
      await exited
    }
  }
})
