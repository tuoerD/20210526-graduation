<template>
  <div class="user-setting">
    <el-form
      :label-position="labelPosition"
      label-width="200px"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="请输入旧密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="请设置新密码" prop="newPsd">
        <el-input v-model="ruleForm.newPsd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="请确认密码" prop="confirmPsd">
        <el-input v-model="ruleForm.confirmPsd" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      @click="submitForm('ruleForm')"
      style="margin-left: 80px"
      >立即修改</el-button
    >
    <el-button @click="resetForm('ruleForm')">重置</el-button>

    <div>
      <el-dialog :visible.sync="dialogFormVisible">
        您的账户信息发生变更，需要重新登录。
        <el-link @click="toLogin"><strong>去登录</strong></el-link>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdSetting",
  data() {
    return {
      dialogFormVisible:false,
      ruleForm: {
        userId:"",
        password: "",
        newPsd: "",
        confirmPsd: "",
      },
      
      rules: {
        password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        newPsd: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        confirmPsd: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted(){
    this.ruleForm.userId=this.$getSessionStorage("user").userId;
  },
  methods: {
    toLogin(){
      this.$setSessionStorage("user", null);
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm);
          if(this.ruleForm.newPsd!=this.ruleForm.confirmPsd)
          {
            this.$message.error("两次密码输入不一致！");
            return false;
          }
          this.$axios
            .post("demo/user/changePassword",this.$qs.stringify({userId:this.ruleForm.userId,password:this.ruleForm.password,newPsd:this.ruleForm.newPsd}))
            .then((res) => {
              if(res.data==1){
                this.$message.success("修改成功！");
                this.dialogFormVisible=true;
              }else{
                this.$message.error("原密码输入错误！");
              }
            })
            .catch((e) => {
              this.$message.error("服务器内部发生异常");
              console.log(e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.user-setting {
  width: 50vw;
  height: 20vw;
  position: absolute;
  top: 430px;
  left: 20vw;
}
</style>