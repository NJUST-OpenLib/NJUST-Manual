<template>
  <Teleport to="body">
    <Transition name="fraud-modal">
      <div
        v-if="visible"
        class="fraud-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fraud-modal-title"
        @click.self="dismiss"
      >
        <div class="fraud-modal">
          <!-- 顶部警示区域 -->
          <div class="modal-header">
            <div class="warning-icon-wrapper">
              <svg
                class="warning-icon"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="icon-grad" x1="12" y1="4" x2="52" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF3B30" />
                    <stop offset="1" stop-color="#FF9500" />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="29" stroke="url(#icon-grad)" stroke-width="3.5" />
                <path
                  d="M32 18V36"
                  stroke="url(#icon-grad)"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <circle cx="32" cy="46" r="2.8" fill="url(#icon-grad)" />
              </svg>
            </div>
            <h2 id="fraud-modal-title" class="modal-title">新生安全提醒</h2>
            <p class="modal-subtitle">首次访问请务必阅读</p>
          </div>

          <!-- 正文内容 -->
          <div ref="bodyRef" class="modal-body" @scroll="onScroll">
            <div class="content-intro">
              报到当天及入学期间，可能会出现大量诈骗行为，请提高警惕：
            </div>

            <ol class="warning-list">
              <li class="warning-item">
                <span class="item-text">
                  不要向任何陌生人员提供
                  <span class="keyword-critical">身份证</span>
                  照片、号码，或
                  <span class="keyword-critical">身份证原件</span>
                  。部分人员可能会以
                  <span class="keyword-warn">"办理电话卡"</span>
                  <span class="keyword-warn">"校园业务登记"</span>
                  <span class="keyword-warn">"学生认证"</span>
                  <span class="keyword-warn">"办理空调"</span>
                  等理由索要身份证信息，请勿相信，并保管好身份证原件。
                </span>
              </li>

              <li class="warning-item">
                <span class="item-text">
                  不要
                  <span class="keyword-critical">购买陌生人员推荐的商品</span>
                  。可能有人以
                  <span class="keyword-warn">"实习任务"</span>
                  <span class="keyword-warn">"课程作业"</span>
                  <span class="keyword-warn">"校园推广"</span>
                  等理由，要求购买清洗剂、中性笔或其他商品，请勿参与。
                </span>
              </li>

              <li class="warning-item">
                <span class="item-text">
                  不要
                  <span class="keyword-critical">下载陌生软件</span>
                  ，不要关注陌生账号。任何要求
                  <span class="keyword-critical">下载 APP</span>
                  、注册账号、关注
                  <span class="keyword-warn">抖音</span>
                  /
                  <span class="keyword-warn">快手</span>
                  账号、刷任务赚积分等行为，都存在诈骗风险。
                </span>
              </li>

              <li class="warning-item">
                <span class="item-text">
                  警惕以
                  <span class="keyword-warn">"校园网"</span>
                  为名推销的电话卡。部分人员会以
                  <span class="keyword-warn">"办理校园网"</span>
                  <span class="keyword-warn">"激活上网账号"</span>
                  等话术诱导新生办卡，并称之为<span class="keyword-critical">"校园卡"</span>——这本质仍是运营商电话卡，与校园网络服务无关。
                </span>
              </li>

              <li class="warning-item">
                <span class="item-text">
                  <span class="keyword-critical">电话卡</span>
                  不是必选内容，如无需要不必办理。信息化处已提供
                  <span class="keyword-warn">低至 20 元/月</span>
                  的校园网络服务，覆盖宿舍与教室，足以满足日常学习需求。
                </span>
              </li>
            </ol>

            <div class="contact-section">
              <p class="contact-text">如遇问题，请第一时间联系新生群：</p>
              <a
                class="qq-group-button"
                href="https://qm.qq.com/q/Z1XyubZIs0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  class="qq-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879.112.484.212.97.3 1.446.05.274.095.544.133.804.02.148.04.286.055.414.012.08.02.154.029.22-.137-.012-.28-.026-.433-.042-1.762-.191-3.325-.742-4.586-1.553C3.954 21.381 2 16.943 2 12 2 6.486 6.486 2 12 2zm0 1.5c-4.687 0-8.5 3.813-8.5 8.5 0 4.398 3.028 7.964 7.104 8.466.106-.56.222-1.104.349-1.616.01-.045.022-.09.033-.133-3.66-.645-6.236-3.213-6.236-6.217 0-3.59 3.41-6.5 7.25-6.5s7.25 2.91 7.25 6.5c0 3.004-2.577 5.572-6.236 6.217.011.044.022.088.033.133.127.512.243 1.056.349 1.616C19.472 19.964 22.5 16.398 22.5 12c0-4.687-3.813-8.5-8.5-8.5z"
                  />
                </svg>
                加入官方新生群
              </a>
            </div>

            <div class="final-warning">
              请不要轻信陌生人的私聊、二维码和链接。
            </div>
          </div>

          <!-- 底部操作区 -->
          <div class="modal-footer">
            <label class="dont-show-again">
              <input v-model="dontShowAgain" type="checkbox" />
              <span>30 日内不再显示</span>
            </label>
            <button
              class="confirm-button"
              :class="{ 'confirm-button--disabled': !canConfirm }"
              :disabled="!canConfirm"
              @click="dismiss"
            >
              <template v-if="!scrolledToBottom">请滑动查看全部</template>
              <template v-else-if="countdown > 0">我已知晓，继续访问（{{ countdown }}s）</template>
              <template v-else>我已知晓，继续访问</template>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { fraudWarningConfig } from '../configs/fraudWarning'

