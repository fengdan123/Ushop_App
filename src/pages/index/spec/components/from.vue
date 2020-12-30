<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.spce_is_tian ? '添加商品规格' : '商品规格修改'"
      :visible.sync="$store.state.spec_dialogFormVisible"
      @close="close"
    >
      <el-form :model="spec" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="spec.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <div style="display: flex">
            <div
              style="
                flex: 1;
                border: 1px solid #999;
                border-radius: 5px;
                display: flex;
                flex-wrap: wrap;
              "
            >
              <span
                v-for="(i, index) in spec.attrs"
                :key="index"
                style="margin-right: 5px"
                >{{ i }}</span
              >
            </div>
            <el-button type="primary" style="height: 42px" @click="add"
              >新增规格属性</el-button
            >
          </div>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          v-for="(item, index) in spec.attrs"
          :key="index"
        >
          <div style="display: flex">
            <el-input v-model="spec.attrs[index]" type="text" style="flex: 1" />
            <el-button type="danger" style="height: 42px" @click="del(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="spec.status"
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
          v-if="$store.state.spec_is_tian"
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
      spec: {
        specsname: "",
        attrs: [""],
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "input" },
        ],
      },
    };
  },
  methods: {
    close() {
      this.spec = {
        specsname: "",
        attrs: [""],
        status: 1,
      };
      this.$refs.ruleForm.resetFields();
    },
    ...mapActions({
      tian_spec: "tian_spec",
      get_spec_req: "get_spec_req",
      gai_spec_one_req: "gai_spec_one_req",
      get_role_req: "get_role_req",
      get_spec_total_req: "get_spec_total_req",
    }),
    tian() {
      if(!this.spec.attrs.every(item=>item != "")){
        alert("属性值不能为空")
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.spec));
          obj.attrs = JSON.stringify(obj.attrs);
          this.tian_spec(obj).then((res) => {
            if (res.data.code == 200) {
              this.get_spec_total_req().then((res) => {
                if (res.data.code == 200) {
                  this.get_spec_req({
                    size: this.$store.state.spec_size,
                    page: this.$store.state.spec_page,
                  }).then((res) => {
                    this.$store.state.spec_dialogFormVisible = false;
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
          let obj = JSON.parse(JSON.stringify(this.spec));
          obj.attrs = JSON.stringify(obj.attrs);
          this.gai_spec_one_req(obj).then((res) => {
            if (res.data.code == 200) {
              this.get_spec_req({
                size: this.$store.state.spec_size,
                page: this.$store.state.spec_page,
              }).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.spec_dialogFormVisible = false;
                }
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    add() {
      this.spec.attrs.push("");
    },
    del(index) {
      this.spec.attrs.splice(index, 1);
    },
  },
  computed: {
    ...mapGetters({
      spec_dialogFormVisible: "gengxin_spec_dialogFormVisible",
    }),
  },
  watch: {
    spec_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.spec_is_tian) {
          this.spec = this.$store.state.spec_one_req[0];
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