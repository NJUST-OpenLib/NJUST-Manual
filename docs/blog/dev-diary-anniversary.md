---
title: 开发日记：纪念日横幅与全站哀悼变灰
createTime: 2026/08/16 00:00:00
permalink: /dev/guide-anniversary.html
---

面向后续维护者，介绍站点纪念日顶部横幅与全站哀悼变灰功能的控制方式和实现原理。

## 一、纪念日顶部横幅（AnniversaryBanner）

在指定日期，页面顶部显示一条不遮挡内容的横幅（如 8/15 日本投降纪念日）。横幅固定在最顶部、独占一块，导航与内容区自动下移；点击右上角 ✕ 后本次会话内不再显示。

### 配置：只改一个文件

所有纪念日都写在 [anniversaries.json](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/anniversaries.json)，无需动任何代码：

```json
{
  "enabled": true,
  "items": [
    {
      "month": 8,
      "day": 15,
      "title": "日本投降纪念日",
      "content": "1945 年 8 月 15 日，日本天皇接受波茨坦公告，宣布无条件投降。"
    }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `month` | 是 | 月份 1-12 |
| `day` | 是 | 日期 1-31 |
| `title` | 是 | 横幅标题 |
| `content` | 否 | 说明文字 |
| `color` | 否 | 自定义背景色；不填则按主题品牌色自动生成深色调 |
| `gray` | 否 | `true` 时该日全站变灰哀悼（见下文） |

- **添加纪念日**：在 `items` 数组里加一条即可，按日期顺序排列更易维护。
- **删除纪念日**：删掉对应条目。
- **整体关闭**：`"enabled": false`。

### 文件清单

| 文件 | 用途 |
|------|------|
| [anniversaries.json](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/anniversaries.json) | 纪念日数据，维护时只需改这里 |
| [AnniversaryBanner.vue](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/components/AnniversaryBanner.vue) | 横幅组件：日期匹配、高度测量、关闭逻辑、变灰触发 |
| [AnniversaryLayout.vue](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/theme/components/AnniversaryLayout.vue) | 包裹主题 Layout，把横幅注入 `layout-top` 插槽 |
| [client.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/client.ts) | 注册 `layouts: { Layout: AnniversaryLayout }` |
| [shim.d.ts](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/theme/shim.d.ts) | 声明 `*.json` 模块，供组件导入 |

### 横幅不遮挡内容的原理

横幅 `position: fixed` 置顶，组件测量自身高度后写入主题维护的 CSS 变量 `--vp-layout-top-height`。导航、侧边栏、内容区都按该变量整体下移（`VPNav` 的 `top`、`VPContent` 的 `margin-top` 等），因此横幅独占顶部一块、不遮挡任何内容；窗口缩放导致换行时，`ResizeObserver` 会重新测量高度。

### 测试横幅显示

横幅按访问者本地日期在客户端匹配。要临时验证，可在 `anniversaries.json` 加一条今天日期的测试条目，验证后删除。

---

## 二、全站哀悼变灰（图片除外）

在 7/7、12/13 等纪念日，整个站点变灰哀悼，**图片保持彩色**。触发方式就是给对应纪念日加 `"gray": true`：

```json
{
  "month": 7,
  "day": 7,
  "title": "七·七事变",
  "content": "1937 年 7 月 7 日，日军发动卢沟桥事变，侵略宛平城。全民族抗战爆发。",
  "gray": true
}
```

- 总开关在 `anniversaries.json` 顶层：`"grayEnabled": false` 可一键关闭全部变灰。
- 给哪条纪念日加 `gray: true`，那天的全站就变灰。

### 技术原理（重要）

CSS `filter: grayscale()` 加在父元素上会**连子元素一起变灰**，且子元素无法用 `grayscale(0)` 抵消。要实现"图片除外"，只能给**不含图片的元素**单独加滤镜，这样图片永远不会处于被滤镜的祖先内。实现位于 `AnniversaryBanner.vue` 的全局样式：

```css
html.anniv-mourning *:not(body):not(#app):not(.vp-layout):not(.vp-nav)
  :not(img):not(picture):not(video):not(canvas):not(iframe)
  :not(:has(img, picture, video, canvas, iframe)) {
  filter: grayscale(1) !important;
}
```

要点：

- **排除 `body/#app/.vp-layout/.vp-nav`**：滤镜会把 `fixed` 元素的定位基准从视口改成祖先，导致导航、侧边栏错位。这些结构容器不加滤镜即可避免。
- **`svg` 不排除**：图标属于 UI，哀悼时应一并变灰。
- **横幅单独补一条** `html.anniv-mourning .anniversary-banner`：横幅是 Teleport 到 body 的固定元素，通用 `:has()` 规则对其有浏览器怪癖（选择器匹配但滤镜不生效），单独补规则解决。

### 常见问题排查

- **某天没有变灰**：确认该条纪念日有 `"gray": true`，且顶层 `grayEnabled` 为 `true`。
- **图片也跟着变灰**：检查是否给含图片的容器加了 `filter`；正常实现下图片祖先应全是 `filter: none`。
- **导航位置错乱**：确认 `body`、`#app`、`.vp-layout`、`.vp-nav` 的 computed `filter` 为 `none`。
- **变灰立即验证**：在浏览器控制台执行 `document.documentElement.classList.add('anniv-mourning')` 即可预览效果，执行 `remove` 恢复。

---

## 三、维护提醒

- 纪念日是纯数据，改动 `anniversaries.json` 即可，无需动组件。
- 新增大规模悼念日期（如领导人逝世）时，建议与站点负责人确认，避免误用灰屏引发误解。
- 变灰效果依赖现代 CSS `:has()`，仅支持 2022 年后的主流浏览器，无需兼容旧内核。
