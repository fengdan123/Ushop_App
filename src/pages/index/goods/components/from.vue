<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.goods_is_tian ? '添加商品' : '商品修改'"
      :visible.sync="$store.state.goods_dialogFormVisible"
      @close="close"
      @opened="opened"
    >
      <el-form :model="goods" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="goods.first_cateid"
            @change="change(goods.first_cateid, true)"
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="(item, index) in cate_req"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select
            v-model="goods.second_cateid"
            :disabled="second_cate.length != 0 ? false : true"
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <div v-if="goods.first_cateid != 0">
              <el-option
                :label="item.catename"
                :value="item.id"
                v-for="item in second_cate"
                :key="item.id"
              ></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
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
          >
            <img
              v-if="goods.img != null && goods.img != 'null'"
              :src="bs64"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="goods.specsid"
            @change="changespec(goods.specsid, true)"
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <el-option
              :label="item.specsname"
              :value="item.id"
              v-for="(item, index) in spec_req"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select
            v-model="goods.specsattr"
            :disabled="second_spec.length != 0 ? false : true"
            multiple
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <div v-if="goods.specsid != 0">
              <el-option
                :label="item"
                :value="item"
                v-for="item in second_spec"
                :key="item"
              ></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="goods.isnew">是</el-radio>
          <el-radio :label="2" v-model="goods.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="goods.ishot">是</el-radio>
          <el-radio :label="2" v-model="goods.ishot">否</el-radio>
        </el-form-item>
        <el-form-item
          label="商品描述"
          :label-width="formLabelWidth"
          prop="description"
        >
          <div id="editor" v-if="$store.state.goods_dialogFormVisible"></div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goods.status"
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
        <el-button @click="$store.state.goods_dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="tian()"
          v-if="$store.state.goods_is_tian"
          >添 加</el-button
        >
        <el-button type="primary" @click="gai()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      bs64: "",
      second_cate: [],
      second_spec: [],
      formLabelWidth: "120px",
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "input" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "input" },
        ],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "input" },
        ],
        img: [{ required: true, message: "请放入图片", trigger: "change" }],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择商品属性", trigger: "change" },
        ],
        description: [
          { required: true, message: "请选择商品描述", trigger: "input" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      tian_goods: "tian_goods",
      get_goods_list: "get_goods_req",
      get_goods_one_req: "get_goods_one_req",
      gai_goods_one_req: "gai_goods_one_req",
      get_cate_req: "get_cate_req",
      get_spec_req: "get_spec_req",
    }),
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.goods.description);
    },
    tian() {
      this.goods.description = this.editor.txt.html();
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //let obj = {...this.goods}
          let data = new FormData();
          let obj = JSON.parse(JSON.stringify(this.goods));
          obj.img = this.goods.img;
          for (let item in obj) {
            if (item == "specsattr") {
              obj[item] = JSON.stringify(obj[item]);
            }
            data.append(item, obj[item]);
          }
          this.tian_goods(data).then((res) => {
            if (res.data.code == 200) {
              this.get_goods_list(true).then((res) => {
                this.$store.state.goods_dialogFormVisible = false;
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.goods = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.bs64 = "";
      this.second_cate = [];
      this.second_spec = [];
      this.$refs.ruleForm.resetFields();
    },
    gai() {
      this.goods.description = this.editor.txt.html();
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = new FormData();
          //let obj = {...this.goods}
          for (let item in this.goods) {
            data.append(item, this.goods[item]);
          }
          this.gai_goods_one_req(data).then((res) => {
            if (res.data.code == 200) {
              this.get_goods_list(true).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.goods_dialogFormVisible = false;
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
      this.goods.img = event.raw;
      this.getBase64(this.goods.img).then((res) => {
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
    change(id, b) {
      if (b) {
        this.goods.second_cateid = "";
      }
      let lis = this.cate_req.find((item) => {
        return item.id == id;
      });
      if (lis == undefined) {
        this.second_cate = [];
        return;
      }
      this.second_cate = lis.children;
      if (this.second_cate == undefined) {
        this.second_cate = [];
      }
    },
    changespec(id, b) {
      if (b) {
        this.goods.specsattr = "";
      }
      let lis = this.spec_req.find((item) => {
        return item.id == id;
      });
      if (lis == undefined) {
        this.second_spec = [];
        return;
      }
      this.second_spec = lis.attrs;
      if (this.second_spec == undefined) {
        this.second_spec = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      goods_dialogFormVisible: "gengxin_goods_dialogFormVisible",
      cate_req: "gengxin_cate_req",
      spec_req: "gengxin_spec_req",
    }),
  },
  watch: {
    goods_dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.goods_is_tian) {
          this.goods = this.$store.state.goods_one_req;
          if (this.editor) {
            this.editor.txt.html(this.goods.description);
          }
          this.goods.specsattr = this.goods.specsattr.split(",");
          this.change(this.goods.first_cateid, false);
          this.goods.id = this.$store.state.goods_id;
          this.bs64 = this.$pre + this.goods.img;
          this.changespec(this.goods.specsid, false);
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