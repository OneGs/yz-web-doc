module.exports = {
    base: '/yz-web-doc/',

    title: '益政前端文档',

    head: [
        ['link', { rel: 'icon', href: '/favicons.ico' }]
    ],

    description: 'Just playing around',

    themeConfig: { // 导航栏链接
        nav: [
            {text: 'Home', link: '/'},
            {
                text: 'Docs',
                items: [
                    { text: 'specification', link: '/specification/' },
                    { text: 'components', link: '/components/' }
                ]
            },
        ],

        sidebar: {
            '/components/': [
                '',
                'searchTable'
            ],

            '/specification/': [

            ],

            '/': [''],
        }
    }
}