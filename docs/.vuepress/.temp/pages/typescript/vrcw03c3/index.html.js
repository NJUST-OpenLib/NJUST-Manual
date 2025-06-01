import comp from "E:/my-project/docs/.vuepress/.temp/pages/typescript/vrcw03c3/index.html.vue"
const data = JSON.parse("{\"path\":\"/typescript/vrcw03c3/\",\"title\":\"33333\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":33333,\"createTime\":\"2025/03/28 15:13:50\",\"permalink\":\"/typescript/vrcw03c3/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":9},\"filePathRelative\":\"notes/typescript/33333.md\"}")
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
