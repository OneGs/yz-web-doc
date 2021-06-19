module.exports = {
    base: '/yz-web-doc/',

    title: '益政前端文档',

    head: [
        ['link', { rel: 'icon', href: '/favicons.ico' }]
    ],

    description: 'Just playing around',

    themeConfig: { // 导航栏链接
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Docs',
                items: [
                    { text: '代码规范', link: '/specification/' },
                    { text: '通用组件', link: '/components/' },
                    { text: '项目文档', link: '/project/' }
                ]
            },
        ],

        sidebar: {
            '/components/': [
                '',
                'SearchTable'
            ],

            '/specification/': [
                {
                    title: '代码规范',
                    children: ['Name', 'Code']
                },
                {
                    title: '项目经验',
                    children: []
                },
                {
                    title: '其它',
                    children: ['IDE']
                },
            ],

            '/project/': [
                {
                    title: '项目升级',
                    children: ['UpdateVueOneToVueTwo']
                }
            ],

            '/': [''],
        }
    },
}
