import comp from "E:/my-project/docs/.vuepress/.temp/pages/notes/freshGuide/住宿.html.vue"
const data = JSON.parse("{\"path\":\"/notes/freshGuide/%E4%BD%8F%E5%AE%BF.html\",\"title\":\"常见问题汇总\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"常见问题汇总\",\"createTime\":\"2025/05/31 22:53:39\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":12},\"filePathRelative\":\"notes/freshGuide/住宿.md\"}")
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
