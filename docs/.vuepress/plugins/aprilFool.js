// ============================================================
// 愚人节整蛊 · 魔法猫娘变身版
// ============================================================

const CONFIG = {
  enabled: true,
  enableCatGirl: true,
  replaceMap: {
    '南京理工大学': '南京航空航天大学',
    '南理工': '南京航空航天大学'
  },
  suffixList: ['喵呜', '捏', '喵', '捏', '喵~', 'nya~', '喵~', '喵', '(≧◡≦)', '(｡•̀ᴗ-)✧', 'ฅ^•ﻌ•^ฅ', 'UwU', '(๑˃̵ᴗ˂̵)و', '✧٩(ˊωˋ*)و✧'],
  catProbability: 0.3,
  storageKey: 'nuaa_magic_disabled_until',
};

// --- 工具函数 ---

const isAprilFool = () => {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 1;
};

// 检查魔法是否被暂时封印
const isMagicDisabled = () => {
  const disabledUntil = localStorage.getItem(CONFIG.storageKey);
  if (!disabledUntil) return false;
  return new Date().getTime() < parseInt(disabledUntil);
};

// 切换魔法状态
const toggleMagic = () => {
  if (isMagicDisabled()) {
    localStorage.removeItem(CONFIG.storageKey);
  } else {
    // 封印魔法 24 小时
    const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(CONFIG.storageKey, expireTime);
  }
  location.reload();
};

// --- 核心逻辑 ---

const replaceSchoolName = (text) => {
  let res = text;
  Object.entries(CONFIG.replaceMap).forEach(([k, v]) => {
    res = res.replaceAll(k, v);
  });
  return res;
};

const replacePeriodWithCat = (text) => {
  if (!CONFIG.enabled || !CONFIG.enableCatGirl || !isAprilFool()) return text;
  return text.replace(/。([\s\n\r]*)$/gm, (match, whitespace) => {
    if (Math.random() >= CONFIG.catProbability) return match;
    const suffix = CONFIG.suffixList[Math.floor(Math.random() * CONFIG.suffixList.length)];
    return suffix + whitespace;
  });
};

const processPageText = () => {
  if (isMagicDisabled() || !CONFIG.enabled || !isAprilFool() || !document.body) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node => {
        const tag = node.parentElement?.tagName;
        const forbiddenTags = ['SCRIPT', 'STYLE', 'TITLE', 'IFRAME', 'INPUT', 'TEXTAREA', 'BUTTON'];
        if (forbiddenTags.includes(tag)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest('#magic-ui-root')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(node => {
    let val = node.nodeValue;
    if (!val?.trim()) return;
    const oldVal = val;
    val = replaceSchoolName(val);
    val = replacePeriodWithCat(val);
    if (oldVal !== val) node.nodeValue = val;
  });
};

// --- UI 渲染 (可爱魔法风) ---

const injectStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    /* 浮动按钮 */
    #magic-float-btn {
      position: fixed; bottom: 30px; right: 30px; 
      padding: 12px 20px; background: #f9879eff; color: #FFFDF9; 
      border: 3px solid #FFFDF9; border-radius: 50px;
      font-family: "Microsoft YaHei", sans-serif; font-size: 14px; font-weight: bold;
      cursor: pointer; box-shadow: 0 6px 15px rgba(255, 183, 197, 0.5);
      z-index: 999999; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex; align-items: center; gap: 8px;
      
    }
    #magic-float-btn:hover { transform: scale(1.1); box-shadow: 0 8px 20px rgba(255, 183, 197, 0.6); }
    


    /* 弹窗遮罩 */
    #magic-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(255, 253, 249, 0.8); display: none;
      align-items: center; justify-content: center; z-index: 1000000;
      backdrop-filter: blur(8px);
    }
    
    /* 弹窗主体 */
    #magic-modal {
      background: #FFFDF9; border: 4px solid #f9879eff; padding: 30px; 
      border-radius: 30px; width: 340px; text-align: center; 
      color: #8B5E66; box-shadow: 0 15px 40px rgba(255, 183, 197, 0.3);
    }
    #magic-modal h3 { color: #f9879eff; margin-top: 0; font-size: 20px; }
    #magic-modal p { font-size: 15px; line-height: 1.8; margin: 15px 0; }
    
    .magic-tag { 
      display: inline-block; padding: 4px 12px; border-radius: 20px; 
      font-size: 12px; margin-bottom: 10px; background: #FFF0F3; color: #f9879eff;
    }
    
    .magic-btn-group { display: flex; gap: 12px; justify-content: center; margin-top: 25px; }
    .magic-btn {
      padding: 10px 22px; border: none; border-radius: 20px; 
      cursor: pointer; font-weight: bold; transition: 0.3s;
    }
    .magic-btn-main { background: #f9879eff; color: white; box-shadow: 0 4px 10px rgba(255, 183, 197, 0.4); }
    .magic-btn-main:hover { background: #FFA2B5; transform: translateY(-2px); }
    .magic-btn-secondary { background: #F0E6E8; color: #8B5E66; }
  `;
  document.head.appendChild(style);
};

const createUI = () => {
  if (!isAprilFool()) return;

  const isActive = !isMagicDisabled();
  const container = document.createElement('div');
  container.id = 'magic-ui-root';
  
  // 悬浮按钮
  const btn = document.createElement('div');
  btn.id = 'magic-float-btn';
  btn.innerHTML = `✨ 检测到世界线变动....`;
  btn.onclick = () => {
    document.getElementById('magic-overlay').style.display = 'flex';
  };

  // 弹窗内容
  const overlay = document.createElement('div');
  overlay.id = 'magic-overlay';
  
  const content = isActive 
    ? {
        title: " 哇！变身魔法！ ",
        desc: "由于世界线的奇妙波动，你已跌入<strong>南京航空航天大学</strong>的温柔怀抱，并被赋予了可爱的猫娘魔法捏！ฅ^•ﻌ•^ฅ",
        btnText: "解开魔法 (恢复正常)",
        tag: "当前状态：可爱猫娘形态"
      }
    : {
        title: " 回到现实了吗？ ",
        desc: "魔法已经暂时退去。想要再次跳跃回那个充满了<strong>南航</strong>气息和喵喵叫的奇妙世界吗？",
        btnText: "启动魔法 (变身猫娘)",
        tag: "当前状态：普通人类形态"
      };

  overlay.innerHTML = `
    <div id="magic-modal">
      <div class="magic-tag">${content.tag}</div>
      <h3>${content.title}</h3>
      <p>${content.desc}</p>
      <div class="magic-btn-group">
        <button class="magic-btn magic-btn-secondary" onclick="document.getElementById('magic-overlay').style.display='none'">保持现状</button>
        <button class="magic-btn magic-btn-main" id="magic-toggle-action">${content.btnText}</button>
      </div>
    </div>
  `;

  container.appendChild(btn);
  container.appendChild(overlay);
  document.body.appendChild(container);

  document.getElementById('magic-toggle-action').onclick = toggleMagic;
};

// --- 初始化 ---

let observer;
export function initAprilFool() {
  if (!CONFIG.enabled || typeof document === 'undefined') return;

  const run = () => {
    try { processPageText(); } catch (e) {}
  };

  const setup = () => {
    injectStyles();
    createUI();
    
    // 如果魔法处于激活状态，开启文字替换和动态监听
    if (!isMagicDisabled() && isAprilFool()) {
      run();
      if (!observer) {
        observer = new MutationObserver(() => setTimeout(run, 300));
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(setup, 200));
  } else {
    setTimeout(setup, 200);
  }
}