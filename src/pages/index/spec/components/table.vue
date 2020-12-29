<template>
  <div class="table">
    <template>
      <el-table
        :data="spec_req"
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="规格编号" width="180">
        </el-table-column>
        <el-table-column prop="specsname" label="规格名称" width="180">
        </el-table-column>
        <el-table-column prop="attrs" label="规格属性">
          <template slot-scope="scope">
            <span
              v-for="i in scope.row.attrs"
              :key="i"
              style="
                color: #5aabff;
                padding: 5px 10px;
                background-color: #ecf5ff;
                display: inline-block;
                border-radius: 2px;
                text-align: center;
                border: 1px solid #d9ecff;
              "
              >{{ i }}</span
            >
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="$store.state.spec_total"
      @current-change="currentChange"
      :page-size="$store.state.spec_size"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      spec_req: "gengxin_spec_req",
      spec_one_req: "gengxin_spec_one_req",
    }),
  },
  methods: {
    ...mapActions({
      get_spec_req: "get_spec_req",
      sc_spec_one_req: "sc_spec_one_req",
      get_spec_one_req: "get_spec_one_req",
      get_spec_total_req: "get_spec_total_req",
    }),
    gai(id) {
      this.get_spec_one_req(id);
    },
    shanc(id) {
      this.sc_spec_one_req(id).then((res) => {
        if (res.data.code == 200) {
          this.get_spec_total_req().then((res) => {
            if (this.$store.state.spec_page > this.$store.state.spec_max_page) {
              this.$store.state.spec_page -= 1;
              if (this.$store.state.spec_page < 1) {
                this.$store.state.spec_page = 1;
              }
            }
            this.get_spec_req({
              size: this.$store.state.spec_size,
              page: this.$store.state.spec_page,
            }).then((res) => {
              this.$store.state.spec_dialogFormVisible = false;
            });
          });
        }
      });
    },
    currentChange(a) {
      this.$store.state.spec_page = a;
      this.get_spec_req({ size: 5, page: a });
    },
  },
  mounted() {
    this.get_spec_req({
      size: this.$store.state.spec_size,
      page: this.$store.state.spec_page,
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style>
</style>