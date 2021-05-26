<template>
  <div>
    <div class="logo-and-search">
      <!-- logo -->
      <div class="for-logo">
        <img src="../assets/logo.png" width="70vw" height="70vh" />
      </div>
      <!-- 搜索框 -->
      <div class="for-box">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          size="big"
        ></el-input>
      </div>
      <!-- 搜索按钮 -->
      <div class="for-btn">
        <el-button type="primary" icon="el-icon-search" @click="userSearch"
          >搜索</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    userSearch() {
      if (this.input == "") {
        this.$message.error("请输入内容");
      }
      else{
        //搜索请求
      this.$axios
        .post(
          "demo/product/productSearch",
          this.$qs.stringify({ input: this.input })
        )
        .then((res) => {
          this.$setSessionStorage("productMessage", res.data);
          this.$router.push({ path: "/classList" });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
  },
};
</script>

<style scoped>
.logo-and-search {
  height: 120px;
  width: 60%;
  margin: auto;
}
.for-logo {
  float: left;
  margin-top: 25px;
}
.for-box {
  width: 500px;
  float: left;
  margin-top: 45px;
  margin-left: 70px;
}
.for-btn {
  float: left;
  width: 90px;
  height: 30px;
  margin-top: 45px;
}
</style>