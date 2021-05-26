<template>
  <div>
    <Top></Top>
    <!-- <Search></Search> -->
    <div class="bread-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div><span>已为您搜索到以下商品...</span></div>
    
    <div class="card"><el-row :gutter="80">
      <el-col :span="6" v-for="(o, index) in Relative_Pro" :key="index">
        <el-card
          :body-style="{ padding: '20px' }"
          shadow="hover"
          style="margin-top: 30px">
          <img
            :src="o.picture"
            title="点击查看详情信息"
            class="image"
            @click="toDetail(o.productId)" />
          <div style="padding: 14px">
            <span>{{ o.productName }}</span>
            <div class="bottom clearfix">
              <font style="color: #f497c6">￥ {{ o.nowPrice }}</font>
              <font style="font-size: 4px"><s style="color: #999">￥ {{ o.startPrice }}</s></font>
              <el-button
                type="text"
                class="button"
                @click="toDetail(o.productId)">查看详情</el-button>
            </div>
            <font class="sales-volume">月销：{{ o.salesVolume }}</font>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import Top from "../components/Top";
export default {
  name: "ClassList",
  components: {
    Top,
    Search,
  },
  data(){
      return{
          Relative_Pro:[],
      }
  },
  created(){
      this.Relative_Pro=this.$getSessionStorage("productMessage");
  },
  methods:{
      toDetail(proId){
      this.$axios
        .post("demo/product/getProductInfo/"+proId,this.$qs.stringify({productId:this.proId}))
        .then((res)=>{
          this.$setSessionStorage("productMessage",res.data);
          // console.log(res.data)
          this.$router.push({ path: "/detail" });
        })
        .catch((e)=>{
          this.$message.error("服务器内部发生异常");
          console.log(e);
        })
    }
  }
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

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
.sales-volume{
  color:#999;
  float: left;
  font-size:5px
}
.bread-top {
  margin-left: 10px;
  margin-top: 20px;
}
</style>