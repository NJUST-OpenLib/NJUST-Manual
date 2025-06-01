import comp from "E:/my-project/docs/.vuepress/.temp/pages/fresh_guide/bmk22pv1/index.html.vue"
const data = JSON.parse("{\"path\":\"/fresh_guide/bmk22pv1/\",\"title\":\"readme\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"readme\",\"createTime\":\"2025/05/31 21:25:14\",\"permalink\":\"/fresh_guide/bmk22pv1/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":10},\"filePathRelative\":\"notes/fresh_guide/住宿相关/readme.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10001,\"name\":\"notes\"},{\"id\":\"e46775\",\"sort\":10002,\"name\":\"fresh_guide\"},{\"id\":\"b7c57b\",\"sort\":10003,\"name\":\"住宿相关\"}]}")
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
