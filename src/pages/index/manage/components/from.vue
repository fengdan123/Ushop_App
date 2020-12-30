<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.manage_is_tian ? '添加用户' : '用户修改'"
      :visible.sync="$store.state.manage_dialogFormVisible"
      @close="close"
    >
      <el-form :model="manage" :rules="rules" ref="ruleForm">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="manage.roleid">
            <el-option
              v-for="i in role_req"
              :key="i.id"
              :value="i.id"
              :label="i.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="manage.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="manage.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="manage.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      {{ manage }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.manage_dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          v-if="$store.state.manage_is_tian"
          @click="tian"
          >确 定</el-button
        >
        <el-button type="primary" @click="gai" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      manage: {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapActions({
      tian_manage: "tian_manage",
      get_manage_req: "get_manage_req",
      gai_manage_one_req: "gai_manage_one_req",
      get_role_req: "get_role_req",
      get_manage_total_req: "get_manage_total_req",
    }),
    close() {
      this.manage = {
        username: "",
        password: "",
        status: 1,
        roleid: "",
      };
      this.$refs.ruleForm.resetFields();
    },
    tian() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.tian_manage(this.manage).then((res) => {
            if (res.data.code == 200) {
              this.get_manage_total_req().then((res) => {
                if (res.data.code == 200) {
                  this.get_manage_req({
                    size: this.$store.state.manage_size,
                    page: this.$store.state.manage_page,
                  }).then((res) => {
                    this.$store.state.manage_dialogFormVisible = false;
                  });
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    gai() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.gai_manage_one_req(this.manage).then((res) => {
            if (res.data.code == 200) {
              this.get_manage_req({
                size: this.$store.state.manage_size,
                page: this.$store.state.manage_page,
              }).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.manage_dialogFormVisible = false;
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      manage_dialogFormVisible: "gengxin_manage_dialogFormVisible",
      role_req: "gengxin_role_req",
    }),
  },
  watch: {
    manage_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        this.get_role_req();
        if (!this.$store.state.manage_is_tian) {
          this.manage = this.$store.state.manage_one_req;
        }
      }
    },
  },
};
</script>

<style>
</style>