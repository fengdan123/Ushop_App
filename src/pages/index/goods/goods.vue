<template>
  <!-- 二级没做 -->
  <div class="goods">
    <el-button type="primary" @click="tian">添加</el-button>
    <v-tabel></v-tabel>
    <v-from></v-from>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vTabel from "./components/table";
import vFrom from "./components/from";
export default {
  components: {
    vTabel,
    vFrom,
  },
  methods: {
    tian() {
      this.get_cate_req(true).then((res) => {
        this.get_spec_req(true).then((res) => {
          this.$store.state.goods_dialogFormVisible = true;
          this.$store.state.goods_is_tian = true;
        });
      });
    },
    ...mapActions({
      get_cate_req:"get_cate_req",
      get_spec_req:"get_spec_req"
    })
  },
};
</script>

<style scoped>
.goods {
  margin-top: 20px;
}
</style>