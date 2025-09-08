# 检查 dist，100 并发，检查外链
node .github/workflows/scripts/check-links.js docs/.vuepress/dist 100

# 不检查外链
node .github/workflows/scripts/check-links.js docs/.vuepress/dist 100 false

# GitHub token (访问私有仓库)
export GITHUB_TOKEN=xxx
node .github/workflows/scripts/check-links.js docs/.vuepress/dist 100
