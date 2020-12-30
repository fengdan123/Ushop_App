<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="'会员修改'"
      :visible.sync="$store.state.member_dialogFormVisible"
      @close="close"
    >
      <el-form :model="member" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="member.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="member.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mma" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="member.status"
            active-color="#13ce66"
            :auto-upload="false"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="gai()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      member: {
        uid: 1,
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      mma: "",
      formLabelWidth: "120px",
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "input" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "input" }],
      },
    };
  },
  methods: {
    ...mapActions({
      tian_member: "tian_member",
      get_member_list: "get_member_req",
      get_member_one_req: "get_member_one_req",
      gai_member_one_req: "gai_member_one_req",
    }),
    close() {
      this.member = {
        uid: 1,
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
      this.mma = "";
      this.$refs.ruleForm.resetFields();
    },
    gai() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.mma.replace(/\s*/g, "") != "") {
            this.member.password = this.mma;
          }
          this.gai_member_one_req(this.member).then((res) => {
            if (res.data.code == 200) {
              this.get_member_list(true).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.member_dialogFormVisible = false;
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
      member_dialogFormVisible: "gengxin_member_dialogFormVisible",
    }),
  },
  watch: {
    member_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        this.member = this.$store.state.member_one_req;
      }
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>