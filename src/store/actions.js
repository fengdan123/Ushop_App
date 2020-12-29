import req from "@/utils/http"
export let actions = {
    //menu
    get_menu_req(context, istree) {
        return req({
            url: "/api/menulist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.menu_req = res.data.list
            }
            return res
        })
    },
    tian_menu(context, obj) {
        return req({
            url: "/api/menuadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_menu_one_req(context, id) {
        return req({
            url: "/api/menuinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.menu_one_req = res.data.list
                context.state.menu_id = id
                context.state.dialogFormVisible = true;
                context.state.is_tian = false;
            }
        })
    },
    sc_menu_one_req(context, id) {
        return req({
            url: "/api/menudelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_menu_one_req(context, obj) {
        return req({
            url: "/api/menuedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },

    //role
    get_role_req(context) {
        return req({
            url: "/api/rolelist",
        }).then(res => {
            if (res.data.code == 200) {
                context.state.role_req = res.data.list
            }
            return res
        })
    },
    tian_role(context, obj) {
        return req({
            url: "/api/roleadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    sc_role_one_req(context, id) {
        return req({
            url: "/api/roledelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    get_role_one_req(context, id) {
        return req({
            url: "/api/roleinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.role_one_req = res.data.list
                context.state.role_id = id
                context.state.role_dialogFormVisible = true;
                context.state.role_is_tian = false;
            }
        })
    },
    gai_role_one_req(context, obj) {
        return req({
            url: "/api/roleedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },

    //manage
    get_manage_req(context, obj) {
        return req({
            url: "/api/userlist",
            data: obj
        }).then(res => {
            if (res.data.code == 200) {
                context.state.manage_req = res.data.list
            }
            return res
        })
    },
    get_manage_total_req(context) {
        return req({
            url: "/api/usercount",
        }).then(res => {
            if (res.data.code == 200) {
                context.state.manage_total = res.data.list[0].total
                context.state.manage_max_page = Math.ceil(context.state.manage_total / context.state.manage_size)
            }
            return res
        })
    },
    tian_manage(context, obj) {
        return req({
            url: "/api/useradd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    sc_manage_one_req(context, uid) {
        return req({
            url: "/api/userdelete",
            method: "post",
            data: {
                uid
            },
            isshow: true
        })
    },
    get_manage_one_req(context, uid) {
        return req({
            url: "/api/userinfo",
            data: {
                uid
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.manage_one_req = res.data.list
                context.state.manage_id = uid
                context.state.manage_dialogFormVisible = true;
                context.state.manage_is_tian = false;
            }
        })
    },
    gai_manage_one_req(context, obj) {
        return req({
            url: "/api/useredit",
            method: "post",
            data: obj,
            isshow: true
        })
    },

    //cate
    get_cate_req(context, istree) {
        return req({
            url: "/api/catelist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.cate_req = res.data.list
            }
            return res
        })
    },
    tian_cate(context, obj) {
        return req({
            url: "/api/cateadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_cate_one_req(context, id) {
        return req({
            url: "/api/cateinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res)
                context.state.cate_one_req = res.data.list
                context.state.cate_id = id
                context.state.cate_dialogFormVisible = true;
                context.state.cate_is_tian = false;
            }
        })
    },
    sc_cate_one_req(context, id) {
        return req({
            url: "/api/catedelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_cate_one_req(context, obj) {
        return req({
            url: "/api/cateedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },

    //spec
    get_spec_req(context, obj) {
        return req({
            url: "/api/specslist",
            data: obj
        }).then(res => {
            if (res.data.code == 200) {
                res.data.list.forEach(item => {
                    let str = ""
                    item.attrs.forEach(i => {
                        str += (i + ",")
                    })
                    str = str.slice(0, str.length - 1)
                    item.attrs = JSON.parse(str)
                })
                context.state.spec_req = res.data.list
            }
            return res
        })
    },
    get_spec_total_req(context) {
        return req({
            url: "/api/specscount",
        }).then(res => {
            if (res.data.code == 200) {
                context.state.spec_total = res.data.list[0].total
                context.state.spec_max_page = Math.ceil(context.state.spec_total / context.state.spec_size)
            }
            return res
        })
    },
    tian_spec(context, obj) {
        return req({
            url: "/api/specsadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    sc_spec_one_req(context, id) {
        return req({
            url: "/api/specsdelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    get_spec_one_req(context, id) {
        return req({
            url: "/api/specsinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                res.data.list.forEach(item => {
                    let str = ""
                    item.attrs.forEach(i => {
                        str += (i + ",")
                    })
                    str = str.slice(0, str.length - 1)
                    item.attrs = JSON.parse(str)
                })
                context.state.spec_one_req = res.data.list
                context.state.spec_dialogFormVisible = true;
                context.state.spec_is_tian = false;
            }
        })
    },
    gai_spec_one_req(context, obj) {
        return req({
            url: "/api/specsedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },


    //banner
    get_banner_req(context, istree) {
        return req({
            url: "/api/bannerlist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.banner_req = res.data.list
            }
            return res
        })
    },
    tian_banner(context, obj) {
        return req({
            url: "/api/banneradd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_banner_one_req(context, id) {
        return req({
            url: "/api/bannerinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.banner_one_req = res.data.list
                context.state.banner_id = id
                context.state.banner_dialogFormVisible = true;
                context.state.banner_is_tian = false;
            }
        })
    },
    sc_banner_one_req(context, id) {
        return req({
            url: "/api/bannerdelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_banner_one_req(context, obj) {
        return req({
            url: "/api/banneredit",
            method: "post",
            data: obj,
            isshow: true
        })
    },

    //member
    get_member_req(context, istree) {
        return req({
            url: "/api/memberlist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.member_req = res.data.list
            }
            return res
        })
    },
    tian_member(context, obj) {
        return req({
            url: "/api/memberadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_member_one_req(context, uid) {
        return req({
            url: "/api/memberinfo",
            data: {
                uid
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.member_one_req = res.data.list
                context.state.member_uid = uid
                context.state.member_dialogFormVisible = true;
                return res
            }
        })
    },
    sc_member_one_req(context, id) {
        return req({
            url: "/api/memberdelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_member_one_req(context, obj) {
        return req({
            url: "/api/memberedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },


    //goods
    get_goods_req(context, istree) {
        return req({
            url: "/api/goodslist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.goods_req = res.data.list
            }
            return res
        })
    },
    tian_goods(context, obj) {
        return req({
            url: "/api/goodsadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_goods_one_req(context, id) {
        return req({
            url: "/api/goodsinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.goods_one_req = res.data.list
                context.state.goods_id = id
                return res
            }
        })
    },
    sc_goods_one_req(context, id) {
        return req({
            url: "/api/goodsdelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_goods_one_req(context, obj) {
        return req({
            url: "/api/goodsedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },


    //seckill
    get_seckill_req(context, istree) {
        return req({
            url: "/api/secklist",
            data: {
                istree
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.seckill_req = res.data.list
            }
            return res
        })
    },
    tian_seckill(context, obj) {
        return req({
            url: "/api/seckadd",
            method: "post",
            data: obj,
            isshow: true
        })
    },
    get_seckill_one_req(context, id) {
        return req({
            url: "/api/seckinfo",
            data: {
                id
            }
        }).then(res => {
            if (res.data.code == 200) {
                context.state.seckill_one_req = res.data.list
                context.state.seckill_id = id
                return res
            }
        })
    },
    sc_seckill_one_req(context, id) {
        return req({
            url: "/api/seckdelete",
            method: "post",
            data: {
                id
            },
            isshow: true
        })
    },
    gai_seckill_one_req(context, obj) {
        return req({
            url: "/api/seckedit",
            method: "post",
            data: obj,
            isshow: true
        })
    },
}