<template>
  <div>
    <div class="messBoardBox">
      <div class="pubMessBox">
        <div class="userImage">
          <el-image :src="userImage"></el-image>
        </div>
        <el-input
          class="pubMessText"
          :rows="3"
          type="textarea"
          placeholder="请输入内容"
          v-model="contentText"
        ></el-input>
        <button class="pubButton" @click="newComment">留言</button>
      </div>
      <div class="messBoard"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  data() {
    return {
        userImage:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        commentForm:[
          userId="",
          productId="",
          contentText="",
          time="",
        ]
    };
  },
  mounted(){
    init();
  },
  methods:{
    init(){
      this.userImage=this.$getSessionStorage("user").userImage;
      this.commentForm.userId=this.$getSessionStorage("user").userId;
      this.commentForm.productId=this.$getSessionStorage("productMessage").productId;
    },
    newComment(){
      //向数据库插入一条评论
      // this.time=this.getCurDate();
      // console.log(this.time);
    }
  }
};
</script>

<style scoped>
.messBoardBox {
  border-top: 1px rgb(221, 221, 221) solid;
  margin-left: 12%;
  margin-top: 50px;
  height: 500px;
  width: 76%;
  display: block;
}
.userImage {
  float: left;
  margin-left: 30px;
  margin-top: 30px;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  border: 1px rgb(221, 221, 221) solid;
  display: inline;
}
.pubMessBox {
  height: 100px;
}
.pubMessText {
  float: left;
  margin-left: 40px;
  margin-top: 30px;
  width: 71%;
}
.pubButton {
  cursor: pointer;
  float: left;
  height: 75px;
  width: 85px;
  color: #fff;
  display: block;
  background:bisque;
  font-size: 14px;
  line-height: 35px;
  border-radius: 4px;
  margin-left: 15px;
  text-align: center;
  border: none;
  margin-top: 30px;
  font-size: 18px;
}
.messBoard {
  border-top: 1px rgb(221, 221, 221) solid;
  height: 100px;
  margin-top: 50px;
}
</style>