const visible = ref(false)
const bodyRef = ref<HTMLElement | null>(null)
const scrolledToBottom = ref(false)
const countdown = ref(3)
const dontShowAgain = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const canConfirm = computed(() => scrolledToBottom.value && countdown.value <= 0)

function onScroll() {
  if (!bodyRef.value) return
  const el = bodyRef.value
  // 滚动到底部（3px 容差）
  if (el.scrollHeight - el.scrollTop - el.clientHeight < 3) {
    scrolledToBottom.value = true
  }
}

function startCountdown() {
  if (timer) return
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) { clearInterval(timer); timer = null }
    }
  }, 1000)
}

onBeforeUnmount(() => {
  if (timer) { clearInterval(timer); timer = null }
})

function hasConfirmed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(fraudWarningConfig.storageKey)
    if (!stored) return false

    const confirmedAt = parseInt(stored, 10)
    if (isNaN(confirmedAt)) return false

    if (fraudWarningConfig.expireDays <= 0) return false

    const expireMs = fraudWarningConfig.expireDays * 24 * 60 * 60 * 1000
    const now = Date.now()

    if (now - confirmedAt > expireMs) {
      // 已过期，清除记录，下次重新显示
      localStorage.removeItem(fraudWarningConfig.storageKey)
      return false
    }

    return true
  } catch {
    return false
  }
}

function dismiss() {
  visible.value = false
  if (!dontShowAgain.value) return // 未勾选则不记录，下次继续显示
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(fraudWarningConfig.storageKey, String(Date.now()))
    }
  } catch {
    // localStorage 不可用时静默失败
  }
}

onMounted(() => {
  if (!fraudWarningConfig.enabled) return
  if (!hasConfirmed()) {
    // 小幅延迟以确保 CSR hydration 完成后渲染
    requestAnimationFrame(() => {
      visible.value = true
      startCountdown() // 弹窗出现即开始 3s 倒计时
    })
  }
})
</script>

<style scoped>
/* ============================================
   遮罩层
   ============================================ */
.fraud-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transform: translateZ(0);
  will-change: opacity;
}

/* ============================================
   弹窗主体
   ============================================ */
.fraud-modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 24px;
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* ============================================
   顶部警示区域
   ============================================ */
.modal-header {
  padding: 40px 40px 20px;
  text-align: center;
  background: linear-gradient(180deg, #fff5f5 0%, #ffffff 100%);
}

.warning-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff0f0 0%, #fff6f0 100%);
  box-shadow: 0 0 0 8px rgba(255, 59, 48, 0.08);
}

.warning-icon {
  width: 44px;
  height: 44px;
}

.modal-title {
  margin: 0 0 6px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #1d1d1f;
  line-height: 1.2;
}

.modal-subtitle {
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: #86868b;
  letter-spacing: 0.01em;
}

/* ============================================
   正文内容
   ============================================ */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 40px 24px;
  font-size: 16px;
  line-height: 1.8;
  color: #3a3a3c;
}

.content-intro {
  margin-bottom: 16px;
  font-weight: 600;
  color: #1d1d1f;
  font-size: 17px;
}

.warning-list {
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
  counter-reset: warning-counter;
}

