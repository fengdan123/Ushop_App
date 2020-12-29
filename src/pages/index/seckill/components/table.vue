<template>
  <div class="table">
    <template>
      <el-table
        :data="seckill_req"
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="title" label="活动名称" width="180">
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
      seckill_req: "gengxin_seckill_req",
      seckill_one_req: "gengxin_seckill_one_req",
      cate_req: "gengxin_cate_req",
      goods_req: "gengxin_goods_req",
    }),
  },
  methods: {
    ...mapActions({
      get_seckill_req: "get_seckill_req",
      get_seckill_one_req: "get_seckill_one_req",
      sc_seckill_one_req: "sc_seckill_one_req",
      get_goods_req: "get_goods_req",
      get_cate_req: "get_cate_req",
    }),
    fn1(id) {
      this.get_seckill_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_goods_req().then((res) => {
            if (res.data.code == 200) {
              this.get_cate_req(true).then((res) => {
                if (res.data.code == 200) {
                  this.$store.state.seckill_is_tian = false;
                  this.$store.state.seckill_dialogFormVisible = true;
                }
              });
            }
          });
        }
      });
    },
    shanc(id) {
      this.sc_seckill_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_seckill_req(true);
        }
      });
    },
  },
  mounted() {
    this.get_seckill_req(true).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>