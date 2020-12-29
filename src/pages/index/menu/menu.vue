<template>
  <!-- 二级没做 -->
  <div class="menu">
    <el-button type="primary" @click="tian">添加</el-button>
    <v-tabel></v-tabel>
    <v-from></v-from>
  </div>
</template>

<script>
import vTabel from "./components/table";
import vFrom from "./components/from";
export default {
  components: {
    vTabel,
    vFrom,
  },
  data() {
    return {
      dialogFormVisible: this.$store.state.dialogFormVisible,
    };
  },
  methods:{
    tian(){
      this.$store.state.dialogFormVisible = true
      this.$store.state.is_tian = true
    }
  }
};
</script>

<style scoped>
.menu {
  margin-top: 20px;
}
</style>