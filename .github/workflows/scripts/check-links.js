#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import chalk from 'chalk';
import pLimit from 'p-limit';
import http from 'http';
import https from 'https';

// ==========================
// 配置
// ==========================
const DIST_DIR = path.resolve(process.argv[2] || 'docs/.vuepress/dist');
const concurrency = parseInt(process.argv[3]) || 100;
const CHECK_EXTERNAL = process.argv[4] !== 'false';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

const httpAgent = new http.Agent({ keepAlive: true, maxSockets: concurrency });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: concurrency });

// ==========================
// 工具函数
// ==========================
function getAllHtmlFiles(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) results = results.concat(getAllHtmlFiles(fullPath));
    else if (file.endsWith('.html')) results.push(fullPath);
  }
  return results;
}

function buildFileTree(dir) {
  const entries = fs.readdirSync(dir);
  const tree = [];
  for (const file of entries) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      tree.push({ name: file, path: fullPath, children: buildFileTree(fullPath) });
    } else if (file.endsWith('.html')) {
      tree.push({ name: file, path: fullPath, children: [] });
    }
  }
  return tree;
}

function printFileTree(tree, brokenFiles = new Set(), prefix = '') {
  for (const node of tree) {
    const isBroken = brokenFiles.has(node.path);
    const symbol = node.children.length > 0 ? '📁' : '📄';
    const color = isBroken ? chalk.red : chalk.gray;
    console.log(color(`${prefix}${symbol} ${node.name}`));
    if (node.children.length > 0) {
      printFileTree(node.children, brokenFiles, prefix + '\t');
    }
  }
}

const linkCache = new Map();

async function checkLink(link, file) {
  if (!link) return null;
  if (link.startsWith('mailto:') || link.startsWith('tel:')) return null;

  const rawLink = link.split('#')[0].split('?')[0];
  const decodedLink = decodeURIComponent(rawLink);

  // 内部链接
  if (decodedLink.startsWith('/') || decodedLink.startsWith('.')) {
    const base = decodedLink.startsWith('/') ? DIST_DIR : path.dirname(file);
    const target = path.join(base, decodedLink);
    if (
      fs.existsSync(target) ||
      fs.existsSync(target + '.html') ||
      fs.existsSync(path.join(target, 'index.html'))
    ) {
      return null;
    }
    return { file, link, status: 'internal-fail' };
  }

  // 外部链接
  if (/^https?:\/\//.test(link)) {
    if (!CHECK_EXTERNAL) return null;
    if (linkCache.has(link)) return linkCache.get(link);
    try {
      const headers = {};
      if (GITHUB_TOKEN && link.includes('github.com')) headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      const res = await axios.get(link, {
        timeout: 7000,
        maxRedirects: 5,
        headers,
        httpAgent,
        httpsAgent,
        validateStatus: () => true,
      });
      let status = null;
      if (res.status === 404) status = 'external-404';
      if (status) {
        const result = { file, link, status };
        linkCache.set(link, result);
        return result;
      }
      return null;
    } catch {
      const result = { file, link, status: 'external-timeout' };
      linkCache.set(link, result);
      return result;
    }
  }

  return null;
}

// ==========================
// 主函数
// ==========================
async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.log(chalk.red(`目录不存在: ${DIST_DIR}`));
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(chalk.blue(`📄 找到 ${htmlFiles.length} 个 HTML 文件`));

  const fileTree = buildFileTree(DIST_DIR);
  const limit = pLimit(concurrency);
  const brokenLinks = [];
  const brokenFiles = new Set();

  const tasks = [];

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(content);
    const links = [...dom.window.document.querySelectorAll('a')].map(a => a.getAttribute('href'));
    for (const link of links) {
      tasks.push(limit(async () => {
        const result = await checkLink(link, file);
        if (!result) return;
        brokenLinks.push(result);
        brokenFiles.add(result.file);
      }));
    }
  }

  await Promise.all(tasks);

  // =====================
  // 文件树
  // =====================
  console.log(chalk.blue('\n📂 文件树（红色为有问题的文件）:'));
  printFileTree(fileTree, brokenFiles);

  // =====================
  // 汇总表格输出
  // =====================
  if (brokenLinks.length > 0) {
    console.log(chalk.red('\n🚨 有问题的链接:'));
    console.log(chalk.yellow('文件路径\t\t\t链接\t\t\t类型'));
    for (const link of brokenLinks) {
      const relativeFile = path.relative(DIST_DIR, link.file);
      let statusStr = '';
      switch (link.status) {
        case 'internal-fail': statusStr = '内部不存在 ❌'; break;
        case 'external-404': statusStr = '外部404 ×'; break;
        case 'external-timeout': statusStr = '外部超时 ?'; break;
      }
      console.log(`${relativeFile}\t${link.link}\t${statusStr}`);
    }
  } else {
    console.log(chalk.green('\n🎉 所有链接均有效'));
  }

  const internalFails = brokenLinks.filter(l => l.status === 'internal-fail').length;
  const external404s = brokenLinks.filter(l => l.status === 'external-404').length;
  const externalTimeouts = brokenLinks.filter(l => l.status === 'external-timeout').length;

  console.log(chalk.red(`\n❌ 内部文件不存在：${internalFails}`));
  console.log(chalk.red(`× 外部 404 链接：${external404s}`));
  console.log(chalk.yellow(`? 外部超时/请求失败: ${externalTimeouts}`));

  if (internalFails + external404s > 0) process.exit(1);
}

main();
