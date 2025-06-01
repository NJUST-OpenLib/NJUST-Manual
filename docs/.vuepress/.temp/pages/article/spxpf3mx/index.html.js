import comp from "E:/my-project/docs/.vuepress/.temp/pages/article/spxpf3mx/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/spxpf3mx/\",\"title\":\"新建 Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown\",\"createTime\":\"2025/03/28 15:06:56\",\"permalink\":\"/article/spxpf3mx/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":11},\"filePathRelative\":\"notes/typescript/1.intro/configuration.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"a6de9d\",\"sort\":10002,\"name\":\"typescript\"},{\"id\":\"6e66a5\",\"sort\":1,\"name\":\"intro\"}]}")
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
