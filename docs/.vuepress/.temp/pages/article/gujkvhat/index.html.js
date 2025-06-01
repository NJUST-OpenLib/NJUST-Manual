import comp from "E:/my-project/docs/.vuepress/.temp/pages/article/gujkvhat/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/gujkvhat/\",\"title\":\"新建 Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown\",\"createTime\":\"2025/05/31 21:57:41\",\"permalink\":\"/article/gujkvhat/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"notes/fresh_guide/住宿相关/新建 Markdown.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"e46775\",\"sort\":10002,\"name\":\"fresh_guide\"},{\"id\":\"b7c57b\",\"sort\":10003,\"name\":\"住宿相关\"}]}")
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
