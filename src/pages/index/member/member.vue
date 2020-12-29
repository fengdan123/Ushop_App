<template>
  <!-- 二级没做 -->
  <div class="menu">
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
};
</script>

<style scoped>
.menu {
  margin-top: 20px;
}
</style>