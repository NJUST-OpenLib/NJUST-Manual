import comp from "E:/my-project/docs/.vuepress/.temp/pages/notes/freshGuide/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/freshGuide/\",\"title\":\"新生指南之写在前面\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新生指南之写在前面\",\"createTime\":\"2025/05/31 21:59:06\",\"permalink\":\"/notes/freshGuide/\"},\"headers\":[],\"readingTime\":{\"minutes\":2.2,\"words\":660},\"filePathRelative\":\"notes/freshGuide/readme.md\"}")
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
