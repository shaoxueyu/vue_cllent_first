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
      domApp.style.width = document.documentElement.clientWidth + "px"
      domApp.style.height = document.documentElement.clientHeight + "px"
    }
  },
  mounted() {
    this.adaptiveScreen()
  },
}
</script>
<style lang="scss">
</style>
