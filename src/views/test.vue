<template>
  <div>
    asdas
  </div>
</template>

<script>
export default {
  methods: {
  },
  //fuck,element提供的弹窗有毒在切换路由的时候
  beforeRouteLeave(to, from, next) {
    if (to.path === "/login") {
      setTimeout(() => {
        this.$confirm("确定要退出登录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          window.localStorage.removeItem("eleToken")
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