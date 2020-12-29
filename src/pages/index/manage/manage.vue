<template>
  <div class="manage">
    <el-button type="primary" @click="tian">添加</el-button>
    <v-tabel></v-tabel>
    <v-from></v-from>
  </div>
</template>

<script>
import vTabel from "./components/table";
import vFrom from "./components/from"
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vTabel,
    vFrom
  },
  methods: {
    tian() {
      this.$store.state.manage_dialogFormVisible = true;
      this.$store.state.manage_is_tian = true;
    },
    ...mapActions({
      get_manage_total_req:"get_manage_total_req"
    })
  },
  computed: {
    ...mapGetters({
      manage_dialogFormVisible: "gengxin_manage_dialogFormVisible",
      manage_is_tian: "gengxin_manage_is_tian",
    }),
  },
  mounted(){
    this.get_manage_total_req()
  }
};
</script>

<style scoped>
.manage {
  margin-top: 20px;
}
</style>