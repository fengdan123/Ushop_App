<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.role_is_tian ? '添加角色' : '角色修改'"
      :visible.sync="$store.state.role_dialogFormVisible"
      @close="close"
    >
      <el-form :model="role" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="role.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-select
            v-for="item in $store.state.menu_req"
            :key="item.id"
            v-model.trim="role.menus"
            multiple="multiple"
          >
            <el-option
              :label="item.title"
              :key="item.id"
              :value="item.id"
              disabled
            ></el-option>
            <div v-if="item.children">
              <el-option
                v-for="i in item.children"
                :key="i.id"
                :value="i.id"
                :label="i.title"
              ></el-option>
            </div>
          </el-select>
        </el-form-item> -->
        <el-form-item label="角色权限" :label-width="formLabelWidth" prop="menus">
          <div v-for="item in $store.state.menu_req" :key="item.id">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">{{
              item.title
            }}</el-checkbox>
            <div style="margin: 15px 0"></div>
            <el-checkbox-group v-model="role.menus" v-if="item.children">
              <el-checkbox
                v-for="i in item.children"
                :label="i.id"
                :key="i.id"
                >{{ i.title }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="role.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.role_dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" v-if="$store.state.role_is_tian" @click="tian"
          >确 定</el-button
        >
        <el-button type="primary" @click="gai()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      role: {
        rolename: "",
        menus: [],
        status: 1,
      },
      formLabelWidth: "120px",
      checkAll: false,
      isIndeterminate: true,
      rules: {
        rolename: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        menus: [
          { required: true, message: "请选择角色权限", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      tian_role: "tian_role",
      get_role_req: "get_role_req",
      gai_role_one_req: "gai_role_one_req",
      tchu_login: "tchu_login",
    }),
    close() {
      this.role = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$refs.ruleForm.resetFields();
    },
    tian() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.role));
          obj.menus = JSON.stringify(obj.menus);
          this.tian_role(obj).then((res) => {
            if (res.data.code == 200) {
              this.get_role_req().then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.role_dialogFormVisible = false;
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
          let obj = JSON.parse(JSON.stringify(this.role));
          obj.menus = JSON.stringify(obj.menus);
          this.gai_role_one_req(obj).then((res) => {
            if (res.data.code == 200) {
              if (this.user_info.roleid == this.role.id) {
                let lis = this.user_info.menus.map((item) => item.id);
                if (lis.length != this.role.menus.length) {
                  this.tchu_login({});
                } else {
                  if (
                    !lis.every((item) =>
                      this.role.menus.some((i) => i.id == item.id)
                    )
                  ) {
                    this.tchu_login({});
                  }
                }
              }
              this.get_role_req().then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.role_dialogFormVisible = false;
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
      role_dialogFormVisible: "gengxin_role_dialogFormVisible",
      user_info: "gengxin_user_info",
      role_one_req: "gengxin_role_one_req",
    }),
  },
  watch: {
    role_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.role_is_tian) {
          let obj = JSON.parse(JSON.stringify(this.$store.state.role_one_req));
          obj.menus = JSON.parse(obj.menus);
          obj.id = this.$store.state.role_id;
          this.role = obj;
        }
      }
    },
  },
};
</script>

<style>
</style>