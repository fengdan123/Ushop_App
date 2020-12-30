<template>
  <div class="login">
    <el-form :rules="rules" :model="user" ref="ruleForm">
      <el-form-item label="用户名" prop="username" label-width="80px">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input
          v-model="user.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import req from "@/utils/http";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      tchu_login: "tchu_login",
    }),
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          req({
            url: "/api/userlogin",
            method: "post",
            data: this.user,
            isshow: true,
          }).then((res) => {
            if (res.data.code == 200) {
              this.tchu_login(res.data.list);
              this.$router.push("/index");
            }
          });
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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
.login > form {
  width: 400px;
  height: 250px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
}
.login > form > div {
  width: 100%;
}
</style>