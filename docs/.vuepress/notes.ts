import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const freshGuideConfig = defineNoteConfig({
    dir: 'freshGuide',
    link: 'notes/freshGuide',
    sidebar: [
        {
            text: ' 各地老乡群', // 顶部超链接
            link: '/群组链接/各地老乡群.html', // ← 你需要替换成你要跳转的链接
        },
        {
            text: '😋 加入贴吧官方新生群', // 顶部超链接
            link: 'https://qm.qq.com/q/5VCp9OkJ8c', // ← 你需要替换成你要跳转的链接
        },
        {
            text: '新生指南',
            prefix: '',
            //此处 prefix 相对于 notes/freshGuide 路径
            items: 'auto'
            //Auto generate sidebar items from markdown files in the directory of notes/freshGuide
            // 将基于该目录下的 markdown 文件，自动生成侧边栏
            //This can make a clickable top level link in the sidebar with name "新生指南"
            // 这将使侧边栏中有一个可点击的顶级链接，名称为 "新生指南"
            //本文档计划后续扩展，故使用 /notes 作为根目录，freshGuide 作为新生指南目录  .
            //务必注意目录层级关系，所有/notes/freshGuide 下的文件受本规则管控，link 必须为 notes/freshGuide
        },
    ],
})




export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [freshGuideConfig],
})
