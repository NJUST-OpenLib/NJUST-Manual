import comp from "E:/my-project/docs/.vuepress/.temp/pages/NEW/index.html.vue"
const data = JSON.parse("{\"path\":\"/NEW/\",\"title\":\"NEW1\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"NEW1\",\"createTime\":\"2025/03/27 00:15:33\",\"permalink\":\"/NEW/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"notes/test/README.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"9c19c2\",\"sort\":10002,\"name\":\"test\"}]}")
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
