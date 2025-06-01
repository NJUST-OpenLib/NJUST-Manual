import comp from "E:/my-project/docs/.vuepress/.temp/pages/notes/freshGuide/网络相关/说明.html.vue"
const data = JSON.parse("{\"path\":\"/notes/freshGuide/%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3/%E8%AF%B4%E6%98%8E.html\",\"title\":\"说明\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"说明\",\"createTime\":\"2025/05/31 22:52:14\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"notes/freshGuide/网络相关/说明.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
