<template>
<div class="background">
  <div class="big-wai-form">
    <div class="container">
      <el-form :model="registerForm" class="form-register">
        <h2 class="form-register-heading">请输入您的信息</h2>
        <label class="sr-only" for="inputUsername">用户名</label>
        <input
          id="inputUsername"
          class="form-control"
          type="username"
          placeholder="用户名"
          required=""
          autofocus=""
          v-model="registerForm.userName"
        />
        <label class="sr-only" for="inputEmail">邮箱地址</label>
        <input
          id="inputEmail"
          class="form-control"
          type="email"
          placeholder="邮箱地址"
          required=""
          v-model="registerForm.userEmail"
        />
        <label class="sr-only" for="inputPhonenum">手机号码</label>
        <input
          id="inputPhonenum"
          class="form-control"
          type="phonenumber"
          placeholder="手机号码"
          required=""
          v-model="registerForm.phoneNumber"
        />
        
        <label class="sr-only" for="inputPassword">密码</label>
        <input
          id="inputPassword"
          class="form-control"
          type="password"
          placeholder="密码"
          required=""
          v-model="registerForm.password"
        />
        <label class="sr-only" for="inputConfirm">确认密码</label>
        <input
          id="inputConfirm"
          class="form-control"
          type="password"
          placeholder="确认密码"
          required=""
          v-model="confirmPsd"
        />
        
        <el-row style="float: left; margin-top: 10px">
          <el-button type="primary"  @click="submitForm('registerForm')">注册</el-button>
          <el-button @click="toLogin">去登录</el-button>
          <el-button @click="toIndex">返回首页</el-button>
        </el-row>
      </el-form>
    </div>
  </div></div>
</template>

<script>
import Index from './Index.vue';
export default {
  components: { Index },
  name: "Register",
  data() {
    return {
      registerForm:{
        userName:"",
        userEmail:"",
        phoneNumber:"",
        password:"",
      },
      confirmPsd:"",
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toIndex() {
      this.$router.push({ path: "/Index" });
    },
    submitForm(formName) {
      if (this.registerForm.userName == "") {
        this.$message.error("用户名称不能为空");
        return;
      }
      if (this.registerForm.userEmail == "") {
        this.$message.error("用户邮箱不能为空");
        return;
      }
      if (this.registerForm.phoneNumber == "") {
        this.$message.error("用户电话不能为空");
        return;
      }
      if (this.registerForm.password == "") {
        this.$message.error("请输入密码");
        return;
      }
      if(this.confirmPsd==""){
        this.$message.error("请确认密码");
        return;
      }
      if(this.registerForm.password!=this.confirmPsd){
        this.$message.error("两次密码输入不一致");
        return;
      }
      //注册请求
      this.$axios
        .post("demo/user/Register", this.$qs.stringify(this.registerForm))
        .then((res) => {
          if(res== -1){
            this.$message.error("该邮箱已被注册");
            return false;
          }
          else{
            this.$message.success("注册成功！");
            this.$router.push({ path: "/login" });
            return true;
          }
        })
        //异常
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.register-form {
  width: 500px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
input {
  margin-top: 10px;
}
.background{
  width: 100%;
  height: 100vh;
  background-color: bisque;
}
.big-wai-form {
  padding-top: 120px;
}
.container {
  width: 750px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.form-register {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
h2 {
  font-size: 30px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
.form-register .form-register-heading,
.form-register .checkbox {
  margin-bottom: 10px;
}
.form-register-heading {
  text-align: left;
  padding-bottom: 20px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
.form-register input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-register .form-control {
  position: relative;
  height: auto;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-control {
  display: block;
  width: 100%;

  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;

  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-lg {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn {
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
}
button {
  -webkit-appearance: button;
  text-transform: none;
  overflow: visible;
  font-family: inherit;
  margin: 0;
  font: inherit;
}
.checkbox label {
  min-height: 20px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: 400;
  cursor: pointer;
}
.checkbox {
  margin-top: 10px;
}
label {
  display: inline-block;
  max-width: 100%;
}
* {
  box-sizing: border-box;
}
</style>