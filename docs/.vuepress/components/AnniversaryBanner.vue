<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import rawConfig from '../../anniversaries.json'

interface AnniversaryItem {
  month: number
  day: number
  title: string
  content?: string
  color?: string
  /** 该纪念日是否让全站变灰哀悼（图片除外） */
  gray?: boolean
}

const anniversaryConfig = rawConfig as {
  enabled: boolean
  grayEnabled: boolean
  items: AnniversaryItem[]
}

// 会话级关闭记录：点击关闭后本次会话不再显示
const CLOSED_KEY = 'njust_anniversary_banner_closed'
// 全站哀悼变灰标记，挂在 <html> 上触发全局灰色样式
const MOURNING_CLASS = 'anniv-mourning'

const active = ref<AnniversaryItem | null>(null)
const visible = ref(false)
const bannerRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

// 将横幅高度同步为主题维护的 --vp-layout-top-height 变量，
// 使固定定位的导航、侧边栏与内容区整体下移，横幅独占顶部一块而不遮挡任何内容
function applyLayoutOffset() {
  if (typeof document === 'undefined') return
  const height = bannerRef.value?.offsetHeight ?? 0
  if (height > 0) {
    document.documentElement.style.setProperty('--vp-layout-top-height', `${height}px`)
  } else {
    document.documentElement.style.removeProperty('--vp-layout-top-height')
  }
}

function clearLayoutOffset() {
  if (typeof document === 'undefined') return
  document.documentElement.style.removeProperty('--vp-layout-top-height')
}

function isClosedThisSession(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(CLOSED_KEY) === '1'
  } catch {
    return false
  }
}

function close() {
  visible.value = false
  resizeObserver?.disconnect()
  resizeObserver = null
  clearLayoutOffset()
  try {
    if (typeof window !== 'undefined') sessionStorage.setItem(CLOSED_KEY, '1')
  } catch {
    // 存储不可用时静默失败
  }
}

onMounted(async () => {
  const now = new Date()
  const match = anniversaryConfig.items.find(
    (item) => item.month === now.getMonth() + 1 && item.day === now.getDate(),
  )

  // 全站变灰（如 7·7、12·13）：独立于横幅的关闭状态，哀悼效果始终生效
  if (anniversaryConfig.grayEnabled && match?.gray) {
    document.documentElement.classList.add(MOURNING_CLASS)
  }

  if (!anniversaryConfig.enabled || isClosedThisSession() || !match) return

  active.value = match
  visible.value = true
  // 仅客户端计算日期与渲染，避免 SSR 水合不一致
  await nextTick()
  applyLayoutOffset()

  if (typeof ResizeObserver !== 'undefined' && bannerRef.value) {
    resizeObserver = new ResizeObserver(applyLayoutOffset)
    resizeObserver.observe(bannerRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  clearLayoutOffset()
  document.documentElement.classList.remove(MOURNING_CLASS)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="active && visible"
      ref="bannerRef"
      class="anniversary-banner"
      :style="active.color ? { '--banner-bg': active.color } : {}"
      role="note"
    >
      <div class="anniversary-inner">
        <span class="anniversary-date">{{ active.month }} 月 {{ active.day }} 日</span>
        <span class="anniversary-title">{{ active.title }}</span>
        <span v-if="active.content" class="anniversary-content">{{ active.content }}</span>
      </div>
      <button
        type="button"
        class="anniversary-close"
        aria-label="关闭纪念日横幅"
        @click="close"
      >
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.anniversary-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  /* 默认背景从主题品牌色 --vp-c-brand-1 自动派生深色调（随明暗主题联动）；
     如需固定颜色，可在 anniversaries.json 的 color 字段指定 */
  background: var(
    --banner-bg,
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--vp-c-brand-1) 45%, #101418),
      color-mix(in srgb, var(--vp-c-brand-1) 55%, #101418)
    )
  );
  color: #fff;
  font-size: 14px;
  line-height: 1.6;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}

.anniversary-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 8px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 14px;
  text-align: center;
}

.anniversary-close {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.anniversary-close:hover {
  background: rgba(255, 255, 255, 0.34);
}

.anniversary-date {
  display: inline-flex;
  align-items: center;
  padding: 1px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.anniversary-title {
  font-weight: 700;
  letter-spacing: 0.06em;
}

.anniversary-content {
  font-size: 13px;
}

@media (max-width: 640px) {
  .anniversary-inner {
    padding: 7px 42px;
    gap: 4px 10px;
    font-size: 13px;
  }
  .anniversary-date {
    font-size: 12px;
  }
  .anniversary-content {
    width: 100%;
    font-size: 12px;
  }
}
</style>

<!-- 全站哀悼变灰（图片除外）：
     filter 作用于父元素时会连子元素一起变灰，且子元素无法抵消；
     因此只给"不含图片/媒体"的元素单独加灰色滤镜，图片永远不在被滤镜的祖先里，天然保持彩色。
     同时排除 body/#app/.vp-layout/.vp-nav 等固定定位元素的祖先，
     避免滤镜把 fixed 元素的定位基准从视口改成祖先而错位。 -->
<style>
html.anniv-mourning *:not(body):not(#app):not(.vp-layout):not(.vp-nav):not(img):not(svg):not(picture):not(video):not(canvas):not(iframe):not(:has(img, svg, picture, video, canvas, iframe)) {
  filter: grayscale(1) !important;
}
</style>
