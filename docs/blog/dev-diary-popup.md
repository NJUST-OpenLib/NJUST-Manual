---
title: 开发日记：首页弹窗配置指南
createTime: 2026/07/22 00:00:00
permalink: /dev/guide-popup.html
---

本指南面向后续维护者，介绍站点中两处弹窗的控制方式和修改方法。

## 一、首页右上角公告板（Bulletin）

由 VuePress Plume 主题内置的 `bulletin` 功能实现，显示在页面右上角。

### 控制开关与布局

配置文件：[plume.config.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/plume.config.ts)

```ts
bulletin: {
    layout: 'top-right',        // 弹窗位置：右上角
    contentType: 'markdown',
    title: '站点公告 ',
    contentFile: path.join(__dirname, '_bulletin.md'),
},
```

- **关闭**：注释掉或删除整个 `bulletin` 配置块即可。
- **换位置**：修改 `layout` 字段（如 `top-left`、`bottom-right` 等）。

### 修改内容

编辑 [_bulletin.md](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/_bulletin.md)：

```md
新生必读！常见问题汇总
2026 新生群
请小心诈骗！反诈骗指南
---
如果您喜欢本站，请支持我们
如遇到问题请提交 ISSUE
```

纯 Markdown 格式，`---` 为分隔线。每年更新新生群链接时记得同步修改此文件中的 QQ 群链接。

---

## 二、防诈骗首次访问警示弹窗（FraudWarningModal）

全屏毛玻璃遮罩弹窗，用户首次访问时自动弹出，点击确认后 180 天内不再显示。

### 文件清单

| 文件 | 用途 |
|------|------|
| [FraudWarningModal.vue](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/components/FraudWarningModal.vue) | Vue3 组件，含模板、逻辑与样式 |
| [fraudWarning.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/configs/fraudWarning.ts) | 独立配置文件 |
| [client.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/client.ts) | 根组件挂载（`rootComponents: [FraudWarningModal]`） |

### 快速关闭（紧急情况）


编辑 `configs/fraudWarning.ts`：

```ts
export const fraudWarningConfig = {
  enabled: false,    // ← 改为 false，弹窗立即消失
  storageKey: 'njust_fraud_warning_confirmed',
  expireDays: 180,
}
```

无需重新构建组件，只改这一行即可。

### 修改提示文字

编辑 `FraudWarningModal.vue` 的 `<template>` 部分。正文位于 `<div class="modal-body">` 区域内，结构如下：

```html
<ol class="warning-list">
  <li class="warning-item">
    <!-- 第一条警示 -->
    <span class="keyword-critical">身份证</span>   <!-- 红色高亮关键词 -->
    <span class="keyword-warn">"办理电话卡"</span>  <!-- 橙色高亮关键词 -->
  </li>
  <!-- 第二、三条同理 -->
</ol>
```

- 红色高亮：加 `class="keyword-critical"` 的 `<span>`
- 橙色高亮：加 `class="keyword-warn"` 的 `<span>`
- QQ 群链接：在 `<a class="qq-group-button" href="...">` 中修改 `href`

### 测试方法

1. 打开浏览器 DevTools → Application → Local Storage
2. 删除键 `njust_fraud_warning_confirmed`
3. 刷新页面，弹窗即重新出现

### 调整再显示周期

编辑 `fraudWarning.ts`，修改 `expireDays`：

```ts
expireDays: 30,   // 改为 30 天，用户每月确认一次
```

### 完全移除（不再使用）

注释掉 [client.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/client.ts) 中的三处：

```ts
// import FraudWarningModal from './components/FraudWarningModal.vue'

// app.component('FraudWarningModal', FraudWarningModal)

rootComponents: [
  // FraudWarningModal,
],
```

---

## 三、每年更新清单

每年新生季到来前，建议按以下顺序检查弹窗相关配置：

1. **公告板链接**：`_bulletin.md` → 更新年份与 QQ 群链接
2. **防诈骗弹窗**：`FraudWarningModal.vue` → 更新 QQ 群链接（模板中 `<a href="...">`）
3. **防诈骗弹窗内容**：确认三条警示文字是否需要根据新诈骗手段调整
4. **开启确认**：检查 `fraudWarning.ts` 中 `enabled: true`
5. **测试**：删除 localStorage 键后刷新页面，确认弹窗正常显示
