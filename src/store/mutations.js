export let state = {
    //menu
    menu_req: [],
    dialogFormVisible: false,
    menu_one_req: {},
    is_tian: true,
    menu_id: 1,

    //role
    role_req: [],
    role_dialogFormVisible: false,
    role_one_req: {},
    role_is_tian: true,
    role_id: 1,

    //manage
    manage_req: [],
    manage_dialogFormVisible: false,
    manage_one_req: {},
    manage_is_tian: true,
    manage_id: 1,
    manage_total: 1,
    manage_size: 5,
    manage_page: 1,
    manage_max_page: 1,

    //cate
    cate_req: [],
    cate_dialogFormVisible: false,
    cate_one_req: {},
    cate_is_tian: true,
    cate_id: 1,

    //spec
    spec_req: [],
    spec_dialogFormVisible: false,
    spec_one_req: {},
    spec_is_tian: true,
    spec_id: 1,
    spec_total: 1,
    spec_size: 5,
    spec_page: 1,
    spec_max_page: 1,

    //banner
    banner_req: [],
    banner_dialogFormVisible: false,
    banner_one_req: {},
    banner_is_tian: true,
    banner_id: 1,

    //member
    member_req: [],
    member_dialogFormVisible: false,
    member_one_req: {},
    member_id: 1,

    //goods
    goods_req: [],
    goods_dialogFormVisible: false,
    goods_one_req: {},
    goods_is_tian: true,
    goods_id: 1,

    //seckill
    seckill_req: [],
    seckill_dialogFormVisible: false,
    seckill_one_req: {},
    seckill_is_tian: true,
    seckill_id: 1,


    //login
    user_info: sessionStorage.getItem("user_info") ? JSON.parse(sessionStorage.getItem("user_info")) : {},
    sye_list: []
}
export let getters = {
    //menu
    gengxin_menu_one_req(state) {
        return state.menu_one_req
    },
    gengxin_menu_req(state) {
        return state.menu_req
    },
    gengxin_dialogFormVisible(state) {
        return state.dialogFormVisible
    },
    gengxin_is_tian(state) {
        return state.is_tian
    },
    gengxin_menu_id(state) {
        return state.menu_id
    },

    //role
    gengxin_role_req(state) {
        return state.role_req
    },
    gengxin_role_one_req(state) {
        return state.role_one_req
    },
    gengxin_role_dialogFormVisible(state) {
        return state.role_dialogFormVisible
    },
    gengxin_role_is_tian(state) {
        return state.role_is_tian
    },
    gengxin_role_id(state) {
        return state.role_id
    },

    //manage
    gengxin_manage_req(state) {
        return state.manage_req
    },
    gengxin_manage_one_req(state) {
        return state.manage_one_req
    },
    gengxin_manage_dialogFormVisible(state) {
        return state.manage_dialogFormVisible
    },
    gengxin_manage_is_tian(state) {
        return state.manage_is_tian
    },
    gengxin_manage_id(state) {
        return state.manage_id
    },
    gengxin_manage_total(state) {
        return state.manage_total
    },
    gengxin_manage_max_page(state) {
        return state.manage_max_page
    },
    gengxin_manage_page(state) {
        return state.manage_page
    },
    gengxin_manage_size(state) {
        return state.manage_size
    },

    //cate
    gengxin_cate_one_req(state) {
        return state.cate_one_req
    },
    gengxin_cate_req(state) {
        return state.cate_req
    },
    gengxin_cate_dialogFormVisible(state) {
        return state.cate_dialogFormVisible
    },
    gengxin_cate_is_tian(state) {
        return state.cate_is_tian
    },
    gengxin_cate_id(state) {
        return state.cate_id
    },

    //spec
    gengxin_spec_req(state) {
        return state.spec_req
    },
    gengxin_spec_one_req(state) {
        return state.spec_one_req
    },
    gengxin_spec_dialogFormVisible(state) {
        return state.spec_dialogFormVisible
    },
    gengxin_spec_is_tian(state) {
        return state.spec_is_tian
    },
    gengxin_spec_id(state) {
        return state.spec_id
    },
    gengxin_spec_total(state) {
        return state.spec_total
    },
    gengxin_spec_max_page(state) {
        return state.spec_max_page
    },
    gengxin_spec_page(state) {
        return state.spec_page
    },
    gengxin_spec_size(state) {
        return state.spec_size
    },

    //banner
    gengxin_banner_one_req(state) {
        return state.banner_one_req
    },
    gengxin_banner_req(state) {
        return state.banner_req
    },
    gengxin_banner_dialogFormVisible(state) {
        return state.banner_dialogFormVisible
    },
    gengxin_banner_is_tian(state) {
        return state.banner_is_tian
    },
    gengxin_banner_id(state) {
        return state.banner_id
    },

    //member
    gengxin_member_one_req(state) {
        return state.member_one_req
    },
    gengxin_member_req(state) {
        return state.member_req
    },
    gengxin_member_dialogFormVisible(state) {
        return state.member_dialogFormVisible
    },
    gengxin_member_id(state) {
        return state.member_id
    },


    //goods
    gengxin_goods_one_req(state) {
        return state.goods_one_req
    },
    gengxin_goods_req(state) {
        return state.goods_req
    },
    gengxin_goods_dialogFormVisible(state) {
        return state.goods_dialogFormVisible
    },
    gengxin_goods_is_tian(state) {
        return state.goods_is_tian
    },
    gengxin_goods_id(state) {
        return state.goods_id
    },

    //seckill
    gengxin_seckill_one_req(state) {
        return state.seckill_one_req
    },
    gengxin_seckill_req(state) {
        return state.seckill_req
    },
    gengxin_seckill_dialogFormVisible(state) {
        return state.seckill_dialogFormVisible
    },
    gengxin_seckill_is_tian(state) {
        return state.seckill_is_tian
    },
    gengxin_seckill_id(state) {
        return state.seckill_id
    },

    //login
    gengxin_user_info(state) {
        return state.user_info
    },
    gengxin_sye_list(state) {
        return state.sye_list
    }
}
export let mutations = {}