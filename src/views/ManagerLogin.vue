<template>
<div class="background">
  <div class="big-wai-form">
    <div class="container">
      <el-form :model="managerLoginForm" class="form-signin">
        <h2 class="form-signin-heading">请登录管理员账户</h2>
        <label class="sr-only" for="inputId">账号</label>
        <input
          id="inputId"
          class="form-control"
          type="managerId"
          placeholder="账号"
          required=""
          autofocus=""
          v-model="managerLoginForm.managerId"
        />
        <label class="sr-only" for="inputPassword">密码</label>
        <input
          id="inputPassword"
          class="form-control"
          type="password"
          placeholder="密码"
          required=""
          v-model="managerLoginForm.managerPsd"
        />

        <el-row style="float: left; margin-top: 10px">
          <el-button type="primary" @click="submitForm('managerLoginForm')"
            >登录</el-button
          >
          <el-button @click="toIndex">返回首页</el-button>
        </el-row>
      </el-form>
    </div>
  </div></div>
</template>

<script>
export default {
  name: "ManagerLogin",
  data() {
    return {
      managerLoginForm: {
        managerId: "",
        managerPsd: "",
      },
    };
  },
  methods: {
    toIndex() {
      this.$router.push({ path: "/index" });
    },
    submitForm(formName) {
      if (this.managerLoginForm.managerId == "") {
        this.$message.error("账号不能为空");
        return;
      }
      if (this.managerLoginForm.managerPsd == "") {
        this.$message.error("请输入密码");
        return;
      }
      //登录请求
      this.$axios
        .post("demo/manager/managerLogin", this.$qs.stringify(this.managerLoginForm))
        .then((res) => {
          let manager = res.data;
          if (manager == null || manager == "") {
            this.$message.error("管理员账号或密码不正确");
            return false;
          } else {
            this.$setSessionStorage("manager",manager);
            this.$router.push({ path: "/managerIndex" });
            this.$message.success("登录成功！");
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
input {
  margin-top: 10px;
}
.login-form {
  width: 500px;
  height: 300px;
  /* background: #eee; */
  /* border: 1px solid rgb(204, 204, 204); */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.background{
  width: 100%;
  height: 100vh;
  background-color: bisque;
}
.big-wai-form {
  padding-top: 180px;
}
.container {
  width: 750px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.form-signin {
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
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin-heading {
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
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin .form-control {
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