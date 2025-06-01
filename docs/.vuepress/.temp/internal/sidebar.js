export const sidebar = {"/":{"/notes/freshGuide/":{"items":[{"text":"加入新生群","link":"https://example.com"},{"text":"新生指南","prefix":"","items":"auto"}],"prefix":"/notes/freshGuide/"}},"__auto__":{"/notes/freshGuide/":[{"text":"常见问题汇总","link":"/notes/freshGuide/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html"},{"text":"网络相关","link":"/notes/freshGuide/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/","items":[{"text":"说明","link":"/notes/freshGuide/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/%E8%AF%B4%E6%98%8E.html"}],"collapsed":false}]},"__home__":{"/notes/freshGuide/":"/notes/freshGuide/"}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSidebar) {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ sidebar }) => {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  })
}
