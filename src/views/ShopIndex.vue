<template>
  <div>
    <div style="height: 10vh; margin-bottom: 5vh">
      <top></top>
      <div class="bread-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><el-link :underline="false" @click="goBackToDetail"
          ><strong>产品详情</strong></el-link
        ></el-breadcrumb-item>
          <el-breadcrumb-item>店铺首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bread-right">
        <el-link :underline="false" @click="toIndex"
          ><strong>返回网站首页</strong></el-link
        >
      </div>
    </div>

    <div class="shop-name">
      <h2>{{storeName}}</h2>
    </div>

    <el-row :gutter="80">
      <el-col :span="6" v-for="(o, index) in Store_Pro_List" :key="index">
        <el-card
          :body-style="{ padding: '20px' }"
          shadow="hover"
          style="margin-top: 30px"
        >
          <img
            :src="o.picture"
            title="点击查看详情信息"
            class="image"
            @click="toDetail(o.productId)"
          />
          <div style="padding: 14px">
            <span>{{ o.productName }}</span>
            <div class="bottom clearfix">
              <font style="color: #f497c6">￥ {{ o.nowPrice }}</font>
              <font style="font-size: 4px"
                ><s style="color: #999">￥ {{ o.startPrice }}</s></font
              >
              <el-button
                type="text"
                class="button"
                @click="toDetail(o.productId)"
                >查看详情</el-button
              >
            </div>
            <font class="sales-volume">月销：{{ o.salesVolume }}</font>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Top from "../components/Top.vue";
export default {
  components: { Top },
  name: "ShopIndex",
  data() {
    return {
      storeId: "",
      storeName: "",
      Store_Pro_List:[]
    };
  },
  mounted(){
    this.getShopInfo();
    this.productInit();
  },
  methods: {
    toDetail(proId){
      this.$axios
        .post("demo/product/getProductInfo/"+proId,this.$qs.stringify({productId:this.proId}))
        .then((res)=>{
          this.$setSessionStorage("productMessage",res.data);
          this.$router.push({ path: "/detail" });
        })
        .catch((e)=>{
          this.$message.error("服务器内部发生异常");
          console.log(e);
        })
    },
    productInit(){
      this.$axios
        .post("demo/product/getProductByStore",this.$qs.stringify({storeId:this.storeId}))
        .then((res)=>{
          this.Store_Pro_List=res.data;
          console.log(this.Store_Pro_List);
        })
        .catch((e)=>{
          this.$message.error("服务器内部发生异常");
          console.log(e);
        })
    },
    toIndex() {
      this.$router.push({ path: "/index" });
    },
    goBackToDetail(){
      this.$router.go(-1);
    },
    getShopInfo(){
      this.storeId=this.$getSessionStorage("storeMessage").storeId;
      this.storeName=this.$getSessionStorage("storeMessage").storeName;
    }
  },
};
</script>

<style scoped>
.button {
  padding: 0;
  float: right;
}
.image {
  width: 270px;
  height: 300px;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.bread-crumb {
  float: left;
  margin-left: 10px;
  margin-top: 20px;
}
.bread-right {
  float: right;
  margin-right: 10px;
  margin-top: 20px;
  font-size: 14px;
}
.sales-volume{
  color:#999;
  float: left;
  font-size:5px
}
</style>