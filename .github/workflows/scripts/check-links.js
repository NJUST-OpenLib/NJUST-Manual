#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const defaultPaths = [
  'docs/.vuepress/dist',
  '.vuepress/dist'
];

const inputPath = process.argv[2];
let DIST_DIR;

if (inputPath) {
  DIST_DIR = path.resolve(inputPath);
} else {
  DIST_DIR = defaultPaths.map(p => path.resolve(p)).find(p => fs.existsSync(p));
}

if (!DIST_DIR || !fs.existsSync(DIST_DIR)) {
  console.error('❌ 找不到构建目录，请先运行 `npm run build` 或指定路径，例如:');
  console.error('   node check-links.js docs/.vuepress/dist');
  process.exit(1);
}

console.log(`🔍 正在检查目录: ${DIST_DIR}`);

const brokenLinks = [];

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

async function checkLink(link, file) {
  try {
    if (!link || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
      return;
    }

    process.stdout.write(`   → 检查链接: ${link}\r`);

    if (link.startsWith('/')) {
      let target = path.join(DIST_DIR, link);
      if (fs.existsSync(target) || fs.existsSync(target + '.html') || fs.existsSync(path.join(target, 'index.html'))) {
        return;
      } else {
        brokenLinks.push({ file, link, reason: '本地文件不存在' });
      }
    } else if (/^https?:\/\//.test(link)) {
      const res = await fetch(link, { method: 'HEAD' });
      if (!res.ok) {
        brokenLinks.push({ file, link, reason: `HTTP ${res.status}` });
      }
    } else {
      let target = path.join(path.dirname(file), link);
      if (fs.existsSync(target)) return;
      if (fs.existsSync(target + '.html')) return;
      if (fs.existsSync(path.join(target, 'index.html'))) return;

      brokenLinks.push({ file, link, reason: '相对路径不存在' });
    }
  } catch (err) {
    brokenLinks.push({ file, link, reason: err.message });
  }
}

async function main() {
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  console.log(`📄 找到 ${htmlFiles.length} 个 HTML 文件`);

  for (const file of htmlFiles) {
    console.log(`\n➡️ 正在检查文件: ${path.relative(DIST_DIR, file)}`);
    const content = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(content);
    const links = [...dom.window.document.querySelectorAll('a')].map(a => a.getAttribute('href'));
    for (const link of links) {
      await checkLink(link, file);
    }
  }

  console.log('\n✅ 检查完成！');
  if (brokenLinks.length > 0) {
    console.log('❌ 检测到以下无效链接:');
    brokenLinks.forEach(b => {
      console.log(`文件: ${path.relative(DIST_DIR, b.file)} -> 链接: ${b.link} (${b.reason})`);
    });
    process.exit(1);
  } else {
    console.log('🎉 所有链接均有效');
  }
}

main();
