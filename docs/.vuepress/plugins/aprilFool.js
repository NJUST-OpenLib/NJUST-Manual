// ============================================================
//  愚人节整蛊插件
//  关闭方式：注释掉 client.ts 中的 initAprilFool() 那一行
// ============================================================

const ENABLED = true                        // 👈 总开关
const TARGETS = ['南京理工大学', '南理工']   // 👈 要替换的词
const REPLACEMENT = '南京航空航天大学'       // 👈 替换成什么
const SECRET = '智周万物道济天下'            // 👈 解除口令
const HINT = ``          // 👈 给用户的提示，不想透露改这里

// ------------------------------------------------------------

let active = false
let observer = null

function isAprilFool() {
  const now = new Date()
  return now.getMonth() === 3 && now.getDate() === 1  // 月份从0开始，3=4月
}
function replaceTitle(forward ) {
  let t = document.title || ''
  if (forward) {
    TARGETS.forEach(k => { t = t.replaceAll(k, REPLACEMENT) })
  } else {
    t = t.replaceAll(REPLACEMENT, TARGETS[0])
  }
  document.title = t
}
function replaceText(forward) {
  replaceTitle(forward)
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes = []
  let node
  while ((node = walker.nextNode())) nodes.push(node)
  nodes.forEach(n => {
    let v = n.nodeValue || ''
    if (forward) {
      TARGETS.forEach(t => { v = v.replaceAll(t, REPLACEMENT) })
    } else {
      v = v.replaceAll(REPLACEMENT, TARGETS[0])
    }
    if (n.nodeValue !== v) n.nodeValue = v
  })
}

function showButton() {
  if (document.getElementById('april-fool-btn')) return

  const style = document.createElement('style')
  style.id = 'april-fool-style'
  style.textContent = `
    #april-fool-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      padding: 8px 16px; background: #e8302a; color: #fff;
      border: none; border-radius: 20px; font-size: 13px;
      cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      opacity: 0.85; font-family: sans-serif; transition: opacity .2s;
    }
    #april-fool-btn:hover { opacity: 1; }
  `
  document.head.appendChild(style)

  const btn = document.createElement('button')
  btn.id = 'april-fool-btn'
  btn.textContent = '✦ 解除幻觉'
  btn.addEventListener('click', () => {
    const input = prompt(`🎭 愚人节快乐！\n\n请输入解除口令（${HINT}）：\n\n口令：${SECRET}`)
    if (input === null) return
    if (input.trim() === SECRET) {
      active = false
      replaceText(false)
      btn.remove()
      document.getElementById('april-fool-style')?.remove()
      observer?.disconnect()
      alert('幻觉已解除，欢迎回到南京理工大学 🎓')
    } else {
      alert('口令错误，幻觉继续～')
    }
  })
  document.body.appendChild(btn)
}

export function initAprilFool() {
  if (!ENABLED || typeof window === 'undefined') return
  if (!isAprilFool()) return   // 👈 非4月1日直接退出

  active = true
  observer = new MutationObserver(() => {
    if (active) replaceText(true)
  })

  const setup = () => {
    replaceText(true)
    showButton()
    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup)
  } else {
    setTimeout(setup, 300)
  }
}