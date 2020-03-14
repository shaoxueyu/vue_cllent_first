<template>
  <div id="page-404">
    <div
      class="container-404"
      ref="container"
    >
      <div class="content-404">
        <h2>404</h2>
        <h4>Opps! Page not found</h4>
        <p>The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved</p>
        <router-link to="/">Back To Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let container = this.$refs["container"]
    window.addEventListener("mousemove", (e) => {
      let x = e.clientX / 8,
          y = e.clientY / 8
      container.style.backgroundPositionX = x + "px"
      container.style.backgroundPositionY = y + "px"
    })

  }
}
</script>

<style lang="scss" scoped>
#page-404 {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #8500ff, #5acaff);
  .container-404 {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 3%;
    /* position: absolute;
    left: 10%;
    right: 10%;
    top: 7%;
    bottom: 7%; */
    width: 100%;
    height: 100%;
    background: url("../assets/images/404.png") #161e3c;
    color: aliceblue;
    border-radius: 15px;
    box-shadow: 0 10px 10px 0 darken(#121729, 75%);
    text-align: center;
    h2 {
      font-size: 10vw;
      color: #fff;
      line-height: 1em;
      text-align: center;
      font-weight: bolder;
    }
    h4 {
      display: inline-block;
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 15px;
      font-size: 1.5em;
      color: #111;
      font-weight: bold;
      line-height: 1em;
      text-align: center;
      margin-top: 2%;
    }
    p {
      margin-top: 2.5%;
      color: #fff;
      font-size: 1.2em;
    }
    .router-link-active {
      display: inline-block;
      padding: 10px 25px;
      background-color: #ff0562;
      color: #fff;
      text-decoration: none;
      margin-top: 25px;
      border-radius: 25px;
      &:hover {
        transition: 0.5s;
        background-color: darken(#ff0562, 10%);
        color: darken(#fff, 10%);
      }
    }
  }
}
</style>
