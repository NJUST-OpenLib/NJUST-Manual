import { defineClientConfig } from 'vuepress/client'
import Tabs from 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Plot from 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import CanIUse from 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/components/CanIUse.vue'
import FileTreeItem from 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'

import 'E:/my-project/node_modules/vuepress-theme-plume/node_modules/vuepress-plugin-md-power/lib/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Tabs', Tabs)
    app.component('CodeTabs', CodeTabs)
    app.component('Plot', Plot)
    app.component('CanIUseViewer', CanIUse)
    app.component('FileTreeItem', FileTreeItem)
  }
})
