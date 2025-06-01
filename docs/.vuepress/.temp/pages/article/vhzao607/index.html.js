import comp from "E:/my-project/docs/.vuepress/.temp/pages/article/vhzao607/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/vhzao607/\",\"title\":\"新建 Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown\",\"createTime\":\"2025/03/28 11:51:03\",\"permalink\":\"/article/vhzao607/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"notes/test/新建 Markdown.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"9c19c2\",\"sort\":10002,\"name\":\"test\"}]}")
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
