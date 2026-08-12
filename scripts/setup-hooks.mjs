/**
 * setup-hooks.mjs
 *
 * 安装 Git hooks 到 .git/hooks/ 目录。
 * 将 scripts/pre-commit 复制到 .git/hooks/pre-commit。
 *
 * 使用：node scripts/setup-hooks.mjs
 */

import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { platform } from 'node:os';

const ROOT = resolve(import.meta.dirname, '..');
const GIT_DIR = resolve(ROOT, '.git');
const HOOKS_DIR = resolve(GIT_DIR, 'hooks');
const SOURCE = resolve(ROOT, 'scripts', 'pre-commit');
const TARGET = resolve(HOOKS_DIR, 'pre-commit');

// 检查是否在 Git 仓库中
if (!existsSync(GIT_DIR)) {
  console.error('❌ 未找到 .git 目录，请确认你在 Git 仓库根目录下运行此命令。');
  process.exit(1);
}

// 确保 hooks 目录存在
if (!existsSync(HOOKS_DIR)) {
  mkdirSync(HOOKS_DIR, { recursive: true });
}

// 复制 pre-commit hook
try {
  copyFileSync(SOURCE, TARGET);
  console.log(`✅ 已安装 pre-commit hook → .git/hooks/pre-commit`);
} catch (err) {
  console.error(`❌ 安装失败: ${err.message}`);
  process.exit(1);
}

// 在 Unix 系统上设置可执行权限
if (platform() !== 'win32') {
  try {
    chmodSync(TARGET, 0o755);
  } catch {
    // chmod 失败不影响使用（在某些文件系统上可能不支持）
  }
}

console.log('');
console.log('🎉 设置完成！现在每次 commit 前都会自动检查 Markdown 图片引用路径。');
console.log('');
console.log('  如需手动运行检查：npm run check:images');
console.log('  如需卸载 hook：    rm .git/hooks/pre-commit');
