<template>
  <!-- 二级没做 -->
  <div class="seck">
    <el-button type="primary" @click="tian">添加</el-button>
    <v-tabel></v-tabel>
    <v-from></v-from>
  </div>
</template>

<script>
import vTabel from "./components/table";
import vFrom from "./components/from";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vTabel,
    vFrom,
  },
  computed: {
    ...mapGetters({
      cate_req: "gengxin_cate_req",
      goods_req: "gengxin_goods_req",
    }),
  },
  methods: {
    tian() {
      this.get_goods_req().then((res) => {
        if (res.data.code == 200) {
          this.get_cate_req(true).then((res) => {
            if (res.data.code == 200) {
              this.$store.state.seckill_is_tian = true;
              this.$store.state.seckill_dialogFormVisible = true;
            }
          });
        }
      });
    },
    ...mapActions({
      get_goods_req: "get_goods_req",
      get_cate_req: "get_cate_req",
    }),
  },
};
</script>

<style scoped>
.seck {
  margin-top: 20px;
}
</style>