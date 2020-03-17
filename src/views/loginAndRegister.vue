<template>
  <div class="bg">
    <div class="login-container clearfix">
      <div class="left-container left">
        <div class="title">
          <span>登录</span>
        </div>
        <div class="input-container">
          <form>
            <div :class="['login-register-page',{focus:isFocus1}]">
              <input
                type="text"
                name="email"
                placeholder="邮箱:"
                autocomplete="off"
                @focus="underline(1)"
                @blur="underline(1)"
                v-model.lazy="email"
              />
            </div>
            <div :class="['login-register-page',{focus:isFocus2}]">
              <input
                type="password"
                name="password"
                placeholder="密码:"
                autocomplete="off"
                @focus="underline(2)"
                @blur="underline(2)"
                v-model.lazy="password"
              />
            </div>
          </form>
        </div>
        <div class="message-container clearfix">
          <span class="forget left">忘记密码？</span>
          <span
            class="login right"
            @click="login_click"
          >立即登录</span>
        </div>
      </div>
      <div class="right-container right">
        <div
          class="register-container"
          style="position:relative"
        >
          <tab-a :setAdminToUser="setAdminToUser"></tab-a>
          <div class="title">
            <span>注册</span>
          </div>
          <div class="input-container">
            <form>
              <div :class="['login-register-page',{focus:isFocus3},{error:reg_name_error}]">
                <input
                  type="text"
                  name="name"
                  placeholder="姓名:"
                  autocomplete="off"
                  @focus="underline(3)"
                  @blur="underline(3)"
                  v-model.lazy="reg_name"
                />
              </div>
              <div :class="['login-register-page',{focus:isFocus4},{error:reg_email_error}]">
                <input
                  type="text"
                  name="email"
                  placeholder="邮箱:"
                  autocomplete="off"
                  @focus="underline(4)"
                  @blur="underline(4)"
                  v-model.lazy="reg_email"
                />
              </div>
              <div :class="['login-register-page',{focus:isFocus5},{error:reg_password_error}]">
                <input
                  :type="is_i_password?'password':'text'"
                  name="password"
                  placeholder="密码:"
                  autocomplete="off"
                  @focus="underline(5)"
                  @blur="underline(5)"
                  v-model="reg_password"
                />
                <i
                  :class="['iconfont',{'icon-yanjing':isIconEye}]"
                  @click="transInput"
                ></i>
              </div>
              <div :class="['login-register-page',{focus:isFocus6},{error:reg_define_password_error}]">
                <input
                  type="password"
                  name="password"
                  placeholder="确认密码:"
                  autocomplete="off"
                  @focus="underline(6)"
                  @blur="underline(6)"
                  @change="checkDefinePassword"
                  v-model.lazy="definePassword"
                />
              </div>
            </form>
          </div>
          <div class="message-container clearfix register-p">
            <span
              class="login right"
              @click="click_reg"
            >立即注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabA from "@/components/tabA"
