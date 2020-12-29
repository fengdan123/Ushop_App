<template>
  <div class="table">
    <template>
      <el-table :data="member_req" style="width: 100%" row-key="uid">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
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
            <el-button type="primary" @click="fn1(scope.row.uid)"
              >编辑</el-button
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
      member_req: "gengxin_member_req",
      member_one_req: "gengxin_member_one_req",
    }),
  },
  methods: {
    ...mapActions({
      get_member_list:"get_member_req",
      get_member_one_req: "get_member_one_req",
      sc_member_one_req: "sc_member_one_req",
    }),
    fn1(uid) {
      this.get_member_one_req(uid)
    },
  },
  mounted(){
    this.get_member_list(true)
  }
};
</script>

<style>
</style>