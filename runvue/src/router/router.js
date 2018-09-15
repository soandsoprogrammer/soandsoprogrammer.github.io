import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') }
        // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        // { path: 'shoppingChange', title: '商品编辑', name: 'shoppingChange', component: () => import('@/views/mall/shoppingChange.vue') }, // 用于展示带参路由

    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        access: 10,
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: () => import('@/views/my-components/text-editor/text-editor.vue')
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: () => import('@/views/my-components/image-editor/image-editor.vue')
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: () => import('@/views/my-components/file-upload/file-upload.vue')
            },
            {
                path: 'scroll-bar',
                icon: 'android-upload',
                name: 'scroll-bar',
                title: '滚动条',
                component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                // component: () => import('@/views/my-components/count-to/count-to.vue')
                component: () => import('@/views/my-components/count-to/count-to.vue')
            },
            {
                path: 'split-pane-page',
                icon: 'ios-pause',
                name: 'split-pane-page',
                title: 'split-pane',
                component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
            }
        ]
    },

    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        access: 10,
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '自营商品', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }
    //
    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // },

    {
        path: '/user-management',
        icon: 'key',
        name: 'user-management',
        title: '用户管理',
        access: 0,
        component: Main,
        children: [
            {
                path: 'vip',
                title: '管理员管理',
                access: 0,
                name: 'vip',
                component: () => import('@/views/user-management/vip.vue')
            },
            {
                path: 'user',
                title: '用户列表',
                name: 'userList',
                component: () => import('@/views/user-management/userList.vue')
            },
            {
                path: 'assets',
                title: '城市合伙人',
                name: 'assets',
                component: () => import('@/views/user-management/assets.vue')
            },
            {
                path: 'yhzc',
                title: '用户资产',
                name: 'yhzc',
                component: () => import('@/views/user-management/yhzc.vue')
            }
        ]
    },
    {
        path: '/coins',
        icon: 'ios-grid-view',
        name: 'coins',
        access: 10,
        title: '币种管理',
        component: Main,
        children: [
            { path: 'coin', title: '币种管理', name: 'coin', icon: 'arrow-move', component: () => import('@/views/coin/coin.vue') }
        ]
    },
    {
        path: '/top-up',
        icon: 'ios-grid-view',
        name: 'top-up',
        title: '充值记录',
        access: 10,
        component: Main,
        children: [
            { path: 'usd', title: 'USDI充值记录', name: 'usd', icon: 'arrow-move', component: () => import('@/views/top-up/usd.vue') },
            { path: 'aitc', title: 'AITC充值记录', name: 'aitc', icon: 'edit', component: () => import('@/views/top-up/aitc.vue') }
        ]
    },
    {
        path: '/ctc',
        icon: 'android-sad',
        title: 'CTC交易',
        name: 'ctc',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title:'CTC挂单列表', name: 'CTC_index', component: () => import('@/views/ctc/ctcBuy.vue') },
            {path: 'ctcHangSell', title: 'CTC交易记录', name: 'ctcHangSell', component: () => import('@/views/ctc/ctcHangSell.vue')}
        ]
        // children: [
        //     {
        //         path: 'ctcHangSell',
        //         title: 'CTC挂卖',
        //         name: 'ctcHangSell',
        //         component: () => import('@/views/ctc/ctcHangSell.vue')
        //     },
        //     {
        //         path: 'ctcHangBuy',
        //         title: 'CTC挂买',
        //         name: 'ctcHangBuy',
        //         component: () => import('@/views/ctc/ctcHangBuy.vue')
        //     },
        //     {
        //         path: 'ctcSell',
        //         title: 'CTC卖出',
        //         name: 'ctcSell',
        //         component: () => import('@/views/ctc/ctcSell.vue')
        //     },
        //     {
        //         path: 'ctcBuy',
        //         title: 'CTC买入',
        //         name: 'ctcBuy',
        //         component: () => import('@/views/ctc/ctcBuy.vue')
        //     },
        //     {
        //         path: 'oreHangSell',
        //         title: '矿石挂卖',
        //         name: 'oreHangSell',
        //         component: () => import('@/views/ctc/oreHangSell.vue')
        //     },
        //     {
        //         path: 'oreHangBuy',
        //         title: '矿石挂买',
        //         name: 'oreHangBuy',
        //         component: () => import('@/views/ctc/oreHangBuy.vue')
        //     },
        //     {
        //         path: 'oreSell',
        //         title: '矿石卖出',
        //         name: 'oreSell',
        //         component: () => import('@/views/ctc/oreSell.vue')
        //     },
        //     {
        //         path: 'oreBuy',
        //         title: '矿石买入',
        //         name: 'oreBuy',
        //         component: () => import('@/views/ctc/oreBuy.vue')
        //     },
        //     {
        //         path: 'complaint',
        //         title: '申诉审核',
        //         name: 'complaint',
        //         component: () => import('@/views/ctc/complaint.vue')
        //     }
        // ]
    },
    {
        path: '/CTCSH',
        icon: 'android-sad',
        title: '冻结审核',
        name: 'CTCSH',
        access: 10,

        component: Main,
        children: [
            { path: 'CTCfreeze', title:'订单冻结申诉', name: 'CTCfreeze', component: () => import('@/views/CTCfreeze/CTCfreeze.vue') }
        ]
        // children: [
        //     {
        //         path: 'ctcHangSell',
        //         title: 'CTC挂卖',
        //         name: 'ctcHangSell',
        //         component: () => import('@/views/ctc/ctcHangSell.vue')
        //     },
        //     {
        //         path: 'ctcHangBuy',
        //         title: 'CTC挂买',
        //         name: 'ctcHangBuy',
        //         component: () => import('@/views/ctc/ctcHangBuy.vue')
        //     },
        //     {
        //         path: 'ctcSell',
        //         title: 'CTC卖出',
        //         name: 'ctcSell',
        //         component: () => import('@/views/ctc/ctcSell.vue')
        //     },
        //     {
        //         path: 'ctcBuy',
        //         title: 'CTC买入',
        //         name: 'ctcBuy',
        //         component: () => import('@/views/ctc/ctcBuy.vue')
        //     },
        //     {
        //         path: 'oreHangSell',
        //         title: '矿石挂卖',
        //         name: 'oreHangSell',
        //         component: () => import('@/views/ctc/oreHangSell.vue')
        //     },
        //     {
        //         path: 'oreHangBuy',
        //         title: '矿石挂买',
        //         name: 'oreHangBuy',
        //         component: () => import('@/views/ctc/oreHangBuy.vue')
        //     },
        //     {
        //         path: 'oreSell',
        //         title: '矿石卖出',
        //         name: 'oreSell',
        //         component: () => import('@/views/ctc/oreSell.vue')
        //     },
        //     {
        //         path: 'oreBuy',
        //         title: '矿石买入',
        //         name: 'oreBuy',
        //         component: () => import('@/views/ctc/oreBuy.vue')
        //     },
        //     {
        //         path: 'complaint',
        //         title: '申诉审核',
        //         name: 'complaint',
        //         component: () => import('@/views/ctc/complaint.vue')
        //     }
        // ]
    },
    {
        path: '/CTCFreezeInners',
        icon: 'ios-grid-view',
        name: 'CTCFreeze',
        access: 10,
        title: 'CTC冻结审核',
        component: Main,
        children: [
            {
                path: 'CTCFreezeInner',
                title: 'CTC冻结审核',
                name: 'CTCFreezeInner',
                component: () => import('@/views/CTCfreeze/ctcFreezeInner.vue')
            }
        ]
    },
    {
        path: '/mill',
        icon: 'ios-grid-view',
        name: 'mill',
        title: '矿机管理',
        access: 0,
        component: Main,
        children: [
            {
                path: 'masll',
                title: '已开矿机',
                name: 'masll',
                component: () => import('@/views/mill/mill.vue')
            },
            {
                path: 'principal',
                title: '矿机审核',
                name: 'principal',
                component: () => import('@/views/mill/principal.vue')
            },
            {
                path: 'earnings',
                title: '审核记录',
                name: 'earnings',
                component: () => import('@/views/mill/earnings.vue')
            }
            // {
            //     path: 'integral',
            //     title: '兑换积分',
            //     name: 'integral',
            //     icon: 'edit',
            //     component: () => import('@/views/mill/integral.vue')
            // },
            // {
            //     path: 'millSet',
            //     title: '矿机设置',
            //     name: 'millSet',
            //     icon: 'edit',
            //     component: () => import('@/views/mill/millSet.vue')
            // }
        ]
    },


    {
        path: '/qwe',
        icon: 'ios-grid-view',
        name: 'qwe',
        access: 10,
        title: '审核详情',
        component: Main,
        children: [
            {
                path: 'identity',
                title: '审核详情',
                name: 'identityInner',
                component: () => import('@/views/identity/identityInner.vue')
            }
        ]
    },

    {
        path: '/goods',
        icon: 'earth',
        title: '店铺管理',
        name: 'stores',
        access: 0,
        component: Main,
        children: [
          {
              path: 'storemanage',
              title: '店铺管理',
              name: 'storemanage',
              component: () => import('@/views/goods/storemanage.vue')
          },
          {
              path: 'store',
              title: '店铺申请管理',
              name: 'store',
              component: () => import('@/views/goods/store.vue')
          }
        ]
      },
    {
        path: '/goods',
        icon: 'earth',
        title: '商品管理',
        name: 'goods',
        access: 0,
        component: Main,
        children: [


            {
                path: 'goodsList',
                title: '自营商品管理',
                name: 'goodsList',
                component: () => import('@/views/goods/goodsList.vue')
            },
            {
                path: 'advertising',
                title: '广告管理',
                name: 'advertising',
                component: () => import('@/views/goods/advertising.vue')
            },

            {
                path: 'storeSet',
                title: '店铺商品申请管理',
                name: 'storeSet',
                component: () => import('@/views/goods/storeSet.vue')
            },
            {
                path: 'storeGoods',
                title: '店铺商品管理',
                name: 'storeGoods',
                component: () => import('@/views/goods/storeGoods.vue')
            },
        ]

        // children: [
        //     { path: 'index', title:'商城管理', name: 'mall_index', component: () => import('@/views/mall/mall.vue') }
        // ]
    },
    {
        path: '/trading',
        icon: 'android-checkbox',
        title: '记录列表',
        name: 'trading',
        access: 0,
        component: Main,
        children: [
            { path: 'CSA', title:'CSA记录', name: 'CSA', component: () => import('@/views/trading/CSA.vue') },
            { path: 'jf', title:'积分记录', name: 'jf', component: () => import('@/views/trading/jf.vue') },
            { path: 'USDT', title:'USDT记录', name: 'USDT', component: () => import('@/views/trading/usdt.vue') },
            { path: 'wtmr', title:'委托买入', name: 'wtmr', component: () => import('@/views/trading/wtmr.vue') },
            { path: 'wtmc', title:'委托卖出', name: 'wtmc', component: () => import('@/views/trading/wtmc.vue') },
            { path: 'mrcg', title:'买入成功', name: 'mrcg', component: () => import('@/views/trading/mrcg.vue') },
            { path: 'mccg', title:'卖出成功', name: 'mccg', component: () => import('@/views/trading/mccg.vue') }
        ]
    },
    {
        path: '/financial',
        icon: 'ios-analytics',
        title: '财务管理',
        name: 'financial',
        access: 0,
        component: Main,
        children: [
            { path: 'USDTs', title:'USDT充值记录', name: 'USDTs', component: () => import('@/views/financial/USDT.vue') }
        ]
    },
    {
        path: '/super',
        icon: 'ios-infinite',
        name: 'super',
        access: 0,
        title: '超管操作记录',
        component: Main,
        children: [
            { path: 'superList', title: '超管操作记录', name: 'superList',  component: () => import('@/views/super/superList.vue') }

        ]
    },
    {
        path: '/system',
        icon: 'lock-combination',
        title: '系统管理',
        name: 'system',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title:'系统管理', name: 'system_index', component: () => import('@/views/system/system.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
