<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">折扣化妆品销售网站后台管理系统</div>
    <div class="header-right">
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip
          :content="fullscreen ? '取消全屏' : '全屏'"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img src="../assets/img/manager.png" />
      </div>
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ managerId }}<i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div> 
</template>

<script>
import bus from "../js/bus";
export default {
  name: "Header",
  data() {
    return {
      collapse: false,
      fullscreen: false,
    };
  },
  computed: {
    managerId() {
      return this.$getSessionStorage("manager").managerId;
    },
  },
  methods: {
    //侧边栏折叠
    collapseChange() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    //全屏
    handleFullScreen() {
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullScreen) {
          document.msExitFullScreen();
        }
      } else {
        let element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullScreen) {
          element.msRequestFullScreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleCommand(command) {
      if (command == "logout") {
        sessionStorage.removeItem("manager");
        this.$router.push({ path: "/index" });
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  background-color: bisque;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #ffffff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  position: relative;
  float: left;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  margin-right: 5px;
  font-size: 24px;
  transform: rotate(45deg);
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
</style>