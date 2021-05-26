<template>
  <div>
    <!-- /*****热销榜单 */ -->
    <div>
    <div class="divider-line">
      <el-divider content-position="center"><h2>热销榜单</h2></el-divider>
    </div>
    <el-row :gutter="80">
      <el-col
        :span="6"
        v-for="(o, index) in Hot_Pro"
        :key="index"
      >
        <el-card :body-style="{ padding: '20px' }" shadow="hover" style="margin-top:30px">
            <img :src="o.picture" title="点击查看详情信息" class="image" @click="toDetail(o.productId)" />
          <div style="padding: 14px">
            <span>{{o.productName}}</span>
            <div class="bottom clearfix">
              <font style="color:#F497C6">￥ {{o.nowPrice}}</font>
              <font style="font-size:4px"><s style="color:#999">￥ {{o.startPrice}}</s></font>
              <el-button type="text" class="button" @click="toDetail(o.productId)">查看详情</el-button>
            </div>
            <font class="sales-volume">月销：{{o.salesVolume}}</font>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
    <!-- /*****好物推荐 */ -->
    <div>
        <div class="divider-line">
      <el-divider content-position="center"><h2>好物推荐</h2></el-divider>
    </div>
    <el-row :gutter="80">
      <el-col
        :span="6"
        v-for="(o, index) in Recom_Pro"
        :key="index"
      >
        <el-card :body-style="{ padding: '20px' }" shadow="hover" style="margin-top:30px">
            <img :src="o.picture" title="点击查看详情信息" class="image" @click="toDetail(o.productId)"/>
          <div style="padding: 14px">
            <span>{{o.productName}}</span>
            <div class="bottom clearfix">
              <font style="color:#F497C6">￥ {{o.nowPrice}}</font>
              <font style="font-size:4px"><s style="color:#999">￥ {{o.startPrice}}</s></font>
              <el-button type="text" class="button" @click="toDetail(o.productId)">查看详情</el-button>
            </div>
            <font class="sales-volume">月销：{{o.salesVolume}}</font>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import Detail from '../views/Detail.vue';
export default {
  components: { Detail },
  name: "Produce",
  data() {
    return {
      Hot_Pro:[],
      Recom_Pro:[]
    };
  },
  created(){
    this.$axios
      .post("demo/product/hotProducts")
      .then((res) => {
        this.Hot_Pro = res.data;
        // console.log(this.Hot_Pro)
      })
      .catch((e) => {
        this.$message.error("服务器内部发生异常");
        console.log(e);
      });
    this.$axios
      .post("demo/product/recomProducts")
      .then((res) => {
        this.Recom_Pro = res.data;
        // console.log(this.Hot_Pro)
      })
      .catch((e) => {
        this.$message.error("服务器内部发生异常");
        console.log(e);
      });
  },
  methods:{
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

</style>