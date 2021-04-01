export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },

        {
            id: 'kaljak',
            title: 'Aktifasi User',
            type: 'group',
            icon: 'icon-plus',
            children: [
                {
                    id: 'kioa-1',
                    title: 'Permintaan Aktifasi',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    badge: {
                        title: 'Baru',
                        type: 'label-danger'
                    },
                        children: [
                            {
                                id: 'kall-1',
                                title: 'Permintaan Aktifasi',
                                type: 'item',
                                url: '/pengguna/aktifasi',
                                breadcrumbs: false
                            },
                        
                        ]
                }
            ]
        },

        {
            id: 'ui-pengguna',
            title: 'Pengguna',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'pengguna-1',
                    title: 'Pengguna Aplikasi',
                    type: 'collapse',
                    icon: 'feather icon-users',
                    children: [
                        {
                            id: 'user-1.2',
                            title: 'Pengguna Aktif',
                            type: 'item',
                            url: '/pengguna/aktif',
                        },
                        {
                            id: 'user-1.3',
                            title: 'Daftar Blokir',
                            type: 'item',
                            url: '/pengguna/blokir',
                        },
                               
                            
                        
                    ]
                }
            ]
        },

        {
            id: 'ui-kuesioner',
            title: 'KUESIONER',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'keusioner',
                    title: 'Management Kuesioner',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'add-tanya',
                            title: 'Kuesioner',
                            type: 'collapse',
                            children: [

                                {
                                    id: 'menu-tanya-1.2',
                                    title: 'Kategori Kuesioner',
                                    type: 'item',
                                    url: '/kuesioner/kategori',
                                },
                                {
                                    id: 'menu-tanya-1.1',
                                    title: 'Kuesioner',
                                    type: 'item',
                                    url: '/kesioner/pilih_kategori',
                                },


                                
                                // {
                                //     id: 'menu-tanya-1.1',
                                //     title: 'Kelola Kuesioner',
                                //     type: 'item',
                                //     url: '/kuesioner/kelola',
                                // },
                               
                               
                            ]
                        },
                        {
                            id: 'hasil',
                            title: 'Hasil Kuesioner',
                            type: 'collapse',
                            children: [

                                {
                                    id: 'menu-tanya-2.1',
                                    title: 'Hasil Kuesioner',
                                    type: 'item',
                                    url: '/kuesioner/hasil',
                                },

                                {
                                    id: 'menu-tanya-2.3',
                                    title: 'Kategori Hasil Kuesioner',
                                    type: 'item',
                                    url: '/kuesioner/diagram/kategori'
                                },

                                // {
                                //     id: 'menu-tanya-2.2',
                                //     title: 'Hasil Kuesioner Diagram',
                                //     type: 'item',
                                //     url: '/kuesioner/diagram',
                                // },

                                
                               
                            ]
                            
                        },


                    ]
                }
            ]
        },



        // {
        //     id: 'ui-element',
        //     title: 'UI ELEMENT',
        //     type: 'group',
        //     icon: 'icon-ui',
        //     children: [
        //         {
        //             id: 'basic',
        //             title: 'Component',
        //             type: 'collapse',
        //             icon: 'feather icon-box',
        //             children: [
        //                 {
        //                     id: 'button',
        //                     title: 'Button',
        //                     type: 'item',
        //                     url: '/basic/button'
        //                 },
        //                 {
        //                     id: 'badges',
        //                     title: 'Badges',
        //                     type: 'item',
        //                     url: '/basic/badges'
        //                 },
        //                 {
        //                     id: 'breadcrumb-pagination',
        //                     title: 'Breadcrumb & Pagination',
        //                     type: 'item',
        //                     url: '/basic/breadcrumb-paging'
        //                 },
        //                 {
        //                     id: 'collapse',
        //                     title: 'Collapse',
        //                     type: 'item',
        //                     url: '/basic/collapse'
        //                 },
        //                 {
        //                     id: 'tabs-pills',
        //                     title: 'Tabs & Pills',
        //                     type: 'item',
        //                     url: '/basic/tabs-pills'
        //                 },
        //                 {
        //                     id: 'typography',
        //                     title: 'Typography',
        //                     type: 'item',
        //                     url: '/basic/typography'
        //                 }
        //             ]
        //         }
        //     ]
        // },

        // {
        //     id: 'ui-forms',
        //     title: 'Forms & Tables',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'form-basic',
        //             title: 'Form Elements',
        //             type: 'item',
        //             url: '/forms/form-basic',
        //             icon: 'feather icon-file-text'
        //         },
        //         {
        //             id: 'bootstrap',
        //             title: 'Table',
        //             type: 'item',
        //             icon: 'feather icon-server',
        //             url: '/tables/bootstrap'
        //         }
        //     ]
        // },
        // {
        //     id: 'chart-maps',
        //     title: 'Chart & Maps',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         {
        //             id: 'charts',
        //             title: 'Charts',
        //             type: 'item',
        //             icon: 'feather icon-pie-chart',
        //             url: '/charts/nvd3'
        //         },
        //         {
        //             id: 'maps',
        //             title: 'Map',
        //             type: 'item',
        //             icon: 'feather icon-map',
        //             url: '/maps/google-map'
        //         }
        //     ]
        // },

        // {
        //     id: 'pages',
        //     title: 'Pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         },

        //         {
        //             id: 'sample-page',
        //             title: 'Sample Page',
        //             type: 'item',
        //             url: '/sample-page',
        //             classes: 'nav-item',
        //             icon: 'feather icon-sidebar'
        //         },
        //         {
        //             id: 'docs',
        //             title: 'Documentation',
        //             type: 'item',
        //             url: '/docs',
        //             classes: 'nav-item',
        //             icon: 'feather icon-help-circle'
        //         },
        //         {
        //             id: 'menu-level',
        //             title: 'Menu Levels',
        //             type: 'collapse',
        //             icon: 'feather icon-menu',
        //             children: [
        //                 {
        //                     id: 'menu-level-1.1',
        //                     title: 'Menu Level 1.1',
        //                     type: 'item',
        //                     url: '#!',
        //                 },
        //                 {
        //                     id: 'menu-level-1.2',
        //                     title: 'Menu Level 2.2',
        //                     type: 'collapse',
        //                     children: [
        //                         {
        //                             id: 'menu-level-2.1',
        //                             title: 'Menu Level 2.1',
        //                             type: 'item',
        //                             url: '#',
        //                         },
        //                         {
        //                             id: 'menu-level-2.2',
        //                             title: 'Menu Level 2.2',
        //                             type: 'collapse',
        //                             children: [
        //                                 {
        //                                     id: 'menu-level-3.1',
        //                                     title: 'Menu Level 3.1',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 },
        //                                 {
        //                                     id: 'menu-level-3.2',
        //                                     title: 'Menu Level 3.2',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             id: 'disabled-menu',
        //             title: 'Disabled Menu',
        //             type: 'item',
        //             url: '#',
        //             classes: 'nav-item disabled',
        //             icon: 'feather icon-power'
        //         },
                /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
        //     ]
        // }
    ]
}