import jwt_decode from "jwt-decode"
export default {
  data() {
    return {
      isFocus1: false,
      isFocus2: false,
      isFocus3: false,
      isFocus4: false,
      isFocus5: false,
      isFocus6: false,
      is_i_password: true,
      power: false,//管理员 普通用户
      reg_name: "",
      reg_password: "",
      reg_email: "",
      definePassword: "",
      reg_name_error: false,
      reg_email_error: false,
      reg_password_error: false,
      reg_define_password_error: false,
      isIconEye: false,
      email: "",
      password: "",
    }
  },
  components: {
    tabA
  },
  methods: {
    login_click() {
      let checkAllLogin = []
      let isLoading = true
      checkAllLogin.push(this.checkLoginEmail(this.email))
      isLoading = !checkAllLogin.some((value) => {
        let istrue = value()
        return istrue === false
      })
      if (this.password === "") {
        isLoading = false
        setTimeout(() => {
          this.$message.error("密码不能为空")
        })
        return
      }
      if (isLoading) {
        this.submitLogin()
      }
    },
    async login_submit() {
      let responeData = await this.$ajax("/user/login", { email: this.email, password: this.password }, "POST").catch((err) => {
        console.log(err);
      })
      if (!responeData) {
        this.$message({
          type: "warn",
          message: "服务器出现未知错误，请稍后再试"
        })
        return
      }
      if (responeData["data"].code === 0) {
        new Promise((resolve) => {
          this.$message({
            type: "success",
            message: responeData["data"].message
          })
          setTimeout(resolve, 1000)
        }).then(() => {
          let token = responeData["data"].token.split(" ")[1] || responeData["data"].token
          window.localStorage.setItem("eleToken", token)
          const decode = jwt_decode(token)
          console.log(decode);
          this.$router.push("/index")
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    checkLoginEmail(email) {
      return () => {
        let pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        if (!pattern.test(email)) {
          this.$message.error('请填写正确的邮箱格式')
          return false
        }
      }
    },
    //动画
    underline(index) {
      this[`isFocus${index}`] = !this[`isFocus${index}`]
    },
    setAdminToUser(value) {
      this.power = value
    },
    checkRegname(reg_name) {
      let pattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!pattern.test(reg_name)) {
        this.$message.error('姓名格式不正确')
        this.reg_name_error = true
      } else {
        this.reg_name_error = false
      }
    },
    checkRegEmail(reg_email) {
      let pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      if (!pattern.test(reg_email)) {
        this.$message.error('请填写正确的邮箱格式')
        this.reg_email_error = true
      } else {
        this.reg_email_error = false
      }
    },
    checkRegPassword(reg_password) {

      let pattern = /^[A-Za-z0-9-=_+]{4,16}$/
      console.log(pattern.test(reg_password), reg_password);
      if (!pattern.test(reg_password)) {
        this.$message.error("密码格式错误")
        this.reg_password_error = true
      } else {
        this.reg_password_error = false
      }

    },
    checkDefinePassword() {
      if (this.reg_password_error) {
        this.reg_define_password_error = true
        return
      }

      if (this.definePassword !== this.reg_password) {
        this.$message.error("两次密码输入不一致")
        this.reg_define_password_error = true
      } else {
        this.reg_define_password_error = false
      }

    },
    transInput() {
      this.is_i_password = !this.is_i_password
    },
    click_reg() {
      let _self = this
      let isEmpty = _self.reg_name && _self.reg_password && _self.reg_email && _self.definePassword
      if (!isEmpty) {
        return _self.$message.error("所填信息不能为空")
      }
      let isPass = !_self.reg_name_error &&
        !_self.reg_email_error &&
        !_self.reg_password_error &&
        !_self.reg_define_password_error
      if (!isPass) {
        switch (true) {
          case _self.reg_name_error:
            _self.$message.error('姓名格式不正确')
            break;
          case _self.reg_email_error:
            _self.$message.error('请填写正确的邮箱格式')
            break;
          case _self.reg_password_error:
            _self.$message.error("密码格式错误,请重新填写注册")
            break;
          case _self.reg_define_password_error:
            this.$message.error("两次密码输入不一致")
            break;
        }
        return
      }
      this.submitRegister() // 节流每秒一次
    },
    async reg_submit() {
      let _self = this
      let responeData = await _self.$ajax("/user/register", {
        name: _self.reg_name,
        email: _self.reg_email,
        password: _self.reg_password,
        identity: _self.power
      }, "POST")
      responeData["data"].code === 0 ?
        this.$message({
          message: `${responeData["data"].message}`,
          type: "success"
        })
        : this.$message.error(`${responeData["data"].message}`)
    }
  },
  watch: {
    email(newValue) {
      this.checkLoginEmail(newValue)()
    },
    reg_name(newValue) {
      this.checkRegname(newValue)
    },
    reg_email(newValue) {
      this.checkRegEmail(newValue)
    },
    reg_password: {
      immediate: true,
      handler(newValue) {
        if (newValue.length !== 0) {
          this.d_checkRegPassword(newValue)
          this.isIconEye = true
        } else {
          this.isIconEye = false
        }
      }
    }

  },
  beforeCreate() {
    let checkRegPassword = (reg_password) => {
      let pattern = /^[A-Za-z0-9-=_+]{4,16}$/
      if (!pattern.test(reg_password)) {
        this.$message.error("密码格式错误")
        this.reg_password_error = true
      } else {
        this.reg_password_error = false
      }
    }
    this.d_checkRegPassword = this.$debounce(checkRegPassword, 350)
  },
  created() {
    this.submitRegister = this.$throttle(this.reg_submit, 1000)
    this.submitLogin = this.$throttle(this.login_submit, 500)
  },
}
</script>

<style lang="scss" scoped>
.icon-yanjing {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: darken(#695bc4, 20%);
  transform: translateY(1px);
  cursor: pointer;
  &:hover {
    color: darken(#695bc4, 50%);
  }
}
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom right,
    rgb(114, 135, 254),
    rgb(130, 88, 186)
  );
  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 700px;
    height: 300px;
    box-shadow: 0 10px 10px 0 rgb(59, 45, 159);
    border-radius: 15px;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgb(95, 76, 194);
    .message-container.register-p {
      margin-top: -2px;
    }
    .message-container {
      height: 25px;
      cursor: pointer;
      margin-top: 15px;
      color: rgb(199, 191, 219);
      font-size: 14px;
      transition: 0.1s;
      span {
        height: 100%;
        line-height: 25px;
      }
      .forget:hover {
        color: darken(rgb(199, 191, 219), 10%);
      }
      .login {
        color: darken(rgb(97, 97, 200), 20%);
        font-size: 16px;
        font-weight: bold;
      }
      .login:hover {
        color: darken(rgb(97, 97, 200), 30%);
      }
    }
    .title {
      color: #fff;
      font-size: 18px;
      span {
        border-bottom: 3px solid rgb(237, 221, 22);
      }
    }
    input {
      display: block;
      width: 90%;
      border: 0;
      outline: none;
      color: #999;
      font-size: 15px;
      padding: 10px 0;
      background-color: transparent;
    }
    .input-container {
      margin-top: 40px;
      form {
        margin-top: 15px;
      }
      form > div.login-register-page.focus {
        &::after {
          width: 100%;
          height: 1px;
          background-color: rgb(150, 142, 172);
        }
      }
      form > div.login-register-page.error {
        &::after {
          width: 100%;
          height: 1px;
          background-color: rgb(226, 7, 18);
        }
      }
      form > div.login-register-page {
        position: relative;
        &:after {
          position: absolute;
          content: "";
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 20px;
          height: 1px;
          background-color: transparent;
          transition: all 0.5s;
        }
      }
    }
    .left-container {
      box-sizing: border-box;
      padding: 60px 40px;
      width: 400px;
      height: 100%;
      float: left;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background-image: linear-gradient(
        to bottom right,
        rgb(118, 76, 163),
        rgb(92, 103, 211)
      );

      .input-container {
        margin-top: 40px;
        form {
          margin-top: 15px;
        }
      }
    }
    .right-container {
      box-sizing: border-box;
      padding: 60px 30px;
      width: 300px;
      height: 100%;
      background-color: rgb(105, 91, 196);
      float: right;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
  }
}

::-webkit-input-placeholder {
  color: rgb(199, 191, 219);
}
</style>