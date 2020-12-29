<template>
  <div class="role">
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
  methods: {
    tian() {
      this.$store.state.role_dialogFormVisible = true;
      this.$store.state.role_is_tian = true;
    },
  },
  computed: {
    ...mapGetters({
      role_dialogFormVisible: "gengxin_role_dialogFormVisible",
      role_is_tian: "gengxin_role_is_tian",
    }),
  },
};
</script>

<style scoped>
.role {
  margin-top: 20px;
}
</style>