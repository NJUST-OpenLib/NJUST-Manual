import { defineClientConfig } from 'vuepress/client'
import { defineWalineConfig } from '@vuepress/plugin-comment/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'
import Contributors from './components/Contributors.vue'
import FriendLinks from './components/FriendLinks.vue'
// import './theme/styles/custom.css'

// 愚人节整蛊插件，节后注释掉下面这行 import 即可完全关闭
import { initAprilFool } from './plugins/aprilFool.js'

export default defineClientConfig({
  enhance({ app }) {
    // 注册全局组件
    app.component('Contributors', Contributors)
    app.component('FriendLinks', FriendLinks)
  },

  setup() {
    // 愚人节整蛊：仅在用户本地时间为 4 月 1 日时生效
    // 节后关闭方式：注释掉下面这一行，或同时注释掉上面的 import
    initAprilFool()
  },
})