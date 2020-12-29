<template>
  <div class="table">
    <template>
      <el-table :data="goods_req" style="width: 100%" row-key="id">
        <el-table-column prop="id" label="商品编号" width="100">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格" width="100">
        </el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope"
            ><img
              :src="$pre + scope.row.img"
              style="width: 100px; height: 100px"
              v-if="scope.row.img != 'null'"
          /></template>
        </el-table-column>
        <el-table-column prop="isnew" label="是否新品" width="100">
          <template slot-scope="scope">
            <div
              v-if="scope.row.isnew == 1"
              style="
                background-color: #409eff;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                border-radius: 2px;
              "
            >
              是
            </div>
            <div
              v-else
              style="
                background-color: #f56c6c;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                border-radius: 2px;
              "
            >
              否
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ishot" label="是否热卖" width="100">
          <template slot-scope="scope">
            <div
              v-if="scope.row.ishot == 1"
              style="
                background-color: #409eff;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                border-radius: 2px;
              "
            >
              是
            </div>
            <div
              v-else
              style="
                background-color: #f56c6c;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: white;
                border-radius: 2px;
              "
            >
              否
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button type="danger" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="fn1(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="shanc(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      goods_req: "gengxin_goods_req",
      goods_one_req: "gengxin_goods_one_req",
    }),
  },
  methods: {
    ...mapActions({
      get_goods_list: "get_goods_req",
      get_goods_one_req: "get_goods_one_req",
      sc_goods_one_req: "sc_goods_one_req",
      get_cate_req: "get_cate_req",
      get_spec_req: "get_spec_req",
    }),
    fn1(id) {
      this.get_goods_one_req(id).then((res) => {
        this.get_cate_req(true).then((res) => {
          this.get_spec_req(true).then((res) => {
            this.$store.state.goods_dialogFormVisible = true;
            this.$store.state.goods_is_tian = false;
          });
        });
      });
    },
    shanc(id) {
      this.sc_goods_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_goods_list(true);
        }
      });
    },
  },
  mounted() {
    this.get_goods_list(true);
  },
};
</script>

<style>
</style>