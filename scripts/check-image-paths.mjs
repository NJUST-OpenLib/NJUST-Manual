/**
 * check-image-paths.mjs
 *
 * 检查 docs/ 下所有 Markdown 文件中的图片引用路径是否符合规范。
 *
 * 规则：
 *   A) ![](static/...) —— 缺少 ./ 前缀，Vite/Rolldown 会将其误认为裸模块导入导致构建失败
 *   B) 本地图片引用（./、../）指向的文件在磁盘上不存在
 *   C) <img src="static/..." —— HTML 标签中同样缺少 ./ 前缀
 *
 * 退出码：0 = 通过  1 = 发现问题
 *
 * 使用：node scripts/check-image-paths.mjs
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, resolve, extname } from 'node:path';

// -------- 配置 --------
const DOCS_DIR = resolve(import.meta.dirname, '..', 'docs');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico', '.pdf']);

// -------- 文件收集 --------

/**
 * 递归收集指定目录下所有 .md 文件
 */
function collectMarkdownFiles(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      let stat;
      try { stat = statSync(fullPath); } catch { continue; }
      if (stat.isDirectory()) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;
        results.push(...collectMarkdownFiles(fullPath));
      } else if (stat.isFile() && extname(entry) === '.md') {
        results.push(fullPath);
      }
    }
  } catch { /* 目录不可读 */ }
  return results;
}

// -------- 正则 --------

