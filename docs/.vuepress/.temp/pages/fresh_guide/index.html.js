import comp from "E:/my-project/docs/.vuepress/.temp/pages/fresh_guide/index.html.vue"
const data = JSON.parse("{\"path\":\"/fresh_guide/\",\"title\":\"fresh_guide\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"fresh_guide\",\"createTime\":\"2025/05/31 21:21:59\",\"permalink\":\"/fresh_guide/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":10},\"filePathRelative\":\"notes/fresh_guide/readme.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"e46775\",\"sort\":10002,\"name\":\"fresh_guide\"}]}")
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
