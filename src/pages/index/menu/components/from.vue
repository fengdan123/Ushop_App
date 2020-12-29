<template>
  <div class="from">
    <!-- Form -->
    <el-dialog
      :title="$store.state.is_tian ? '添加菜单' : '菜单修改'"
      :visible.sync="$store.state.dialogFormVisible"
      @close="close"
    >
      <el-form :model="menu">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="menu.pid"
            @change="menu.pid == 0 ? (menu.type = 1) : (menu.type = 0)"
          >
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="item in $store.state.menu_req"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="menu.type" disabled>目录</el-radio>
          <el-radio :label="0" v-model="menu.type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="menu.type == 1"
        >
          <el-select v-model="menu.icon">
            <el-option
              :label="item"
              :value="item"
              v-for="item in icons"
              :key="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="menu.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item"
              :value="'/' + item"
              :label="'/index' + '/' + item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="tian" v-if="$store.state.is_tian"
          >确 定</el-button
        >
        <el-button type="primary" @click="gai()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      menu: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRoutes: [
        "home",
        "menu",
        "manage",
        "role",
      ],
    };
  },
  methods: {
    tian() {
      this.$store.state.dialogFormVisible = false;
      this.tian_menu(this.menu).then((res) => {
        if (res.data.code == 200) {
          this.get_list(true);
        }
      });
    },
    ...mapActions({
      tian_menu: "tian_menu",
      get_list: "get_menu_req",
      get_menu_one_req: "get_menu_one_req",
      gai_menu_one_req: "gai_menu_one_req",
    }),
    close() {
      this.menu = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    gai() {
      this.gai_menu_one_req(this.menu).then((res) => {
        if (res.data.code == 200) {
          this.get_list(true).then((res) => {
            if (res.data.code == 200) {
              this.$store.state.dialogFormVisible = false;
            }
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      dialogFormVisible: "gengxin_dialogFormVisible",
    }),
  },
  watch: {
    dialogFormVisible(newVal, oldVal) {
      if (newVal) {
        if (!this.$store.state.is_tian) {
          this.menu = this.$store.state.menu_one_req;
          this.menu.id = this.$store.state.menu_id;
        }
      }
    },
  },
};
</script>

<style>
</style>