const COSE_PLATFORM_LOGIN_STATUS = 'cose_platform_login_status'

const menuPublish = document.getElementById('menu-publish')
const submenuPublish = document.getElementById('submenu-publish')
const pluginStatus = document.getElementById('plugin-status')
const btnAccount = document.getElementById('btn-account')
const metricsRange = document.getElementById('metrics-range')
const mPublish = document.getElementById('m-publish')
const mFans = document.getElementById('m-fans')
const mPlays = document.getElementById('m-plays')
const mReads = document.getElementById('m-reads')
const mLikes = document.getElementById('m-likes')
const mFavorites = document.getElementById('m-favorites')
const canvas = document.getElementById('trend-canvas')
const tooltip = document.getElementById('chart-tooltip')

menuPublish.addEventListener('click', () => {
  submenuPublish.classList.toggle('open')
})

document.querySelectorAll('.submenu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type
    alert(`准备${type === 'video' ? '发布视频' : type === 'image' ? '发布图文' : type === 'article' ? '发布文章' : '发布动态'}`)
  })
})

document.querySelectorAll('.hero-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type
    alert(`准备${type === 'video' ? '发布视频' : type === 'image' ? '发布图文' : type === 'article' ? '发布文章' : '发布动态'}`)
  })
})

function formatDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function updateTopRight() {
  const manifest = chrome.runtime.getManifest()
  pluginStatus.textContent = `插件正常  v${manifest.version}`

  let cached = {}
  try {
    const saved = localStorage.getItem(COSE_PLATFORM_LOGIN_STATUS)
    if (saved) cached = JSON.parse(saved)
  } catch (e) {}
  const platforms = Object.values(cached)
  const loggedCount = platforms.filter(p => p && p.loggedIn).length
  btnAccount.textContent = loggedCount > 0 ? `账号信息 (${loggedCount})` : '账号信息'
}

function generateTrendData(days = 30) {
  const data = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const base = 50 + Math.random() * 150
    const noise = Math.sin(i / 4) * 80 + Math.random() * 40
    const value = Math.max(0, Math.round(base + noise))
    data.push({ date: d, value })
  }
  return data
}

function updateMetricsFromTrend(trend) {
  const totalPublish = trend.reduce((sum, p) => sum + (p.value > 0 ? 1 : 0), 0)
  mPublish.textContent = String(totalPublish)
  mFans.textContent = String(8000 + Math.floor(Math.random() * 1500))
  mPlays.textContent = `${(110000 + Math.floor(Math.random() * 30000)).toLocaleString('zh-CN')}`
  mReads.textContent = String(2000 + Math.floor(Math.random() * 1500))
  mLikes.textContent = `${(12000 + Math.floor(Math.random() * 4000)).toLocaleString('zh-CN')}`
  mFavorites.textContent = String(8000 + Math.floor(Math.random() * 3000))
}

function drawTrend(trend) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  ctx.clearRect(0, 0, w, h)

  const padding = { left: 50, right: 20, top: 20, bottom: 40 }
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom

  const maxValue = Math.max(...trend.map(p => p.value)) || 1

  ctx.strokeStyle = '#f0f0f0'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.rect(padding.left, padding.top, innerW, innerH)
  ctx.stroke()

  const points = trend.map((p, idx) => {
    const x = padding.left + (idx / (trend.length - 1)) * innerW
    const y = padding.top + innerH - (p.value / maxValue) * innerH
    return { x, y, d: p.date, v: p.value }
  })

  ctx.strokeStyle = '#1677ff'
  ctx.lineWidth = 2
  ctx.beginPath()
  points.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y)
    else ctx.lineTo(pt.x, pt.y)
  })
  ctx.stroke()

  ctx.fillStyle = 'rgba(22, 119, 255, 0.12)'
  ctx.beginPath()
  points.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y)
    else ctx.lineTo(pt.x, pt.y)
  })
  ctx.lineTo(points[points.length - 1].x, padding.top + innerH)
  ctx.lineTo(points[0].x, padding.top + innerH)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = '#8c8c8c'
  ctx.textAlign = 'center'
  ctx.font = '12px system-ui'
  const tickCount = 6
  for (let i = 0; i < tickCount; i++) {
    const idx = Math.round((i / (tickCount - 1)) * (trend.length - 1))
    const pt = points[idx]
    const label = formatDate(trend[idx].date)
    ctx.fillText(label, pt.x, h - 18)
  }

  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    let nearest = null
    let best = Infinity
    for (const pt of points) {
      const dist = Math.hypot(pt.x - mx, pt.y - my)
      if (dist < best) {
        best = dist
        nearest = pt
      }
    }
    if (nearest && best < 40) {
      tooltip.style.display = 'block'
      tooltip.style.left = `${rect.left + nearest.x}px`
      tooltip.style.top = `${rect.top + nearest.y}px`
      tooltip.textContent = `${formatDate(nearest.d)}  发布数: ${nearest.v}`
    } else {
      tooltip.style.display = 'none'
    }
  }
  canvas.onmouseleave = () => {
    tooltip.style.display = 'none'
  }
}

function init() {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - 29)
  metricsRange.textContent = `数据更新于: ${formatDate(start)}—${formatDate(now)}`

  updateTopRight()

  const trend = generateTrendData(30)
  updateMetricsFromTrend(trend)
  drawTrend(trend)
}

document.addEventListener('DOMContentLoaded', init)
