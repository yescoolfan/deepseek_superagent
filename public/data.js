export const tickets = [
  {
    id: 'WO-1001', device: '空压机 A01', deviceId: 'AIR-A01', area: '动力站',
    issue: '排气温度偏高', priority: '高', status: '待处理', owner: '何工',
    reportedAt: '2026-11-01 08:10', note: '巡检发现温度高于日常水平，等待安排检查。'
  },
  {
    id: 'WO-1002', device: '冷却泵 P02', deviceId: 'PUMP-P02', area: '冷却水站',
    issue: '出口压力波动', priority: '高', status: '处理中', owner: '陈工',
    reportedAt: '2026-11-01 08:25', note: '已安排检查压力传感器和出口阀门。'
  },
  {
    id: 'WO-1003', device: '输送线 CV03', deviceId: 'LINE-CV03', area: '装配车间',
    issue: '急停按钮回弹异常', priority: '高', status: '待处理', owner: '李工',
    reportedAt: '2026-11-01 08:40', note: '演练记录：等待确认按钮机构状态。'
  },
  {
    id: 'WO-1004', device: '空压机 A02', deviceId: 'AIR-A02', area: '动力站',
    issue: '油位报警', priority: '高', status: '已关闭', owner: '何工',
    reportedAt: '2026-11-01 07:30', note: '已复核油位和报警信号，记录已关闭。'
  },
  {
    id: 'WO-1005', device: '冷却泵 P01', deviceId: 'PUMP-P01', area: '冷却水站',
    issue: '密封点轻微渗漏', priority: '中', status: '待处理', owner: '陈工',
    reportedAt: '2026-11-01 09:05', note: '已记录渗漏位置，等待排定检查时间。'
  },
  {
    id: 'WO-1006', device: '输送线 CV01', deviceId: 'LINE-CV01', area: '装配车间',
    issue: '皮带跑偏', priority: '低', status: '处理中', owner: '李工',
    reportedAt: '2026-11-01 09:20', note: '正在检查张紧机构和导向轮。'
  }
]
