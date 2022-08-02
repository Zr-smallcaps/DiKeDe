<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <el-avatar :size="70" src="http://likede2-admin.itheima.net/img/logo.595745bd.png" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="" prop="code">
        <div class="loginFormImage">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" />
          <span class="FormImage" @click="refreshCode">
            <el-image style="width: 90px; height: 60px;" :src="verificationCode" fit="contain" />
          </span>
        </div>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { debounce } from "lodash"
import { login } from '@/api/user'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapLoginActions, mapState: mapLoginState } =
  createNamespacedHelpers('user')

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        code:''

      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入正确的用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入正确的密码'  }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapLoginState(['verificationCode','randomCode'])
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.GetVerificationCode()
  },
  methods: {
    ...mapLoginActions(['GetVerificationCode','setUserInfo']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
   async handleLogin() {
    await this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
        try{
          const res = login({
            loginName:this.loginForm.username,
            password:this.loginForm.password,
            code:this.loginForm.code,
            clientToken:this.randomCode,
            loginType:0
          })
          this.setUserInfo(res)
          this.loading = false
          this.$router.push('/dashboard')
          }catch(error){
            console.log('登录失败')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refreshCode: debounce(function () {
    this.GetVerificationCode()

}, 2000)
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-image: url('http://likede2-admin.itheima.net/img/background.be4fae7d.png');

  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -194px;
    margin-left: -259px;
    width: 520px;
    height: 388px;
    padding: 76px 35px 0;
    background-color: #fff;
    border-radius: 10px;
    .title-container {
      position: absolute;
      left: 230px;
      top: -35px;
      .el-avatar {
        background-color: #fff;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginFormImage {
    position: relative;
    .FormImage {
      position: absolute;
      top: 0;
      right: 10px;
    }
  }
}
</style>