.warning-item {
  counter-increment: warning-counter;
  position: relative;
  padding-left: 32px;
  margin-bottom: 14px;
  font-size: 15px;
  line-height: 1.75;
}

.warning-item::before {
  content: counter(warning-counter);
  position: absolute;
  left: 0;
  top: 2px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff3b30;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  flex-shrink: 0;
}

.item-text {
  display: inline;
}

/* 关键词高亮 */
.keyword-critical {
  color: #d63031;
  font-weight: 600;
  background: rgba(255, 59, 48, 0.08);
  padding: 1px 5px;
  border-radius: 4px;
  white-space: nowrap;
}

.keyword-warn {
  color: #e17055;
  font-weight: 500;
  background: rgba(255, 149, 0, 0.07);
  padding: 1px 4px;
  border-radius: 4px;
  white-space: nowrap;
}

/* ============================================
   联系区域 & QQ 群按钮
   ============================================ */
.contact-section {
  margin: 20px 0 16px;
  text-align: center;
}

.contact-text {
  margin: 0 0 12px;
  font-size: 15px;
  color: #1d1d1f;
  font-weight: 500;
}

.qq-group-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #12b7f5 0%, #0a8ed9 100%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(18, 183, 245, 0.35);
}

.qq-group-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(18, 183, 245, 0.45);
}

.qq-group-button:active {
  transform: translateY(0);
}

.qq-icon {
  width: 20px;
  height: 20px;
}

/* 最后一条警示 */
.final-warning {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  color: #86868b;
  font-weight: 500;
}

/* ============================================
   底部操作区
   ============================================ */
.modal-footer {
  padding: 16px 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dont-show-again {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #86868b;
  cursor: pointer;
  user-select: none;
}
.dont-show-again input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
}

.confirm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%);
  color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.confirm-button:hover {
  background: linear-gradient(135deg, #3a3a3c 0%, #1d1d1f 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.confirm-button:active {
  transform: scale(0.985);
}

.confirm-button--disabled {
  background: #c7c7cc;
  cursor: not-allowed;
  box-shadow: none;
}
.confirm-button--disabled:hover {
  background: #c7c7cc;
  transform: none;
  box-shadow: none;
}

/* ============================================
   过渡动画
   ============================================ */
.fraud-modal-enter-active {
  transition: opacity 0.3s ease;
}
.fraud-modal-enter-active .fraud-modal {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.fraud-modal-leave-active {
  transition: opacity 0.25s ease;
}
.fraud-modal-leave-active .fraud-modal {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fraud-modal-enter-from {
  opacity: 0;
}
.fraud-modal-enter-from .fraud-modal {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}

.fraud-modal-leave-to {
  opacity: 0;
}
.fraud-modal-leave-to .fraud-modal {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}

/* ============================================
   移动端适配
   ============================================ */
@media (max-width: 640px) {
  .fraud-overlay {
    padding: 16px;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.65);
  }

  .fraud-modal {
    max-height: 85vh;
    border-radius: 20px 20px 12px 12px;
  }

  .modal-header {
    padding: 28px 24px 16px;
  }

  .warning-icon-wrapper {
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
  }

  .warning-icon {
    width: 36px;
    height: 36px;
  }

  .modal-title {
    font-size: 26px;
  }

  .modal-subtitle {
    font-size: 14px;
  }

  .modal-body {
    padding: 8px 24px 20px;
    font-size: 15px;
  }

  .content-intro {
    font-size: 15px;
  }

  .warning-item {
    font-size: 14px;
    padding-left: 28px;
    margin-bottom: 10px;
  }

  .qq-group-button {
    padding: 12px 24px;
    font-size: 15px;
  }

  .modal-footer {
    padding: 12px 24px 24px;
  }

  .confirm-button {
    font-size: 16px;
    padding: 14px 24px;
    max-width: 100%;
  }

  .fraud-modal-enter-from .fraud-modal {
    transform: scale(0.96) translateY(24px);
  }

  .fraud-modal-leave-to .fraud-modal {
    transform: scale(0.98) translateY(16px);
  }
}

/* 极小屏幕 */
@media (max-width: 380px) {
  .modal-header {
    padding: 24px 16px 12px;
  }

  .modal-body {
    padding: 4px 16px 16px;
    font-size: 14px;
  }

  .modal-title {
    font-size: 22px;
  }

  .modal-footer {
    padding: 8px 16px 20px;
  }
}
</style>
