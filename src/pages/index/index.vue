<template>
  <div class="index">
    <!-- el-menu-item -->
    <!-- el-menu-item-group -->
    <!-- el-submenu -->
    <el-container style="min-height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="rgb(238, 241, 246)">
        <el-menu>
          <el-menu-item
            @click="$route.path != '/index/home' ? $router.push('/index') : ''"
          >
            <template slot="title"
              ><i class="el-icon-message"></i>首页</template
            >
          </el-menu-item>
          <div v-for="item in obj" :key="item.id">
            <el-submenu
              :index="item.id + ''"
              v-if="item.children && item.children.length != 0"
            >
              <template slot="title"
                ><i :class="item.icon"></i>{{ item.title }}</template
              >
              <el-menu-item-group v-if="item.children">
                <template slot="title"></template>
                <el-menu-item
                  :index="item.id + '/' + i.id"
                  v-for="i in item.children"
                  :key="i.id"
                  @click="
                    $route.path != '/index' + i.url
                      ? $router.push('/index' + i.url)
                      : ''
                  "
                  >{{ i.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <el-dropdown-menu>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ $store.state.user_info.username }}</span
          ><el-button type="danger" @click="tchu">退出登录</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/index' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menu_req: "gengxin_menu_req",
    }),
  },
  methods: {
    ...mapActions({
      get_list: "get_menu_req",
      tchu_login:"tchu_login"
    }),
    tchu() {
      this.tchu_login({})
    },
  },
  data() {
    return {
      obj: [],
    };
  },
  mounted() {
    this.get_list(true).then((res) => {
      this.obj = JSON.parse(JSON.stringify(res.data.list));
      this.obj.forEach((item) => {
        if (item.children && item.children.length != 0) {
          let objj = [];
          item.children.forEach((a) => {
            this.$store.state.user_info.menus.forEach((b) => {
              if (a.id == b.id) {
                objj.push(b);
              }
            });
          });
          item.children = objj;
        }
      });
    });
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>