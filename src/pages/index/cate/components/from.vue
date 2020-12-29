<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.cate_is_tian ? '添加商品分类' : '商品分类修改'"
      :visible.sync="$store.state.cate_dialogFormVisible"
      @close="close"
    >
      <el-form :model="cate">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="cate.pid">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in $store.state.cate_req"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="cate.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="onChange"
            :before-upload="beforeAvatarUpload"
            ref="uploader"
            :on-progress="qx"
            :disabled="cate.pid == 0 ? true : false"
          >
            <img
              v-if="cate.img != null && cate.img != 'null'"
              :src="bs64"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cate.status"
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
        <el-button
          type="primary"
          @click="tian()"
          v-if="$store.state.cate_is_tian"
          >添 加</el-button
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
      cate: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      bs64: "",
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      tian_cate: "tian_cate",
      get_cate_list: "get_cate_req",
      get_cate_one_req: "get_cate_one_req",
      gai_cate_one_req: "gai_cate_one_req",
    }),
    tian() {
      let data = new FormData();
      for (let item in this.cate) {
        data.append(item, this.cate[item]);
      }
      this.tian_cate(data).then((res) => {
        if (res.data.code == 200) {
          this.get_cate_list(true).then((res) => {
            this.$store.state.cate_dialogFormVisible = false;
          });
        }
      });
    },
    close() {
      this.cate = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.bs64 = "";
    },
    gai() {
      let data = new FormData();
      for (let item in this.cate) {
        data.append(item, this.cate[item]);
      }
      this.gai_cate_one_req(data).then((res) => {
        if (res.data.code == 200) {
          this.get_cate_list(true).then((res) => {
            if (res.data.code == 200) {
              this.$store.state.cate_dialogFormVisible = false;
            }
          });
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
      this.cate.img = event.raw;
      this.getBase64(this.cate.img).then((res) => {
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
      cate_dialogFormVisible: "gengxin_cate_dialogFormVisible",
    }),
  },
  watch: {
    cate_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.cate_is_tian) {
          this.cate = this.$store.state.cate_one_req;
          this.cate.id = this.$store.state.cate_id;
          this.bs64 = this.$pre + this.cate.img
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