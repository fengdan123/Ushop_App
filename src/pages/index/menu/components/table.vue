<template>
  <div class="table">
    <template>
      <el-table :data="menu_req" style="width: 100%" row-key="id" :tree-props="{children: 'children'}">
        <el-table-column prop="id" label="菜单编号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标"></el-table-column>
        <el-table-column prop="url" label="菜单地址"></el-table-column>
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
      menu_req: "gengxin_menu_req",
      menu_one_req: "gengxin_menu_one_req",
    }),
  },
  methods: {
    ...mapActions({
      get_list:"get_menu_req",
      get_menu_one_req: "get_menu_one_req",
      sc_menu_one_req: "sc_menu_one_req",
    }),
    fn1(id) {
      this.get_menu_one_req(id);
    },
    shanc(id) {
      this.sc_menu_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_list(true);
        }
      });
    },
  },
};
</script>

<style>
</style>