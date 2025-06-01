import comp from "E:/my-project/docs/.vuepress/.temp/pages/notes/freshGuide/写在前面.html.vue"
const data = JSON.parse("{\"path\":\"/notes/freshGuide/%E5%86%99%E5%9C%A8%E5%89%8D%E9%9D%A2.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/freshGuide/写在前面.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"a42ffa\",\"sort\":10002,\"name\":\"freshGuide\"}]}")
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
