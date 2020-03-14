<template>
  <div class="tab-container">
    <label class="admin-user">
      <input
        type="checkbox"
        v-model="value"
      >
      <span class="check"></span>
      <span class="btn"></span>
    </label>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    }
  },
  methods: {
  },
  watch: {
    value(newvalue) {
        this.setAdminToUser(newvalue)
    }
  },
  props: ["setAdminToUser"]
}
</script>
<style lang="scss" scoped>
.tab-container {
  position: absolute;
  top: -17%;
  right: 18%;
  width: 100px;
  height: 30px;
  .admin-user {
    position: absolute;
    width: 100px;
    height: 30px;
    input {
      opacity: 0;
      &:checked ~ .btn {
        transition: 0.5s;
        left: 50%;
      }
      &:checked ~ .check::before {
        transition: 0.5s;
        color: transparent;
        text-shadow: 0 0 5px transparent;
      }
      &:checked ~ .check::after {
        transition: 0.5s;
        color: darken(#695bc4, 30%);
        text-shadow: 0 0 5px #695bc4;
      }
    }
    span {
      position: absolute;
      &.check {
        left: 0;
        top: 0;
        width: 100px;
        height: 30px;
        background-color: rgba(181, 122, 286, 0.5);
        border-radius: 50px;
        &::before {
          font-family: "Songti SC";
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
          content: "用户";
          position: absolute;
          color: darken(#695bc4, 30%);
          text-shadow: 0 0 5px #695bc4;
          font-weight: bolder;
          left: -40px;
          transition: 0.5s;
        }
        &::after {
          font-family: "Songti SC";
          display: flex;
          height: 100%;
          width: 50px;
          justify-content: center;
          align-items: center;
          content: "管理员";
          position: absolute;
          color: transparent;
          text-shadow: 0 0 5px transparent;
          font-weight: bolder;
          left: calc(100% + 10px);
          transition: 0.5s;
        }
      }
      &.btn {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 50%;
        border-radius: 25px;
        background-color: #695bc4;
        box-shadow: 0 -6px 7px darken(#695bc4, 5%) inset,
          0 6px 7px darken(#695bc4, 5%) inset;
        transition: 0.5s;
        /* border-top-left-radius: 25px;
        border-bottom-left-radius: 25px; */
        &::before {
          content: "";

          background: blue;
        }
      }
    }
  }
}
</style>