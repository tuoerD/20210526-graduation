<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal"  @select="handleSelect">
      <el-menu-item index="1">水乳</el-menu-item>
      <el-submenu index="1-2">
        <template slot="title">精华</template>
        <el-menu-item index="2">精华水</el-menu-item>
        <el-menu-item index="3">精华液</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">面霜</el-menu-item>
      <el-submenu index="4-5">
        <template slot="title">眼部</template>
        <el-menu-item index="5">眼霜</el-menu-item>
        <el-menu-item index="6">眼精华</el-menu-item>
      </el-submenu>
      <el-menu-item index="7">身体乳</el-menu-item>
      <el-menu-item index="8">防晒</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Classbyfunc",
  methods:{
    handleSelect(key, keyPath) {
        console.log(key);
        this.$axios
        .post(
          "demo/product/classProducts",
          this.$qs.stringify({ classKey: key })
        )
        .then((res) => {
          this.$setSessionStorage("productMessage", res.data);
          this.$router.push({ path: "/classList" });
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
  }
};
</script>

<style scoped>
.el-menu-demo {
  display: flex;
  justify-content: center;
}
</style>