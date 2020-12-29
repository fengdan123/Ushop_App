<template>
  <div class="table">
    <template>
      <el-table :data="manage_req" style="width: 100%">
        <el-table-column prop="uid" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="180">
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
            <el-button type="primary" @click="gai(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="shanc(scope.row.uid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="$store.state.manage_total"
      @current-change="currentChange"
      :page-size="$store.state.manage_size"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      manage_req: "gengxin_manage_req",
    }),
  },
  methods: {
    ...mapActions({
      get_manage_req: "get_manage_req",
      sc_manage_one_req: "sc_manage_one_req",
      get_manage_one_req: "get_manage_one_req",
      get_manage_total_req:"get_manage_total_req"
    }),
    gai(id) {
      this.get_manage_one_req(id);
    },
    shanc(id) {
      this.sc_manage_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_manage_total_req().then(res=>{
            if(this.$store.state.manage_page > this.$store.state.manage_max_page){
              this.$store.state.manage_page -= 1
              if(this.$store.state.manage_page < 1){
                this.$store.state.manage_page = 1
              }
            }
            this.get_manage_req({size:this.$store.state.manage_size,page:this.$store.state.manage_page}).then(res=>{
              this.$store.state.manage_dialogFormVisible = false;
            })
          })
        }
      });
    },
    currentChange(a) {
      this.$store.state.manage_page = a
      this.get_manage_req({ size: 5, page: a })
    },
  },
  mounted() {
    this.get_manage_req({size:this.$store.state.manage_size,page:this.$store.state.manage_page});
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>