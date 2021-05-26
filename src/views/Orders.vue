<template>
  <div>
    <Top></Top>
    <div class="bread-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="order-menu">
      <el-menu
        :default-active="onRoutes"
        mode="horizontal"
        @select="handleSelect"
        router
      >
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
</template>

<script>
import Top from "../components/Top.vue";
export default {
  components: { Top },
  name: "Orders",
  data() {
    return {
      items: [
        {
          index: "OrderInfo",
          title: "所有订单",
        },
        {
          index: "waitPay",
          title: "待付款",
        },
        {
          index: "waitSend",
          title: "待发货",
        },
        {
          index: "waitReceive",
          title: "待收货",
        },
        {
          index: "waitComment",
          title: "待评价",
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style scoped>
.bread-top {
  margin-left: 10px;
  margin-top: 20px;
}
.order-menu{
  width: 80vw;
  position: absolute;
  left:10vw;
  top:8vw;
}
</style>