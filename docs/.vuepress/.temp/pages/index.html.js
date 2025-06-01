import comp from "F:/Github/NJUST-Manual/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"pageLayout\":\"home\",\"externalLinkIcon\":false,\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"tint-plate\",\"hero\":{\"name\":\"南京理工大学\",\"tagline\":\"生存手册\",\"text\":\"One-stop information platform for NJUSTers\",\"actions\":[{\"theme\":\"brand\",\"text\":\"新生指南 →\",\"link\":\"/notes/freshGuide/\"},{\"theme\":\"alt\",\"text\":\"Github\",\"link\":\"https://github.com/pengzhanbo/vuepress-theme-plume\"}]}}]},\"headers\":[],\"readingTime\":{\"minutes\":0.17,\"words\":51},\"filePathRelative\":\"README.md\",\"categoryList\":[]}")
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
