import Vue from "vue"
import axios from "axios"
import qs from "qs"
import router from '../router'
let sl = new Vue({
    router
})
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
        setTimeout(() => {
            sl.$router.push("/login");
        }, 2000);
        return
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
        return localStorage.getItem("user") == null ? axios({
            url: str + obj.url,
            method: obj.method,
            params: obj.data
        }).then(res => hshu(res, obj)) : axios({
            url: str + obj.url,
            method: obj.method,
            params: obj.data,
            headers: {
                authorization: JSON.parse(localStorage.getItem("user")).token
            }
        }).then(res => hshu(res, obj))
    } else if (obj.method == "post") {
        return localStorage.getItem("user") == null ? axios({
            url: str + obj.url,
            method: obj.method,
            data: obj.data
        }).then(res => hshu(res, obj)) : axios({
            url: str + obj.url,
            method: obj.method,
            data: obj.data,
            headers: {
                authorization: JSON.parse(localStorage.getItem("user")).token
            }
        }).then(res => hshu(res, obj))
    }
}