<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="8-9">
        <template slot="title">粉底</template>
        <el-menu-item index="9">粉底液</el-menu-item>
        <el-menu-item index="10">气垫</el-menu-item>
      </el-submenu>
      <el-submenu index="10-11">
        <template slot="title">眼部产品</template>
        <el-menu-item index="11">眼影</el-menu-item>
        <el-menu-item index="12">眼线笔</el-menu-item>
        <el-menu-item index="13">睫毛膏</el-menu-item>
        <el-menu-item index="14">眉笔</el-menu-item>
      </el-submenu>
      <el-menu-item index="15">腮红</el-menu-item>
      <el-menu-item index="16">修容</el-menu-item>
      <el-menu-item index="17">高光</el-menu-item>
      <el-submenu index="17-18">
        <template slot="title">口红</template>
        <el-menu-item index="18">唇釉</el-menu-item>
        <el-menu-item index="19">唇膏</el-menu-item>
      </el-submenu>
      <el-submenu index="19-20">
        <template slot="title">定妆产品</template>
        <el-menu-item index="20">定妆喷雾</el-menu-item>
        <el-menu-item index="21">散粉</el-menu-item>
      </el-submenu>
      <el-menu-item index="22">美妆工具</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Classbyfunc2",
  methods:{
    handleSelect(key, keyPath) {
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