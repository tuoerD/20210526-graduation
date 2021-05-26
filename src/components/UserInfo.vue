<template>
  <div class="basic-pane">
    <el-button
      type="primary"
      style="margin-right: -800px"
      v-if="!openEdit"
      @click="editInfo"
      >编辑</el-button
    >
    <div v-else>
      <el-button @click="cancelEdit">取消</el-button>
      <el-button type="primary" style="margin-right: -700px" @click="editInfo"
        >确认修改</el-button
      >
    </div>
    <!-- 用户基本信息 -->
    <ul class="form-card" style="list-style-type: none">
      <li>
        <label class="label-title">我的编号</label>
        <div v-if="!openEdit" style="margin-left: 100px">
          <p class="info-text">{{ userInfoForm.userId }}</p>
        </div>
        <div v-else>
          <el-input v-model="userInfoForm.userId" disabled></el-input>
        </div>
      </li>
      <li>
        <label class="label-title">我的昵称</label>
        <div v-if="!openEdit" style="margin-left: 100px">
          <p class="info-text">{{ userInfoForm.userName }}</p>
        </div>
        <div v-else><el-input v-model="userInfoForm.userName"></el-input></div>
      </li>
      <li>
        <label class="label-title">电话号码</label>
        <div v-if="!openEdit" style="margin-left: 100px">
          <p class="info-text">{{ userInfoForm.phoneNumber }}</p>
        </div>
        <div v-else>
          <el-input v-model="userInfoForm.phoneNumber"></el-input>
        </div>
      </li>
      <li>
        <label class="label-title">我的邮箱</label>
        <div v-if="!openEdit" style="margin-left: 100px">
          <p class="info-text">{{ userInfoForm.userEmail }}</p>
        </div>
        <div v-else><el-input v-model="userInfoForm.userEmail"></el-input></div>
      </li>
      <li>
        <label class="label-title">配送地址</label>
        <div v-if="!openEdit" style="margin-left: 100px">
          <p class="info-text">{{ userInfoForm.userAddress }}</p>
        </div>
        <div v-else>
          <el-input v-model="userInfoForm.userAddress"></el-input>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      openEdit: false,
      userInfoForm: {
        userId: "",
        userName: "",
        phoneNumber: "",
        userEmail: "",
        userAddress: "",
        userImage:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      },
    };
  },
  mounted() {
    this.initUser();
  },
  methods: {
    initUser() {
      this.userInfoForm.userId = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "/demo/user/updateUserInfo",
          this.$qs.stringify({
            userId: this.userInfoForm.userId,
          })
        )
        .then((res) => {
          this.$setSessionStorage("user", res.data);
          this.userInfoForm.userId = this.$getSessionStorage("user").userId;
          this.userInfoForm.userName = this.$getSessionStorage("user").userName;
          this.userInfoForm.phoneNumber = this.$getSessionStorage(
            "user"
          ).phoneNumber;
          this.userInfoForm.userEmail = this.$getSessionStorage(
            "user"
          ).userEmail;
          this.userInfoForm.userAddress = this.$getSessionStorage(
            "user"
          ).userAddress;
          if (this.$getSessionStorage("user").userImage) {
            this.userImage = this.$getSessionStorage("user").userImage;
          }
        })
        .catch((e) => {
          console.log(e);
        });

    },
    editInfo() {
      if (this.openEdit) {
        this.$axios
          .post("demo/user/editUserInfo", this.$qs.stringify(this.userInfoForm))
          .then((res) => {
            if(res.data)
            {
            this.$message.success("修改成功！");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.openEdit = !this.openEdit;
    },
    cancelEdit() {
      this.openEdit = !this.openEdit;
      this.userInfoForm=this.$getSessionStorage("user");
    },
  },
};
</script>

<style scoped>
.basic-pane {
  width: 60vw;
  height: 60vw;
  position: absolute;
  top: 400px;
  left: 20vw;
}
.form-card {
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  box-shadow: inset 4px 0 0 0 bisque;
}
.form-card li:first-child {
  border: 0;
}
.form-card li {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #dadce0;
  margin-left: 4px;
}
.form-card li div {
  margin-left: 50px;
}
.lable-title {
  padding: 0 24px;
  width: 150px;
  text-align: left;
}
.info-text {
  flex: 1;
  color: #5f6368;
  padding-right: 24px;
}
</style>