/** 匹配 ![](static/...) 或 [text](static/...) —— 缺少 ./ 或 ../ 前缀 */
const RE_BARE_STATIC = /\]\(\s*(static\/)/;

/** 匹配 <img src="static/..." 或 src='static/...' */
const RE_IMG_BARE_STATIC = /<img\b[^>]*\bsrc\s*=\s*["'](static\/)/i;

/** 匹配 HTML img src 属性，捕获完整路径 */
const RE_IMG_SRC = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

// -------- Markdown 引用提取（正确处理括号） --------

/**
 * 从一行文本中提取所有 Markdown 图片/链接引用。
 * 正确处理 URL 中包含括号的情况（如 foo(1).jpg）。
 *
 * 返回 [{alt, url, index}] 数组，index 为 `!` 或 `[` 在行中的位置。
 */
function extractMarkdownRefs(line) {
  const refs = [];
  // 查找所有 `![` 或 `[`（非 ! 前缀的普通链接）
  const linkStartRe = /!?\[/g;
  let m;

  while ((m = linkStartRe.exec(line)) !== null) {
    const bracketStart = m.index;
    const isImage = line[bracketStart] === '!';
    const altStart = bracketStart + (isImage ? 2 : 1);

    // 找到匹配的 ]
    let depth = 1;
    let altEnd = -1;
    for (let i = altStart; i < line.length; i++) {
      if (line[i] === '[') depth++;
      else if (line[i] === ']') {
        depth--;
        if (depth === 0) { altEnd = i; break; }
      }
    }
    if (altEnd === -1) continue;

    // 检查 ] 后面是否紧跟 (
    let j = altEnd + 1;
    while (j < line.length && line[j] === ' ') j++;
    if (j >= line.length || line[j] !== '(') continue;

    // 找到匹配的 )，正确处理 URL 中的嵌套括号
    const parenOpen = j;
    depth = 1;
    let parenClose = -1;
    for (let k = parenOpen + 1; k < line.length; k++) {
      if (line[k] === '(') depth++;
      else if (line[k] === ')') {
        depth--;
        if (depth === 0) { parenClose = k; break; }
      }
    }
    if (parenClose === -1) continue;

    const url = line.slice(parenOpen + 1, parenClose).trim();
    // 去掉可能的 title 属性（如 "title"）
    const urlOnly = url.split(/\s+/)[0];

    refs.push({
      isImage,
      url: urlOnly,
      index: bracketStart,
    });
  }

  return refs;
}

// -------- 辅助函数 --------

function isExternalUrl(p) {
  return /^https?:\/\//i.test(p) || p.startsWith('//');
}

/**
 * 检查路径是否指向图片文件（通过扩展名判断）
 */
function isImagePath(p) {
  const ext = extname(p).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

/**
 * 尝试解析文件路径，支持 URL 编码字符的多种形式。
 * 例如 markdown 中写的是 foo%20(1).jpg，但实际文件可能是 "foo (1).jpg"
 */
function resolveFilePath(baseDir, refPath) {
  // 先尝试直接解析
  const direct = resolve(baseDir, refPath);
  if (existsSync(direct)) return direct;

  // 尝试 URL 解码（%20 → 空格等）
  try {
    const decoded = decodeURIComponent(refPath);
    const decodedResolved = resolve(baseDir, decoded);
    if (existsSync(decodedResolved)) return decodedResolved;
  } catch {
    // decodeURIComponent 可能对不合法的 % 序列抛出异常
  }

  return null;
}

// -------- Frontmatter / 代码块追踪 --------

class LineExtractor {
  #inCodeBlock = false;
  #inFrontmatter = false;
  #frontmatterDone = false;

  feed(line) {
    const trimmed = line.trim();

    if (!this.#frontmatterDone) {
      if (trimmed === '---') {
        this.#inFrontmatter = !this.#inFrontmatter;
        if (!this.#inFrontmatter) this.#frontmatterDone = true;
        return false;
      }
      if (this.#inFrontmatter) return false;
      this.#frontmatterDone = true;
    }

    if (trimmed.startsWith('```')) {
      this.#inCodeBlock = !this.#inCodeBlock;
      return false;
    }
    if (this.#inCodeBlock) return false;

    return true;
  }
}

// -------- 问题收集器 --------

class IssueCollector {
  constructor() {
    this.errors = [];
  }

  error(file, line, message) {
    this.errors.push({ file, line, message });
  }

  hasErrors() {
    return this.errors.length > 0;
  }
}

// -------- 检查单个文件 --------

function checkFile(filePath, issues) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileDir = dirname(filePath);
  const relativePath = relative(DOCS_DIR, filePath);

  const extractor = new LineExtractor();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    if (!extractor.feed(line)) continue;

    // ---- 规则 A：![](static/...) 缺少 ./ 前缀 ----
    const bareMatch = line.match(RE_BARE_STATIC);
    if (bareMatch) {
      issues.error(
        relativePath,
        lineNo,
        `缺少 "./" 前缀："${bareMatch[1]}..." 应写为 "./${bareMatch[1]}..."（否则 Vite 构建会失败）`
      );
    }

    // ---- 规则 C：<img src="static/..." 缺少 ./ 前缀 ----
    const imgBareMatch = line.match(RE_IMG_BARE_STATIC);
    if (imgBareMatch) {
      issues.error(
        relativePath,
        lineNo,
        `缺少 "./" 前缀：src="${imgBareMatch[1]}..." 应写为 src="./${imgBareMatch[1]}..."（否则生产构建会失败）`
      );
    }

    // ---- 规则 B：本地图片存在性检查 ----
    // 检查 markdown 引用
    for (const ref of extractMarkdownRefs(line)) {
      const { url } = ref;
      if (isExternalUrl(url)) continue;
      if (url.startsWith('/')) continue;

      // 只检查以 ./ 或 ../ 开头的本地路径
      if (!url.startsWith('./') && !url.startsWith('../')) continue;
      // 只检查图片文件
      if (!isImagePath(url)) continue;

      const resolved = resolveFilePath(fileDir, url);
      if (!resolved) {
        issues.error(
          relativePath,
          lineNo,
          `引用的图片不存在："${url}"`
        );
      }
    }

    // 检查 <img> 标签
    let imgMatch;
    RE_IMG_SRC.lastIndex = 0;
    while ((imgMatch = RE_IMG_SRC.exec(line)) !== null) {
      const srcPath = imgMatch[1];
      if (isExternalUrl(srcPath) || srcPath.startsWith('/')) continue;
      if (!srcPath.startsWith('./') && !srcPath.startsWith('../')) continue;
      if (!isImagePath(srcPath)) continue;

      const resolved = resolveFilePath(fileDir, srcPath);
      if (!resolved) {
        issues.error(
          relativePath,
          lineNo,
          `引用的图片不存在：src="${srcPath}"`
        );
      }
    }
  }
}

// -------- 入口 --------

function main() {
  console.log('🔍 检查 Markdown 图片引用路径...\n');

  const files = collectMarkdownFiles(DOCS_DIR);

  if (files.length === 0) {
    console.log('⚠️  未找到 Markdown 文件');
    process.exit(0);
  }

  const issues = new IssueCollector();

  for (const file of files) {
    checkFile(file, issues);
  }

  if (issues.hasErrors()) {
    console.log(`❌ 发现 ${issues.errors.length} 个错误：\n`);
    for (const err of issues.errors) {
      console.log(`  ${err.file}:${err.line}  ${err.message}`);
    }
    console.log('');
    console.log('💡 修复提示：将 ![](static/xxx.jpg) 改为 ![](./static/xxx.jpg)');
    console.log('   将 <img src="static/..." 改为 <img src="./static/..."');
    process.exit(1);
  }

  console.log(`✅ 检查通过 —— 扫描了 ${files.length} 个文件，未发现问题。`);
  process.exit(0);
}

main();
