import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    //11.导出二级路由
let er = [{
        path: "home",
        component: () =>
            import ("@/pages/index/home/home")
    },
    {
        path: "menu",
        name: "菜单列表",
        component: () =>
            import ("@/pages/index/menu/menu")
    },
    {
        path: "role",
        name: "角色列表",
        component: () =>
            import ("@/pages/index/role/role")
    },
    {
        path: "manage",
        name: "管理员列表",
        component: () =>
            import ("@/pages/index/manage/manage")
    },
    {
        path: "cate",
        name: "商品分类列表",
        component: () =>
            import ("@/pages/index/cate/cate")
    },
    {
        path: "spec",
        name: "规格列表",
        component: () =>
            import ("@/pages/index/spec/spec")
    },
    {
        path: "banner",
        name: "轮播图列表",
        component: () =>
            import ("@/pages/index/banner/banner")
    },
    {
        path: "member",
        name: "会员列表",
        component: () =>
            import ("@/pages/index/member/member")
    },
    {
        path: "goods",
        name: "商品列表",
        component: () =>
            import ("@/pages/index/goods/goods")
    },
    {
        path: "seckill",
        name: "活动列表",
        component: () =>
            import ("@/pages/index/seckill/seckill")
    },
    {
        path: "",
        redirect: "home"
    }
]
export default new Router({
    routes: [{
            path: "/login",
            component: () =>
                import ("@/pages/login/login")
        },
        {
            path: "/index",
            component: () =>
                import ("@/pages/index/index"),
            children: er
        },
        {
            path: "*",
            redirect: "/login"
        },
    ]
})