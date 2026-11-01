import { tickets } from './data.js'
import { selectTickets, summarize, csvDownloadBytes } from './ledger.js'

const state = { view: 'all', status: 'all', query: '' }
const rows = document.querySelector('#ticket-rows')
const dialog = document.querySelector('#ticket-dialog')
const html = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
const priorityClass = priority => ({ 高: 'high', 中: 'medium', 低: 'low' })[priority]
const statusClass = status => ({ 待处理: 'pending', 处理中: 'processing', 已关闭: 'closed' })[status]

function render() {
  const visible = selectTickets(tickets, state)
  document.querySelectorAll('[data-view]').forEach(button =>
    button.setAttribute('aria-selected', String(button.dataset.view === state.view)))
  rows.innerHTML = visible.map(ticket => '<tr data-ticket-id="' + html(ticket.id) + '">' +
    '<td><button class="ticket-link" data-detail="' + html(ticket.id) + '">' + html(ticket.id) + '</button>' +
    '<div class="device-name">' + html(ticket.device) + '<span>' + html(ticket.area) + '</span></div></td>' +
    '<td class="issue-cell">' + html(ticket.issue) + '</td>' +
    '<td><span class="priority ' + priorityClass(ticket.priority) + '">' + html(ticket.priority) + '优先级</span></td>' +
    '<td><span class="status ' + statusClass(ticket.status) + '"><i></i>' + html(ticket.status) + '</span></td>' +
    '<td><span class="owner-avatar">' + html(ticket.owner.slice(0, 1)) + '</span>' + html(ticket.owner) + '</td>' +
    '<td class="reported-time">' + html(ticket.reportedAt.replace('2026-', '')) + '</td>' +
    '<td><button class="detail-button" data-detail="' + html(ticket.id) + '" aria-label="查看 ' + html(ticket.id) + ' 详情">查看 <span aria-hidden="true">›</span></button></td></tr>'
  ).join('')
  document.querySelector('#result-count').textContent = '当前显示 ' + visible.length + ' 条 / 全部 ' + tickets.length + ' 条'
}

const summary = summarize(tickets)
for (const [key, value] of Object.entries(summary)) document.querySelector('#metric-' + key).textContent = value

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  state.view = button.dataset.view
  render()
}))
document.querySelector('#search').addEventListener('input', event => { state.query = event.target.value; render() })
document.querySelector('#status').addEventListener('change', event => { state.status = event.target.value; render() })
document.querySelector('#reset-button').addEventListener('click', () => {
  Object.assign(state, { view: 'all', status: 'all', query: '' })
  document.querySelector('#search').value = ''
  document.querySelector('#status').value = 'all'
  render()
})

rows.addEventListener('click', event => {
  const button = event.target.closest('[data-detail]')
  if (!button) return
  const ticket = tickets.find(item => item.id === button.dataset.detail)
  document.querySelector('#dialog-title').textContent = ticket.id + ' · ' + ticket.device
  const details = [['设备编号', ticket.deviceId], ['所属区域', ticket.area], ['异常描述', ticket.issue],
    ['优先级', ticket.priority], ['处理状态', ticket.status], ['负责人', ticket.owner],
    ['上报时间', ticket.reportedAt], ['处置备注', ticket.note]]
  document.querySelector('#ticket-details').innerHTML = details
    .map(([label, value]) => '<div><dt>' + html(label) + '</dt><dd>' + html(value) + '</dd></div>').join('')
  dialog.showModal()
})
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close())
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() })

let toastTimer
document.querySelector('#export-button').addEventListener('click', () => {
  const visible = selectTickets(tickets, state)
  const blob = new Blob([csvDownloadBytes(visible)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'equipment-exceptions.csv'
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  const toast = document.querySelector('#toast')
  toast.textContent = '已生成 ' + visible.length + ' 条记录的 CSV 文件'
  toast.hidden = false
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.hidden = true }, 3500)
})

render()
