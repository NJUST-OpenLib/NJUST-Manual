import comp from "E:/my-project/docs/.vuepress/.temp/pages/article/p6e25bjm/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/p6e25bjm/\",\"title\":\"Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Markdown\",\"tags\":[\"markdown\"],\"createTime\":\"2025/03/27 00:15:33\",\"permalink\":\"/article/p6e25bjm/\"},\"headers\":[],\"readingTime\":{\"minutes\":3.36,\"words\":1009},\"filePathRelative\":\"preview/markdown.md\",\"categoryList\":[{\"id\":\"5ebeb6\",\"sort\":10001,\"name\":\"preview\"}]}")
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
