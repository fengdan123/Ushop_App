<template>
  <div class="table">
    <template>
      <el-table :data="banner_req" style="width: 100%" row-key="id" :tree-props="{children: 'children'}">
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="轮播图标题" width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope"><img :src="$pre+scope.row.img" style="width:100px;height:100px" v-if="scope.row.img != 'null'"></template>
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
      banner_req: "gengxin_banner_req",
      banner_one_req: "gengxin_banner_one_req",
    }),
  },
  methods: {
    ...mapActions({
      get_banner_list:"get_banner_req",
      get_banner_one_req: "get_banner_one_req",
      sc_banner_one_req: "sc_banner_one_req",
    }),
    fn1(id) {
      this.get_banner_one_req(id)
    },
    shanc(id) {
      this.sc_banner_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_banner_list(true);
        }
      });
    },
  },
  mounted(){
    this.get_banner_list(true)
  }
};
</script>

<style>
</style>