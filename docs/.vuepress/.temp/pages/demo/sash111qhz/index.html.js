import comp from "E:/my-project/docs/.vuepress/.temp/pages/demo/sash111qhz/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo/sash111qhz/\",\"title\":\"新建 Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown\",\"createTime\":\"2025/03/28 11:51:03\",\"permalink\":\"/demo/sash111qhz/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":12},\"filePathRelative\":\"notes/demo/新建 Markdown.md\"}")
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
