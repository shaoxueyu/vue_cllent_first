<template>
  <div class="home-container">
    <div class="bg-home"></div>
    <h1 :class="['title','animated',{bounceInRight:isAnimate} ]">Sunshine King</h1>
    <p :class="['lead','animated',{bounceInRight:isAnimate}]">专注于深入剖析JavaScript</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAnimate: true
    }
  },
  methods: {
    animate() {
      setTimeout(() => {
        this.isAnimate = false
      })
    }
  },
  mounted() {
    
  },
}

</script>

<style lang="scss">
.home-container {
  position: relative;
  margin-top: 0px;
  width: 100%;
  height: 100%;

  font-family: "sunshineKing";
  color: aliceblue;
  .bg-home {
    position: absolute;
    z-index: -999;
    height: 100%;
    width: 100%;
    background: url(../assets/images/indexHome.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    &::after {
      left: 0;
      top: 0;
      z-index: -99;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .title {
    font-size: 7vw;
    text-align: center;
    padding-top: 40px;
    color: #a8d4fa;
  }
  .lead {

    margin-top: 50px;
    font-size: 3vw;
    text-align: center;
    padding-top: 40px;
    color: #a8d4fa;
    opacity: 0.5;
    animation-delay: 1s;
  }
}
</style>
