<template>
  <!-- 二级没做 -->
  <div class="spec">
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
  data() {
    return {};
  },
  methods: {
    tian() {
      this.$store.state.spec_dialogFormVisible = true;
      this.$store.state.spec_is_tian = true;
    },
    ...mapActions({
      get_spec_total_req: "get_spec_total_req",
    }),
  },
  mounted() {
    this.get_spec_total_req()
  },
};
</script>

<style scoped>
.spec {
  margin-top: 20px;
}
</style>