import comp from "E:/my-project/docs/.vuepress/.temp/pages/freshGuide/hp534163/index.html.vue"
const data = JSON.parse("{\"path\":\"/freshGuide/hp534163/\",\"title\":\"写在前面\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"写在前面\",\"createTime\":\"2025/05/31 22:02:51\",\"permalink\":\"/freshGuide/hp534163/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":12},\"filePathRelative\":\"notes/freshGuide/0.写在前面.md\"}")
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
