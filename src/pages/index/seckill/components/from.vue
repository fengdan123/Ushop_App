<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.seckill_is_tian ? '添加活动' : '活动修改'"
      :visible.sync="$store.state.seckill_dialogFormVisible"
      @close="close"
    >
      <el-form :model="seckill" :rules="rules" ref="ruleForm">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="活动期限"
          :label-width="formLabelWidth"
          prop="value1"
        >
          <div class="block">
            <el-date-picker
              v-model="seckill.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="seckill.first_cateid"
            @change="change(seckill.first_cateid)"
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
            v-model="seckill.second_cateid"
            :disabled="second_cate.length != 0 ? false : true"
            @change="change1(seckill.second_cateid)"
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <div v-if="seckill.first_cateid != 0">
              <el-option
                :label="item.catename"
                :value="item.id"
                v-for="item in second_cate"
                :key="item.id"
              ></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth" prop="goodsid">
          <el-select
            v-model="seckill.goodsid"
            :disabled="goods.length != 0 ? false : true"
          >
            <el-option value disabled label="---请选择---"
              >---请选择---</el-option
            >
            <el-option
              :label="item.goodsname"
              :value="item.id"
              v-for="(item, index) in goods"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seckill.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.seckill_dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="tian"
          v-if="$store.state.seckill_is_tian"
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
      seckill: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        value1: [],
      },
      formLabelWidth: "120px",
      second_cate: [],
      goods: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "input" },
        ],
        value1: [
          { required: true, message: "请选择活动期限", trigger: "change" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsid: [{ required: true, message: "请选择商品", trigger: "change" }],
      },
    };
  },
  methods: {
    tian() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.seckill.begintime = this.seckill.value1[0];
          this.seckill.endtime = this.seckill.value1[1];
          this.tian_seckill(this.seckill).then((res) => {
            if (res.data.code == 200) {
              this.get_seckill_req(true).then((res) => {
                this.$store.state.seckill_dialogFormVisible = false;
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    ...mapActions({
      tian_seckill: "tian_seckill",
      get_seckill_req: "get_seckill_req",
      get_seckill_one_req: "get_seckill_one_req",
      gai_seckill_one_req: "gai_seckill_one_req",
      get_cate_req: "get_cate_req",
      get_goods_req: "get_goods_req",
    }),
    close() {
      this.seckill = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        value1: [],
      };
      this.second_cate = [];
      this.goods = [];
      this.$refs.ruleForm.resetFields();
    },
    gai() {
      this.gai_seckill_one_req(this.seckill).then((res) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (res.data.code == 200) {
              this.get_seckill_req(true).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.seckill_dialogFormVisible = false;
                }
              });
            }
          } else {
            return false;
          }
        });
      });
    },
    change(id) {
      this.seckill.second_cateid = "";
      this.seckill.goodsid = "";
      let lis = this.cate_req.find((item) => {
        return item.id == id;
      });
      if (lis == undefined) {
        this.second_cate = [];
        return;
      }
      if (lis.children == undefined) {
        this.second_cate = [];
        return;
      }
      this.second_cate = lis.children;
    },
    change1(id) {
      this.seckill.goodsid = "";
      this.goods = []
      this.goods_req.forEach((item) => {
        if (item.second_cateid == id) {
          this.goods.push(item);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      cate_req: "gengxin_cate_req",
      goods_req: "gengxin_goods_req",
      dialogFormVisible: "gengxin_seckill_dialogFormVisible",
    }),
  },
  watch: {
    dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.seckill_is_tian) {
          this.seckill = this.$store.state.seckill_one_req;
          this.seckill.id = this.$store.state.seckill_id;
          this.seckill.value1 = []
          this.$set(this.seckill.value1, 0, this.seckill.begintime);
          this.$set(this.seckill.value1, 1, this.seckill.endtime);
          this.second_cate = this.$store.state.cate_req.find(
            (item) => item.id == this.seckill.first_cateid
          ).children;
          this.$store.state.goods_req.forEach((item) => {
            if (item.second_cateid == this.seckill.second_cateid) {
              this.goods.push(item);
            }
          });
        }
      }
    },
  },
};
</script>

<style>
</style>