<template>
  <!-- 个人信息 -->
  <div :class="['introduce-container','animated',{rubberBand:isAnimate}]">
    <div class="box">
      <div class="content">
        <h2>Introduce Myself</h2>
        <div class="user-info">
          <p>用户权限：{{userInfo.identity>=10000? "管理员":"普通用户"}} </p>
          <p>用户: {{userInfo.name}} </p>
          <p>详细介绍:</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAnimate: false
    }
  },
  computed: {
    userInfo(){
      return this.$store.getters.user
    }
  },
  methods: {
  },
  mounted() {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      })
    }).then((bool) => {
      this.isAnimate = bool
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 1000)
      })
    }).then((bool) => {
      this.isAnimate = bool
    })
  },
}

</script>
<style lang="scss">
.introduce-container {
  box-sizing: border-box;
  position: relative;
  font-family: "sunshineKing";
  border-radius: 25px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(139, 106, 172,.5);
    border-radius: 25px;
    z-index: -1;
    transform: skew(1deg, 1deg);
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vw;
    height: calc(100vh - 300px);
    background-color: rgba(255, 245, 247, 0.5);
    border-radius: 25px;
  }
  p{
    margin-top: 10px;
  }
  h2 {
    font-size: 25px;
    margin-bottom: 25px;
    text-align: center;
  }
}
.lightSpeedIn {
  animation-duration: 10s;
}
</style>