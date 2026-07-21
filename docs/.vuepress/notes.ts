import { defineCollection, defineCollections } from 'vuepress-theme-plume'

const freshGuideCollection = defineCollection({
    type: 'doc',
    dir: 'notes/freshGuide',
    title: '新生指南',
    sidebar: [
        {
            text: ' 各地老乡群',
            link: '/群组链接/各地老乡群.html',
        },
        {
            text: '😋 加入贴吧官方新生群',
            link: 'https://qm.qq.com/q/5VCp9OkJ8c',
        },
        {
            text: '新生指南',
            prefix: '',
            items: 'auto',
        },
    ],
})

export const collections = defineCollections([freshGuideCollection])