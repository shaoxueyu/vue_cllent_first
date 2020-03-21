<template>
  <el-row class="left-nav-container left">
    <el-col class="left-nav-content">
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        background-color="#2b374c"
        text-color="#a8d4fa"
        active-text-color="#409eff"
      >
        <router-link to="/index">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu
            v-if="item.children"
            :index="item.path"
            :key="item.path"
          >
            <template slot=title>
              <i :class="item.icon"></i>
              <span slot="title"> {{item.name}} </span>
            </template>
            <router-link
              v-for="(citem) in item.children"
              :to="`/index/${citem.path}`"
              :key="citem.path"
              class="menu-link"
            >
              <el-menu-item :index="citem.path">
                <i :class="citem.icon"></i>
                <span> {{citem.name}} </span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      //列表
      items: [
        {
          icon: "el-icon-s-management",
          name: "资金管理",
          path: "fundManage",
          children: [
            { icon: "el-icon-money", path: "fundlist", name: "资金流水" }
          ]
        },
        {
          icon: "el-icon-s-unfold",
          name: "信息管理",
          path: "infoManage",
          children: [
            { icon: "el-icon-s-custom", path: "infoshow", name: "个人信息" }
          ]
        }

      ]
    }
  },

}
</script>
<style lang="scss" scoped>
.router-link-exact-active {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.link-home {
  text-decoration: none;
}
.left-nav-container {
  margin-top: 1px;
  user-select: none;
  overflow: hidden;
  background-color: #2b374c;
  width: 13vw;
  height: 100%;
  box-shadow: 3px 2px 10px 0 darken(#2b374c, 20%);
  .el-submenu {
    box-shadow: 0 0 10px 0 darken(#2b374c, 20%);
  }
}

.el-menu-item {
  width: 13vw;
}
.el-submenu {
  width: 13vw;
}
.menu-link {
  text-decoration: none;
}
.el-submenu .el-submenu__title {
  box-shadow: 0 0 10px 0 darken(#2b374c, 20%) inset;
}
</style>