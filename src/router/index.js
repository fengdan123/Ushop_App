import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
Vue.use(Router)
    //11.导出二级路由

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

let hshu = (to, from, next) => {
    if (store.state.user_info.menus_url.includes(to.path.replace("/index", ""))) {
        next()
    } else {
        router.push("/index/home")
    }
}
let er = [{
        path: "home",
        component: () =>
            import ("@/pages/index/home/home"),
    },
    {
        path: "menu",
        name: "菜单列表",
        component: () =>
            import ("@/pages/index/menu/menu"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "role",
        name: "角色列表",
        component: () =>
            import ("@/pages/index/role/role"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "manage",
        name: "管理员列表",
        component: () =>
            import ("@/pages/index/manage/manage"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "cate",
        name: "商品分类列表",
        component: () =>
            import ("@/pages/index/cate/cate"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "spec",
        name: "规格列表",
        component: () =>
            import ("@/pages/index/spec/spec"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "banner",
        name: "轮播图列表",
        component: () =>
            import ("@/pages/index/banner/banner"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "member",
        name: "会员列表",
        component: () =>
            import ("@/pages/index/member/member"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "goods",
        name: "商品列表",
        component: () =>
            import ("@/pages/index/goods/goods"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "seckill",
        name: "活动列表",
        component: () =>
            import ("@/pages/index/seckill/seckill"),
        beforeEnter(to, from, next) {
            hshu(to, from, next)
        }
    },
    {
        path: "",
        redirect: "home"
    }
]
let router = new Router({
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
router.beforeEach((to, from, next) => {
    if (!store.state.user_info.token) {
        if (to.path == "/login") {
            next()
        } else {
            router.push("/login")
        }
    } else {
        next()
    }
})
export default router