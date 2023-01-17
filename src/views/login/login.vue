<template>
  <el-container id="login">
    <el-card class="loginBox">
      <!-- <img class="logoImg" src="/img/login/logo.png" alt> -->
      <p class="title">市直播平台系统</p>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="name">
          <el-input
            @keyup.enter.native="getLogin"
            class="nameInput"
            placeholder="请输入用户名"
            v-model="loginForm.userName"
          >
            <template slot="prepend">
              <p class="loginIconBox">
                <img class="loginIcon userIcon" src="/img/login/user-alt.png" alt />
              </p>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="getLogin"
            class="password"
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password"
          >
            <template slot="prepend">
              <p class="loginIconBox">
                <img class="loginIcon passwordIcon" src="/img/login/lock.png" alt />
              </p>
            </template>
          </el-input>
        </el-form-item>

        <el-row :gutter="10" class="verifier">
          <el-col :span="16">
            <el-form-item prop="verifi">
              <el-input @keyup.enter.native="getLogin" placeholder="验证码" v-model="loginForm.verifyCode" type="text">
                <template slot="prepend">
                  <p class="loginIconBox">验证码</p>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <img @click="getVerifyImg" class="verifyImg" :src="verifyImg" />
          </el-col>
        </el-row>

        <p class="loginTip">{{ loginTip }}</p>
        <el-button type="danger" class="loginBtn" @click="getLogin">登录</el-button>
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  name: 'login',
  data() {
    return {
      verifyImg: '',
      loginTip: '', //错误提示
      loginForm: {
        userName: '',
        password: '',
        verifyCode: '',
        uuid: '',
      },
      loginRules: {
        userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        verifyCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
      },
    }
  },
  mounted: function() {
    this.getVerifyImg()
    let that = this
    //自动注册跳过 输入
    // that.autoLogin();
    // passLogin
    that.passLogin()
  },
  methods: {
    passLogin() {
      //console.log(
      //   "%c passLogin   开始运行 跳过注册直接进入页面 ---->  ",
      //   "color:green"
      // );
      let that = this
      that.$router.replace({ name: 'index' })
    },
    autoLogin() {
      let that = this
      let params = {
        username: 'test',
        password: 'test',
      }
      // let token = Cookies.get("token");
      that.$api.common.login(params).then(({ data }) => {
        if (data && data.code === 0) {
          that.loginTip = ''
          Cookies.set('token', data.token, {})
          that.$router.replace({ name: 'index' })
        } else {
          that.loginTip = data.msg
          this.getVerifyImg()
          this.$message.error(data.msg)
        }
      })
    },
    getLogin() {
      var that = this
      that.$refs.loginForm.validate((valid) => {
        if (valid) {
          var params = {
            username: this.loginForm.userName,
            password: this.loginForm.password,
            uuid: this.loginForm.uuid,
            captcha: this.loginForm.verifyCode,
          }
          // let token = Cookies.get("token");
          that.$api.common.login(params).then(({ data }) => {
            if (data && data.code === 0) {
              that.loginTip = ''
              Cookies.set('token', data.token, {})
              //console.log("data.token--->", data.token);
              that.$router.replace({ name: 'index' })
            } else {
              that.loginTip = data.msg
              this.getVerifyImg()
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    getVerifyImg: function() {
      function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        })
      }
      this.loginForm.uuid = guid()
      this.verifyImg = this.$api.common.captcha(this.loginForm.uuid)
    },
  },
}
</script>
<style scoped>
.verifier {
  margin: 0;
}
</style>

<style>
#login {
  background-color: #4f5f6f;
  background-image: url(/img/login/loginBg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  width: 100%;
  height: 100%;
}

.loginBox {
  height: 360px;
  min-width: 406px;
  padding: 26px;
  /* padding-bottom: 50px; */
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 4px 6px 7px 1px #001e52 !important;
  overflow: visible;
}

.loginBox .el-form {
  position: absolute;
  top: 105px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 360px;
}

#login .el-col.el-col-8 {
  height: 42px;
}

#login .el-input {
  border-radius: 0;
  border: 1px solid #d8d8d8;
}

#login .el-input div,
#login .el-input input {
  border: none;
}

#login .loginBtn {
  width: 100%;
  background-color: #59c2e6;
  border-color: #59c2e6;
  border-radius: 0;
}

#login .verifyImg {
  height: 40px;
  width: 100%;
  border-radius: 4px;
}

#login .loginTip {
  font-size: 12px;
  height: 16px;
  margin: 14px 0;
  color: #f56c6c;
  text-indent: 5px;
  text-align: center;
}

#login .loginIcon {
  width: 24px;
}

#login .el-input div.el-input-group__prepend {
  padding-right: 0;
}

#login .title {
  font-size: 26px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 35px;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  font-family: SourceHanSansCN-Medium;
}

#login ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #7b7b7b;
}

#login :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #7b7b7b;
}

#login ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #7b7b7b;
}

#login :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #7b7b7b;
}

#login .loginBox .logoImg {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  border: 3px solid rgba(255, 255, 255, 0.7);
  border-radius: 17px;
  box-shadow: 4px 6px 16px 2px #112c62;
}

#login .el-form-item {
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 4px;
}
#login .el-form-item:last-child {
  margin-bottom: 0;
}

/* #login .el-form-item:last-of-type {
        border: none;
        background-color: initial;
    }

    #login .el-form-item:last-of-type input {
        background-color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: 4px;
    } */

#login .el-form-item input {
  background-color: rgba(255, 255, 255, 0);
}

#login .el-form-item .el-input {
  border: none;
}

#login .el-form-item__content,
#login .el-input,
#login .el-input .el-input-group__prepend {
  background-color: rgba(255, 255, 255, 0) !important;
}

#login .el-input .el-input-group__prepend {
  border-right: none;
}

#login .loginIcon {
  width: 18px;
  height: 22px;
}

#login .el-form-item input {
  color: #fff;
}

#login ::-webkit-input-placeholder {
  color: #fff;
}

#login :-moz-placeholder {
  color: #fff;
}

#login ::-moz-placeholder {
  color: #fff;
}

#login :-ms-input-placeholder {
  color: #fff;
}

#login .loginBtn {
  border-radius: 4px;
}

#login .loginIconBox {
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding-right: 20px;
  padding-left: 10px;
  color: #fff;
}
#login .el-form-item:last-of-type .el-input-group__prepend {
  padding-left: 16px;
}
#login .el-form-item:last-of-type .loginIconBox {
  padding-right: 10px;
  padding-left: 0px;
  color: #fff;
}
#login .el-form-item__error {
  margin-top: 2px;
}
</style>
