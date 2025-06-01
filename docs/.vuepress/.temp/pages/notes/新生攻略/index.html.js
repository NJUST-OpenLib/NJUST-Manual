import comp from "E:/my-project/docs/.vuepress/.temp/pages/notes/新生攻略/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/%E6%96%B0%E7%94%9F%E6%94%BB%E7%95%A5/\",\"title\":\"新建 Markdown\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown\",\"createTime\":\"2025/05/31 11:49:25\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"notes/新生攻略/index.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"05b6a9\",\"sort\":10002,\"name\":\"新生攻略\"}]}")
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
