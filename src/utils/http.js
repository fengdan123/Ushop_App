import Vue from "vue"
import axios from "axios"
import qs from "qs"
import router from '../router'
import store from "../store"
let sl = new Vue({})
let str = "/api"
Vue.prototype.$pre = "http://localhost:3000"
    // str = ""
    // Vue.prototype.$pre = ""
let hshu = (res, obj) => {
    if (res.data.list == null) {
        res.data.list = []
    }
    if (res.data.code == 403) {
        sl.$message(res.data.msg)
        store.dispatch("tchu_login", {})
        return res
    }
    obj.isshow ? sl.$message(res.data.msg) : ""
    return res
}
export default (obj = {
    url,
    method,
    data,
    isshow
}) => {
    if (obj.method == "get" || obj.method == undefined) {
        return sessionStorage.getItem("user_info") == null ? axios({
            url: str + obj.url,
            method: obj.method,
            params: obj.data
        }).then(res => hshu(res, obj)) : axios({
            url: str + obj.url,
            method: obj.method,
            params: obj.data,
            headers: {
                authorization: JSON.parse(sessionStorage.getItem("user_info")).token
            }
        }).then(res => hshu(res, obj))
    } else if (obj.method == "post") {
        return sessionStorage.getItem("user_info") == null ? axios({
            url: str + obj.url,
            method: obj.method,
            data: obj.data
        }).then(res => hshu(res, obj)) : axios({
            url: str + obj.url,
            method: obj.method,
            data: obj.data,
            headers: {
                authorization: JSON.parse(sessionStorage.getItem("user_info")).token
            }
        }).then(res => hshu(res, obj))
    }
}