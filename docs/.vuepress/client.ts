import { defineClientConfig } from 'vuepress/client'
import { defineWalineConfig } from '@vuepress/plugin-comment/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'
import Contributors from './components/Contributors.vue'
import FriendLinks from './components/FriendLinks.vue'
import FraudWarningModal from './components/FraudWarningModal.vue'
import AnniversaryLayout from './theme/components/AnniversaryLayout.vue'
// import './theme/styles/custom.css'

// 愚人节整蛊插件，节后注释掉下面这行 import 即可完全关闭
import { initAprilFool } from './plugins/aprilFool.js'

export default defineClientConfig({
  enhance({ app }) {
    // 注册全局组件
    app.component('Contributors', Contributors)
    app.component('FriendLinks', FriendLinks)
    app.component('FraudWarningModal', FraudWarningModal)
  },

  // 将防诈骗弹窗挂载到应用根节点，确保在任何页面都能触发
  rootComponents: [FraudWarningModal],

  // 覆盖主题 Layout，注入纪念日顶部横幅
  layouts: {
    Layout: AnniversaryLayout,
  },

  setup() {
    // 愚人节整蛊：仅在用户本地时间为 4 月 1 日时生效
    // 节后关闭方式：注释掉下面这一行，或同时注释掉上面的 import
    initAprilFool()

    // njust.store 域名下显示 ICP 备案号
    if (typeof window !== 'undefined') {
      const showIcP = () => {
        const hostname = window.location.hostname
        if (hostname === 'njust.store' || hostname.endsWith('.njust.store')) {
          const el = document.getElementById('icp-beian')
          if (el) el.style.display = 'inline'
        }
      }
      // setup 执行时 DOM 可能尚未渲染完，延迟到下一帧
      requestAnimationFrame(() => requestAnimationFrame(showIcP))
    }
  },
})