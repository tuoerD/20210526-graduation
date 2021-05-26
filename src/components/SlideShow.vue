<template>
    <div>
        <el-carousel :interval="4000" type="card" height="400px">
    <el-carousel-item v-for="item in imgList" :key="item">
      <img :src="item.idView" class="image">
    </el-carousel-item>
  </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'SlideShow',
  data () {
    return {
      imgList:[
        {
          id:1,idView:require("../assets/pro7.jpg")
        },
        {
          id:2,idView:require("../assets/pro8.jpg")
        },
        {
          id:3,idView:require("../assets/pro9.jpg")
        },
        {
          id:4,idView:require("../assets/pro10.jpg")
        },
        {
          id:5,idView:require("../assets/pro11.jpg")
        },
        {
          id:6,idView:require("../assets/pro12.jpg")
        },
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>