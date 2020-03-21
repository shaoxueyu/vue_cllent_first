<template>
  <header class="head-nav">
    <el-row>
      <el-col
        :span="6"
        class="logo-container"
      >
        <img
          src="../assets/images/Logo.png"
          alt=""
          id="logo"
        >
      </el-col>
      <el-col
        :span="6"
        class="user user-container"
      >
        <div class="userinfo">
          <span class="avatar-container">
            <img
              src="../assets/images/avatar.png"
              alt=""
              class="avatar"
            >
          </span>

          <div class="welcome-container">
            <p class="welcome-name white">欢迎 <span>
                {{user.name}} </span></p>
          </div>
          <!-- 下拉箭头 -->
          <div class="drop-down-arrow">
            <el-dropdown
              trigger="click"
              @command="resolveMenuInfo"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
                <i class="font-sma">个人中心</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "head-nav",
  data() {
    return {

    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    resolveMenuInfo(cmdItem) {
      switch (cmdItem) {
        case "userInfo":
          this.showInfoList()
          break;
        case "logout":
          this.logout()
          break;
      }
    },
    showInfoList() {

    },
    logout() {
    /*   this.$confirm("确定要退出登录吗？", "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => { */
          //清除token
          localStorage.removeItem("eleToken")
          this.$store.dispatch("clearCurrentState")
          this.$router.push("/login")
        /* }).catch(() => { }) */



    }
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.font-sma {
  font-family: "sunshineKing", sans-serif;
  font-weight: bold;
  font-size: 16px;
}
.el-dropdown-link {
  cursor: pointer;
  color: cornsilk;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.head-nav {
  box-sizing: border-box;
  padding: 0 30px;
  width: 100%;
  height: 75px;
  background-color: #409eff;
  box-shadow: 0 0 5px 3px darken(#409eff, 20%);
  .user-container {
    float: right;
  }
  .el-row {
    height: 100%;
  }
  .logo-container {
    height: 75px;
    #logo {
      width: 265px;
      height: 75px;
    }
  }
  .user {
    .userinfo {
      display: flex;
      height: 75px;
      justify-content: center;
      align-items: center;
      .avatar-container {
        display: inline-flex;
        overflow: hidden;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        img {
          display: inline-block;
          width: 50px;
          height: 50px;
        }
      }
      .welcome-container {
        display: inline-block;
        margin-left: 15px;
        .welcome-name {
          font-family: "sunshineKing", sans-serif;
          color: #eee;
          font-weight: bold;
        }
      }
      .drop-down-arrow {
        margin-left: 15px;
      }
    }
  }
}
</style>
