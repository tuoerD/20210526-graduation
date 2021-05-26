<template>
  <div>
    <Top></Top>
    <div class="bread-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <!-- 头像 -->
      <div @click="uploadAvatar">
        <el-avatar :src="userImage" :size="80" title="点击编辑头像"></el-avatar>
        <h1>{{ userName }}</h1>
      </div>

      <el-dialog :visible.sync="isClickAvatar" @close="closeDialog">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8083/demo/user/UserAvatar"
          :data="{ userId: userId }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <el-button>确认修改</el-button> -->
      </el-dialog>

      <div>
        <el-menu :default-active="onRoutes" mode="horizontal" router>
          <template v-for="item in items">
            <template>
              <el-menu-item :index="item.index" :key="item.index">
                {{ item.title }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/Top.vue";
export default {
  components: { Top },
  name: "Person",
  data() {
    return {
      imageUrl: "",
      isClickAvatar: false,
      userImage:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      userId: "",
      userName: "",
      // phoneNumber:"",
      // userEmail:"",
      // userAddress:"",
      items: [
        {
          index: "UserInfo",
          title: "基本信息",
        },
        {
          index: "IdSetting",
          title: "修改密码",
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  mounted() {
    this.userId = this.$getSessionStorage("user").userId;
    this.userName = this.$getSessionStorage("user").userName;
    if (this.$getSessionStorage("user").userImage) {
      this.userImage = this.$getSessionStorage("user").userImage;
      
    }
  },
  methods: {
    uploadAvatar() {
      this.isClickAvatar = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$axios
        .post("demo/user/getUserById", this.$qs.stringify({userId:this.userId}))
        .then((res) => {
          let user = res.data;
          this.$setSessionStorage("user", user);
        })
        //异常
        .catch((error) => {
          console.log(error);
        });
      this.$message.success("修改头像成功！");
      // 
    },
    closeDialog(){
      window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.bread-top {
  /* float: left; */
  margin-left: 10px;
  margin-top: 20px;
}
.user-info {
  margin-top: 50px;
  width: 60vw;
  margin-inline-start: 20vw;
  /* display: block; */
}
.basic-pane {
  /* background: lemonchiffon; */
  margin: 30px 0px;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>