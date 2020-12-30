<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.banner_is_tian ? '添加轮播图' : '轮播图修改'"
      :visible.sync="$store.state.banner_dialogFormVisible"
      @close="close"
    >
      <el-form :model="banner" :rules="rules" ref="ruleForm">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="img">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="onChange"
            :before-upload="beforeAvatarUpload"
            ref="uploader"
            :on-progress="qx"
            :disabled="banner.pid == 0 ? true : false"
          >
            <img
              v-if="banner.img != null && banner.img != 'null'"
              :src="bs64"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="banner.status"
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
        <el-button @click="$store.state.banner_dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="tian()"
          v-if="$store.state.banner_is_tian"
          >添 加</el-button
        >
        <el-button type="primary" @click="gai()" v-else>修 改</el-button>
      </div>
      {{ banner }}
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      banner: {
        title: "",
        img: null,
        status: 1,
      },
      bs64: "",
      formLabelWidth: "120px",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "input" }],
        img: [{ required: true, message: "请放入图片", trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapActions({
      tian_banner: "tian_banner",
      get_banner_list: "get_banner_req",
      get_banner_one_req: "get_banner_one_req",
      gai_banner_one_req: "gai_banner_one_req",
    }),
    tian() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = new FormData();
          for (let item in this.banner) {
            data.append(item, this.banner[item]);
          }
          this.tian_banner(data).then((res) => {
            if (res.data.code == 200) {
              this.get_banner_list(true).then((res) => {
                this.$store.state.banner_dialogFormVisible = false;
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.banner = {
        title: "",
        img: null,
        status: 1,
      };
      this.bs64 = "";
      this.$refs.ruleForm.resetFields();
    },
    gai() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = new FormData();
          for (let item in this.banner) {
            data.append(item, this.banner[item]);
          }
          this.gai_banner_one_req(data).then((res) => {
            if (res.data.code == 200) {
              this.get_banner_list(true).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.banner_dialogFormVisible = false;
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    qx() {
      this.$refs.uploader.abort();
    },
    onChange(event) {
      this.banner.img = event.raw;
      this.getBase64(this.banner.img).then((res) => {
        this.bs64 = res;
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
  },
  computed: {
    ...mapGetters({
      banner_dialogFormVisible: "gengxin_banner_dialogFormVisible",
    }),
  },
  watch: {
    banner_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.banner_is_tian) {
          this.banner = this.$store.state.banner_one_req;
          this.banner.id = this.$store.state.banner_id;
          this.bs64 = this.$pre + this.banner.img;
        }
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