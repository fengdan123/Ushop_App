<template>
  <div class="login">
    <div>
      <h3>登录</h3>
      <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      <el-input
        v-model="user.password"
        placeholder="请输入密码"
        show-password
      ></el-input>
      <el-button type="primary" style="width: 100%" @click="login"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import req from "@/utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      req({
        url: "/api/userlogin",
        method: "post",
        data: this.user,
        isshow: true,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$store.state.user_info = res.data.list;
          sessionStorage.setItem("user_info",JSON.stringify(res.data.list))
          this.$router.push("/index");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login > div {
  width: 300px;
  height: 200px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
}
</style>