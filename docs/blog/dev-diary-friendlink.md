---
title: 开发日记：友情链接维护指南
createTime: 2026/08/16 00:00:00
permalink: /dev/guide-friendlink.html
---

面向后续维护者，介绍站点友情链接数据的维护方法。友情链接显示在首页及友情链接申请页（`<FriendLinks />` 组件）。

## 数据文件

所有友情链接都写在 [friend-link.json](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/public/friend-link.json)，纯 JSON 数组，维护时只需编辑这一个文件：

```json
[
  {
    "name": "南京理工大学校园论坛",
    "url": "https://njust.club/",
    "desc": "多个高校联合论坛，支持匿名发言",
    "logo": "https://www.clipartmax.com/png/middle/125-1253440_big-image-mastodon-social-network-logo.png"
  },
  {
    "name": "梨课程",
    "url": "https://m.njust.store",
    "logo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%234CAF50'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='white' font-family='sans-serif'%3E梨%3C/text%3E%3C/svg%3E",
    "desc": "手机随时查课表、考试、成绩，支持本科生与研究生"
  }
]
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 站点名称 |
| `url` | 是 | 站点链接 |
| `desc` | 是 | 一句话介绍 |
| `logo` | 是 | 站点图标，可用图片 URL 或内联 SVG data URI |

## 维护方法

- **添加**：在数组里复制一项并修改字段即可，注意每项之间用逗号分隔、最后一项末尾不带逗号。
- **删除**：删掉对应整项。
- 字段顺序无要求，新项建议追加到数组末尾。

## 注意事项

- **JSON 不支持注释**：请勿在文件里写 `//` 或 `/* */`，否则 `fetch('/friend-link.json').then(r => r.json())` 解析失败，友情链接区域会报错。
- **图标来源**：优先使用站点自己的图标或图片 URL；没有合适图标时可用内联 SVG data URI（如上方"梨课程"示例，绿色圆角方加字），避免依赖易失效的外部图床。logo 字段缺失时该卡片图标位置会显示空图。
- 修改后重新构建即可生效，无需改动组件。

## 关联文件

| 文件 | 用途 |
|------|------|
| [friend-link.json](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/public/friend-link.json) | 数据文件，维护时改这里 |
| [FriendLinks.vue](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/.vuepress/components/FriendLinks.vue) | 渲染组件，读取上述 JSON |
| [apply-link.md](https://github.com/NJUST-OpenLib/NJUST-Manual/blob/main/docs/blog/apply-link.md) | 友情链接申请页，展示同一数据 |