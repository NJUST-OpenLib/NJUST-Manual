import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'
import path from 'node:path'
/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'github', link: 'https://github.com/NJUST-OpenLib/NJUST-Manual/' },
  ],
  navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
  // aside: true, // 页内侧边栏，默认显示在右侧
  // outline: [2, 3], // 页内大纲，默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  copyright: 'CC-BY-NC-4.0',// 文章版权信息，缺省值为 CC-BY-C-4.0，此处设置默认 CC-BY-NC-4.0

  prevPage: true,   // 是否启用上一页链接
  nextPage: true,   // 是否启用下一页链接
  createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  footer: {
    copyright: '<a href="https://njust.wiki">NJUST.WIKI</a> © 2025',
    message: '欢迎访问 <a href="https://njust.club">[闭舍] 南理站</a> 一同参与讨论',

  },

  /**
   * @see https://theme-plume.vuejs.press/config/basic/#profile
   */
  profile: {
    avatar: 'https://theme-plume.vuejs.press/plume.png',
    name: 'My Vuepress Site',
    description: 'discribe info',
    // circle: true,
    // location: '',
    // organization: '',
  },

  navbar,
  notes,

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
bulletin: {
   layout: 'top-right',

  contentType: 'markdown',
  title: '站点公告',
  contentFile: path.join(__dirname, '_bulletin.md'),
 },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  transition: {
    page: true,        // 启用 页面间跳转过渡动画
    postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'fade',  // 启用 深色模式切换过渡动画，或配置过渡动画类型
  },

})
