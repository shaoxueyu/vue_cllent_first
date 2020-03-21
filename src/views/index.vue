<template>
  <div id="index-page">
    <head-nav />
    <div class="clearfix index-container">
      <left-nav />
      <right-container />
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode"
import HeadNav from "../components/HeadNav"
import LeftNav from "../components/leftNav"
import RightContainer from "@/views/rightContainer"
import { mapActions } from "vuex"
export default {
  created() {
    this.token = localStorage.getItem("eleToken")
    // 对token再做一次判断
    if (!this.token) {
      this.$router.push("/login")
      return
    }
    //获取token
    const decode = jwt_decode(this.token)
    this.set_authenticated(true)
    this.set_user(decode)

  },
  components: {
    [HeadNav.name]: HeadNav,
    LeftNav,
    RightContainer

  },
  methods: {
    ...mapActions(["set_authenticated", "set_user"]),
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/login" && this.token) {
      setTimeout(() => {
        this.$confirm("确定要退出登录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.localStorage.removeItem("eleToken")
          this.$store.dispatch("clearCurrentState")
          next()
        }).catch(() => {
          next(false)
        })
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss">
@mixin setWidthAndHeight() {
  width: 100%;
  height: 100%;
}
#index-page {
  width: 100%;
  height: 100%;
  .index-container {
    height: calc(100% - 75px);
  }
}
</style> 