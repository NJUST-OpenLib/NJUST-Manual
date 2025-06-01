import comp from "F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/notes/index.html.vue"
const data = JSON.parse("{\"path\":\"/notes/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/readme.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10000,\"name\":\"notes\"}]}")
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
