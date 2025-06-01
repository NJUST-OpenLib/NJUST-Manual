import comp from "E:/my-project/docs/.vuepress/.temp/pages/freshGuide/index.html.vue"
const data = JSON.parse("{\"path\":\"/freshGuide/\",\"title\":\"写在前面\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"写在前面\",\"createTime\":\"2025/05/31 21:59:06\",\"permalink\":\"/freshGuide/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.12,\"words\":36},\"filePathRelative\":\"notes/freshGuide/readme.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"a42ffa\",\"sort\":10002,\"name\":\"freshGuide\"}]}")
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
