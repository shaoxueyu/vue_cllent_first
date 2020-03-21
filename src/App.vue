<template>
  <div
    id="app"
    ref="app"
  >
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    adaptiveScreen() {
      let resize = () => {
        this.setScreen()
        return () => {
          this.setScreen()
        }
      }
      window.addEventListener("resize", resize())
    },
    setScreen() {
      let domApp = this.$refs["app"]
      domApp.style.width = window.innerWidth + "px"
      domApp.style.height = window.innerHeight + "px"
    }
  },
  mounted() {
    this.adaptiveScreen()
  }
}
</script>
<style lang="scss">
#app{
  overflow: hidden;
}
</style>
