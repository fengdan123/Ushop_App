<template>
  <div class="table">
    <template>
      <el-table :data="role_req" style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="180">
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
            <el-button type="primary" @click="gai(scope.row.id)"
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
      role_req: "gengxin_role_req",
    }),
  },
  methods: {
    ...mapActions({
      get_role_req: "get_role_req",
      sc_role_one_req: "sc_role_one_req",
      get_role_one_req: "get_role_one_req",
    }),
    gai(id) {
      this.get_role_one_req(id);
    },
    shanc(id) {
      this.sc_role_one_req(id).then((res) => {
        console.log(res);
        this.$store.state.role_req = res.data.list;
      });
    },
  },
  mounted() {
    this.get_role_req();
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>