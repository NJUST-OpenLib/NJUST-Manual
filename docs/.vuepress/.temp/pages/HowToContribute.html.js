import comp from "E:/my-project/docs/.vuepress/.temp/pages/HowToContribute.html.vue"
const data = JSON.parse("{\"path\":\"/HowToContribute.html\",\"title\":\"如何贡献\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"如何贡献\",\"createTime\":\"2025/06/01 15:41:52\"},\"headers\":[],\"readingTime\":{\"minutes\":1.78,\"words\":533},\"filePathRelative\":\"HowToContribute.md\",\"categoryList\":[]}")
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
