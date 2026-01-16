<template>
  <el-container style="height: 100vh">
    <el-aside width="220px" class="aside">
      <el-card class="logo" shadow="never">
        <el-avatar :size="64" src="/cose.png" />
      </el-card>
      <el-menu class="menu" :default-openeds="['publish']">
        <el-sub-menu index="publish">
          <template #title>
            <img class="icon" src="/system/article-32.png" />
            <span style="margin-left:8px">发布</span>
          </template>
          <el-menu-item index="publish:video" @click="onAction('video')">
            <img class="icon" src="/system/video-32.png" />
            <span style="margin-left:8px">发布视频</span>
          </el-menu-item>
          <el-menu-item index="publish:image" @click="onAction('image')">
            <img class="icon" src="/system/picture-32.png" />
            <span style="margin-left:8px">发布图文</span>
          </el-menu-item>
          <el-menu-item index="publish:article" @click="onAction('article')">
            <img class="icon" src="/system/article-32.png" />
            <span style="margin-left:8px">发布文章</span>
          </el-menu-item>
          <el-menu-item index="publish:status" @click="onAction('status')">
            <img class="icon" src="/system/msg-32.png" />
            <span style="margin-left:8px">发布动态</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="content">
          <img class="icon" src="/system/image-32.png" />
          <span style="margin-left:8px">内容管理</span>
        </el-menu-item>
        <el-menu-item index="records">
          <img class="icon" src="/system/article-32.png" />
          <span style="margin-left:8px">发布记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header height="64px" class="header">
        <div class="header-right">
          <el-button size="small" @click="onAdd">
            添加
          </el-button>
          <el-button size="small" @click="onSettings">
            设置
          </el-button>
          <el-tag type="success" round>插件正常 v{{ version }}</el-tag>
          <el-button size="small">
            账号信息 {{ loggedCountDisplay }}
          </el-button>
        </div>
      </el-header>

      <el-main class="main">
        <div class="hero">
          <el-button type="primary" plain @click="onAction('video')"><img class="btn-icon" src="/system/video-32.png" />发视频</el-button>
          <el-button type="primary" plain @click="onAction('article')"><img class="btn-icon" src="/system/article-32.png" />发文章</el-button>
          <el-button type="primary" plain @click="onAction('image')"><img class="btn-icon" src="/system/picture-32.png" />发图文</el-button>
          <el-button type="primary" plain @click="onAction('status')"><img class="btn-icon" src="/system/msg-32.png" />发动态</el-button>
        </div>

        <div class="metrics">
          <div class="metrics-header">
            <strong>近30天数据趋势</strong>
            <span class="range">数据更新于: {{ rangeText }}</span>
          </div>
          <div class="metrics-cards">
            <el-card shadow="never"><div class="m-name">发布数</div><div class="m-val">{{ metrics.publish }}</div></el-card>
            <el-card shadow="never"><div class="m-name">粉丝数</div><div class="m-val">{{ metrics.fans }}</div></el-card>
            <el-card shadow="never"><div class="m-name">播放数</div><div class="m-val">{{ metrics.plays }}</div></el-card>
            <el-card shadow="never"><div class="m-name">阅读数</div><div class="m-val">{{ metrics.reads }}</div></el-card>
            <el-card shadow="never"><div class="m-name">点赞数</div><div class="m-val">{{ metrics.likes }}</div></el-card>
            <el-card shadow="never"><div class="m-name">收藏数</div><div class="m-val">{{ metrics.favorites }}</div></el-card>
          </div>
        </div>

        <div class="chart-wrap">
          <canvas ref="canvasRef" width="900" height="320"></canvas>
          <div class="tooltip" ref="tooltipRef"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
</script>
const version = ref(chrome.runtime.getManifest().version)

const COSE_PLATFORM_LOGIN_STATUS = 'cose_platform_login_status'
function getLoggedCount() {
  try {
    const saved = localStorage.getItem(COSE_PLATFORM_LOGIN_STATUS)
    const obj = saved ? JSON.parse(saved) : {}
    return Object.values(obj).filter(p => p && p.loggedIn).length
  } catch { return 0 }
}
const loggedCountDisplay = computed(() => {
  const n = getLoggedCount()
  return n > 0 ? `(${n})` : ''
})

function onAdd() { }
function onSettings() { }
function onAction(type) {
  const map = { video: '发布视频', image: '发布图文', article: '发布文章', status: '发布动态' }
}

function fmt(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}
const rangeText = ref('')
const metrics = ref({ publish: 0, fans: 0, plays: '0', reads: 0, likes: '0', favorites: 0 })
const canvasRef = ref(null)
const tooltipRef = ref(null)

function genTrend(days = 30) {
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

function updateMetrics(trend) {
  const totalPublish = trend.reduce((sum, p) => sum + (p.value > 0 ? 1 : 0), 0)
  metrics.value.publish = totalPublish
  metrics.value.fans = 8000 + Math.floor(Math.random() * 1500)
  metrics.value.plays = (110000 + Math.floor(Math.random() * 30000)).toLocaleString('zh-CN')
  metrics.value.reads = 2000 + Math.floor(Math.random() * 1500)
  metrics.value.likes = (12000 + Math.floor(Math.random() * 4000)).toLocaleString('zh-CN')
  metrics.value.favorites = 8000 + Math.floor(Math.random() * 3000)
}

function drawTrend(trend) {
  const canvas = canvasRef.value
  const tooltip = tooltipRef.value
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
    const label = fmt(trend[idx].date)
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
      tooltip.textContent = `${fmt(nearest.d)}  发布数: ${nearest.v}`
    } else {
      tooltip.style.display = 'none'
    }
  }
  canvas.onmouseleave = () => { tooltip.style.display = 'none' }
}

onMounted(() => {
  const now = new Date()
  const start = new Date(now)
  start.setDate(now.getDate() - 29)
  rangeText.value = `${fmt(start)}—${fmt(now)}`

  const trend = genTrend(30)
  updateMetrics(trend)
  drawTrend(trend)
})
</script>

<style scoped>
.aside { padding: 12px; border-right: 1px solid #f0f0f0; background: #fafafa; }
.logo { margin-bottom: 12px; text-align: center; }
.menu { border-right: none; }
.header { display: flex; align-items: center; justify-content: flex-end; border-bottom: 1px solid #f0f0f0; }
.header-right { display: inline-flex; align-items: center; gap: 12px; }
.main { padding: 0; }
.hero { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px; border-bottom: 1px solid #f0f0f0; }
.metrics { padding: 16px; }
.metrics-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; }
.range { color: #8c8c8c; font-size: 12px; }
.metrics-cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.m-name { color: #8c8c8c; font-size: 12px; margin-bottom: 4px; }
.m-val { font-weight: 600; font-size: 18px; }
.chart-wrap { position: relative; padding: 0 16px 16px; }
.tooltip { position: fixed; display: none; padding: 6px 8px; font-size: 12px; background: rgba(0,0,0,0.75); color: #fff; border-radius: 4px; pointer-events: none; transform: translate(-50%, -120%); }
.icon { width: 18px; height: 18px; vertical-align: middle; }
.btn-icon { width: 20px; height: 20px; vertical-align: -3px; margin-right: 6px; }
</style>
