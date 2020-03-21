<template>
  <div class="user-info-show-container">
    <div
      class="user-info-show-bg"
      ref="bg"
    ></div>
  </div>
</template>
<script>
export default {
  mounted() {
    let container = this.$refs["bg"]
    window.addEventListener("mousemove", (e) => {
      let x = e.clientX / 8,
        y = e.clientY / 8
      container.style.backgroundPositionX = x + "px"
      container.style.backgroundPositionY = y + "px"
    })
  },
}
</script>
<style lang="scss">
.user-info-show-container {
  position: relative;
  width: 100%;
  height: 100%;
  .user-info-show-bg {
    z-index: -999;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/userInfoBg.png");
    &::after{
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -998;
      background-color: rgba(155,155,155,.5);
    }
  }

}
</style>