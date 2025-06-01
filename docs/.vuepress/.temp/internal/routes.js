export const redirects = JSON.parse("{\"/HowToContribute.html\":\"/HowToContribute/\"}")

export const routes = Object.fromEntries([
  ["/HowToContribute/", { loader: () => import(/* webpackChunkName: "HowToContribute_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/HowToContribute/index.html.js"), meta: {"title":"如何贡献"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/notes/", { loader: () => import(/* webpackChunkName: "notes_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/index.html.js"), meta: {"title":""} }],
  ["/notes/freshGuide/", { loader: () => import(/* webpackChunkName: "notes_freshGuide_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/freshGuide/index.html.js"), meta: {"title":"新生指南之写在前面"} }],
  ["/notes/freshGuide/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html", { loader: () => import(/* webpackChunkName: "notes_freshGuide_常见问题.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/freshGuide/常见问题.html.js"), meta: {"title":"常见问题汇总"} }],
  ["/notes/freshGuide/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/", { loader: () => import(/* webpackChunkName: "notes_freshGuide_网络相关_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/freshGuide/网络相关/index.html.js"), meta: {"title":11111} }],
  ["/notes/freshGuide/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/%E8%AF%B4%E6%98%8E.html", { loader: () => import(/* webpackChunkName: "notes_freshGuide_网络相关_说明.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/freshGuide/网络相关/说明.html.js"), meta: {"title":"说明"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"博客"} }],
  ["/blog/tags/", { loader: () => import(/* webpackChunkName: "blog_tags_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/blog/tags/index.html.js"), meta: {"title":"标签"} }],
  ["/blog/archives/", { loader: () => import(/* webpackChunkName: "blog_archives_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/blog/archives/index.html.js"), meta: {"title":"归档"} }],
  ["/blog/categories/", { loader: () => import(/* webpackChunkName: "blog_categories_index.html" */"F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/blog/categories/index.html.js"), meta: {"title":"分类"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
