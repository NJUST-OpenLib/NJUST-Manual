// ============================================================
// 愚人节整蛊 · 精准需求版
// 1. 校名 100% 替换
// 2. 10% 概率加喵
// 3. 句号直接被喵替换，不保留句号
// 4. 只作用在句末、换行位置
// ============================================================
const CONFIG = {
  enabled: true,
  enableCatGirl: true,

  replaceMap: {
    '南京理工大学': '南京航空航天大学',
    '南理工': '南京航空航天大学'
  },

suffixList: ['喵呜', '捏', '喵', '捏', '喵~', 'nya~', '喵~', '喵', '(≧◡≦)', '(｡•̀ᴗ-)✧', 'ฅ^•ﻌ•^ฅ', 'UwU', '(๑˃̵ᴗ˂̵)و', '✧٩(ˊωˋ*)و✧'],

  // 10% 概率替换句号为喵
  catProbability: 0.3,
};

const isAprilFool = () => {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 1;
};

// 100% 替换校名
const replaceSchoolName = (text) => {
  let res = text;
  Object.entries(CONFIG.replaceMap).forEach(([k, v]) => {
    res = res.replaceAll(k, v);
  });
  return res;
};

// 10% 概率：把句末句号替换成喵（不保留句号）
const replacePeriodWithCat = (text) => {
  if (!CONFIG.enabled || !CONFIG.enableCatGirl || !isAprilFool())
    return text;

  return text.replace(/。([\s\n\r]*)$/gm, (match, whitespace) => {
    if (Math.random() >= CONFIG.catProbability) return match;

    const suffix = CONFIG.suffixList[Math.floor(Math.random() * CONFIG.suffixList.length)];
    // 🔥 句号直接替换成喵，后面保留换行/空格
    return suffix + whitespace;
  });
};

// 遍历页面文本
const processPageText = () => {
  if (!CONFIG.enabled || !isAprilFool() || !document.body) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: node => {
        const tag = node.parentElement?.tagName;
        if (['SCRIPT', 'STYLE', 'TITLE', 'IFRAME'].includes(tag))
          return NodeFilter.FILTER_REJECT;
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

    val = replaceSchoolName(val);
    val = replacePeriodWithCat(val);

    node.nodeValue = val;
  });
};

// 初始化
let observer;
export function initAprilFool() {
  if (!CONFIG.enabled || typeof document === 'undefined') return;

  const run = () => {
    try { processPageText() } catch (e) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(run, 200));
  } else {
    setTimeout(run, 200);
  }

  // 监听动态内容
  if (!observer) {
    observer = new MutationObserver(() => setTimeout(run, 300));
    observer.observe(document.body, { childList: true, subtree: true });
  }
}