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
            text: '😋 加入2026新生群',
            link: 'https://qm.qq.com/q/qATRiS489O',
        },
        {
            text: '新生指南',
            prefix: '',
            items: 'auto',
        },
    ],
})

const blogCollection = defineCollection({
    type: 'post',
    dir: 'blog',
    title: '文章',
    postList: true,
    tags: true,
    archives: true,
    categories: true,
    pagination: 15,
})

export const collections = defineCollections([freshGuideCollection, blogCollection])