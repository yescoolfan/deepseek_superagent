import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tickets } from '../public/data.js'
import { selectTickets, summarize, serializeCSV } from '../public/ledger.js'

test('sample records have unique identifiers and the required fields', () => {
  assert.equal(tickets.length, 6)
  assert.equal(new Set(tickets.map(ticket => ticket.id)).size, 6)
  for (const ticket of tickets) {
    for (const field of ['id', 'device', 'deviceId', 'area', 'issue', 'priority', 'status', 'owner', 'reportedAt']) {
      assert.equal(typeof ticket[field], 'string')
      assert.ok(ticket[field].length > 0)
    }
    assert.ok(['高', '中', '低'].includes(ticket.priority))
    assert.ok(['待处理', '处理中', '已关闭'].includes(ticket.status))
  }
})

test('summary counts correspond to the six sample records', () => {
  assert.deepEqual(summarize(tickets), { total: 6, pending: 3, processing: 2, closed: 1 })
  assert.deepEqual(summarize([]), { total: 0, pending: 0, processing: 0, closed: 0 })
})

test('all view returns records without changing the source data', () => {
  const original = structuredClone(tickets)
  assert.deepEqual(selectTickets(tickets).map(ticket => ticket.id), tickets.map(ticket => ticket.id))
  selectTickets(tickets, { query: '空压机', status: '待处理' })
  assert.deepEqual(tickets, original)
})

test('status selector supports each status', () => {
  assert.deepEqual(selectTickets(tickets, { status: '已关闭' }).map(ticket => ticket.id), ['WO-1004'])
  assert.equal(selectTickets(tickets, { status: '待处理' }).length, 3)
  assert.equal(selectTickets(tickets, { status: '处理中' }).length, 2)
})

test('search supports Chinese terms, case-insensitive device codes and whitespace', () => {
  assert.deepEqual(selectTickets(tickets, { query: ' 空压机 ' }).map(ticket => ticket.id), ['WO-1001', 'WO-1004'])
  assert.deepEqual(selectTickets(tickets, { query: 'pump-p02' }).map(ticket => ticket.id), ['WO-1002'])
  assert.deepEqual(selectTickets(tickets, { query: '陈工', status: '待处理' }).map(ticket => ticket.id), ['WO-1005'])
  assert.deepEqual(selectTickets(tickets, { query: '不存在的设备' }), [])
})

test('CSV serializer includes Chinese headers and only supplied rows', () => {
  const csv = serializeCSV([tickets[1]])
  assert.ok(csv.startsWith('工单编号,设备名称,设备编号,区域,异常描述,优先级,处理状态,负责人,上报时间\r\n'))
  assert.ok(csv.includes('WO-1002,冷却泵 P02,PUMP-P02'))
  assert.ok(!csv.includes('WO-1001'))
  assert.equal(csv.split('\r\n').length, 3)
})

test('CSV serializer escapes commas, quotes and line breaks', () => {
  const csv = serializeCSV([{ ...tickets[0], issue: '压力波动,请检查"出口"\n以及阀门' }])
  assert.ok(csv.includes('"压力波动,请检查""出口""\n以及阀门"'))
  assert.ok(csv.endsWith('\r\n'))
  assert.equal(serializeCSV([]).split('\r\n').length, 2)
})
