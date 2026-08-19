// .github/workflows/scripts/fetch_contributors.mjs

// ============================================================
// 网站贡献者数据生成器
//
// 本脚本在每次构建前由 `predocs:build` 自动执行（npm run fetch-contributors），
// 从 GitHub 拉取仓库贡献者列表，写入 docs/.vuepress/public/contributors.json。
//
// 注意：
// - 该 JSON 是程序生成产物，**请勿手动编辑**——下次构建会被完全覆盖。
// - JSON 规范不支持注释，请勿向文件中添加 // 或 /* */ 注释，
//   否则前端 fetch('/contributors.json') 的 res.json() 解析会失败。
// - 如需调整输出字段或分页规则，改本脚本后重新构建即可。
// ============================================================

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// === 兼容 __dirname 用法 ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === 项目参数 ===
const OWNER = 'NJUST-OpenLib';
const REPO = 'NJUST-Manual';
const PER_PAGE = 100;
const OUT_FILE = path.resolve('./docs/.vuepress/public/contributors.json');

// === 加载 GitHub Token ===
const TOKEN = process.env.GITHUB_TOKEN;
const tokenStatus = TOKEN
  ? chalk.green('✅ 已检测到 GitHub Token（启用认证）')
  : chalk.yellow('⚠️ 未检测到 Token，将使用匿名 API（易限速）');

const headers = {
  Accept: 'application/vnd.github+json',
};
if (TOKEN) {
  headers.Authorization = `Bearer ${TOKEN}`;
}

// === 拉取贡献者数据 ===
async function fetchAllContributors() {
  const contributors = [];
  let page = 1;
  let requestCount = 0;

  console.log(chalk.cyan.bold('\n📦 开始从 GitHub 仓库拉取贡献者数据'));
  console.log(`🔗 项目：${OWNER}/${REPO}`);
  console.log(`🔐 Token 状态：${tokenStatus}`);
  console.log(`🔄 分页参数：每页 ${PER_PAGE} 条`);

  while (true) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=${PER_PAGE}&page=${page}`;
    console.log(chalk.gray(`→ [第 ${page} 页] 请求 URL：${url}`));
    const res = await fetch(url, { headers });
    requestCount++;

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API 请求失败：${res.status} ${text}`);
    }

    const data = await res.json();
    console.log(chalk.gray(`   ↳ 收到 ${data.length} 条贡献者数据`));
    if (data.length === 0) break;

    contributors.push(...data);
    page++;
  }

  console.log(chalk.green(`\n✅ 共获取 ${contributors.length} 名贡献者，发送 ${requestCount} 次请求\n`));
  return contributors;
}

// === 筛选字段 ===
function simplifyFields(data) {
  console.log(chalk.blueBright('🔧 正在精简字段...'));
  const keys = ['login', 'avatar_url', 'html_url', 'contributions'];
  const simplified = data.map(user => {
    const result = {};
    for (const k of keys) {
      if (user[k]) result[k] = user[k];
    }
    return result;
  });
  console.log(chalk.green(`✅ 字段精简完成，保留 ${simplified.length} 项`));
  return simplified;
}

// === 保存为 JSON 文件 ===
function saveToFile(data) {
  const outPath = path.resolve(OUT_FILE);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(chalk.magentaBright(`💾 已保存至：${outPath}`));
}

// === 主函数 ===
(async () => {
  console.log(chalk.yellow.bold('================== GitHub 贡献者列表生成器 ==================\n'));
  const startTime = new Date();
  console.log(`🕒 开始时间：${chalk.bold(startTime.toLocaleString())}\n`);

  try {
    const raw = await fetchAllContributors();
    const simplified = simplifyFields(raw);
    saveToFile(simplified);
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    console.log(chalk.greenBright(`\n🎉 所有任务完成！用时：${duration} 秒`));
  } catch (e) {
    console.error(chalk.redBright(`❌ 错误：${e.message}`));
    process.exit(1);
  }

  console.log(chalk.yellow.bold('\n============================================================\n'));
})();
