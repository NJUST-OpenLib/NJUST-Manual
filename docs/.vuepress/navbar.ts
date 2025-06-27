import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'iconify carbon:home' },
  { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  { text: '新生指南', link: '/notes/freshGuide/' },
  //friend links
 // { text: '友情链接', link: '/friendLinks/' },
  { text: '关于', link: '/about/' },
])
