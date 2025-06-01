import comp from "E:/my-project/docs/.vuepress/.temp/pages/demo/2bw6dpg1/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo/2bw6dpg1/\",\"title\":\"新建 Markdown (2)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"新建 Markdown (2)\",\"createTime\":\"2025/03/28 14:04:25\",\"permalink\":\"/demo/2bw6dpg1/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.04,\"words\":13},\"filePathRelative\":\"notes/demo/hello.md\"}")
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
