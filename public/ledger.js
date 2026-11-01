export function selectTickets(records, options = {}) {
  const { view = 'all', status = 'all', query = '' } = options
  const needle = query.trim().toLocaleLowerCase('zh-CN')
  return records.filter(record => {
    if (view === 'high-open' && record.priority !== '高') return false
    if (status !== 'all' && record.status !== status) return false
    if (!needle) return true
    return [record.id, record.device, record.deviceId, record.area, record.issue, record.owner]
      .some(value => value.toLocaleLowerCase('zh-CN').includes(needle))
  })
}

export function summarize(records) {
  return {
    total: records.length,
    pending: records.filter(record => record.status === '待处理').length,
    processing: records.filter(record => record.status === '处理中').length,
    closed: records.filter(record => record.status === '已关闭').length
  }
}

const columns = [
  ['工单编号', 'id'], ['设备名称', 'device'], ['设备编号', 'deviceId'],
  ['区域', 'area'], ['异常描述', 'issue'], ['优先级', 'priority'],
  ['处理状态', 'status'], ['负责人', 'owner'], ['上报时间', 'reportedAt']
]

function csvCell(value) {
  const text = String(value ?? '')
  return /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text
}

export function serializeCSV(records) {
  return [columns.map(([label]) => csvCell(label)).join(','),
    ...records.map(record => columns.map(([, key]) => csvCell(record[key])).join(','))]
    .join('\r\n') + '\r\n'
}

export function csvDownloadBytes(records) {
  const bytes = new TextEncoder().encode(serializeCSV(records))
  const content = new TextDecoder('windows-1252').decode(bytes)
  return new TextEncoder().encode(content)
}
