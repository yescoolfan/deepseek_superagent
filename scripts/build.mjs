import { cp, mkdir } from 'node:fs/promises'

const source = new URL('../public/', import.meta.url)
const target = new URL('../dist/', import.meta.url)
await mkdir(target, { recursive: true })
await cp(source, target, { recursive: true })
console.log('静态页面已生成至 dist/；源文件位于 public/。')
