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
          v-model="commentForm.contentText"
        ></el-input>
        <button class="pubButton" @click="newComment">评价</button>
      </div>
    </div>
    <div style="margin-left: 12%; width: 76%">
      <el-divider content-position="left">所有评价</el-divider>
    </div>
    <!-- 已发表的评论 -->
    <div class="all-comment">
      <el-row>
        <el-col :span="24" v-for="(o, index) in Com_List" :key="index">
          <div class="comment-box">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">{{ o.userName }}</div>
              <el-avatar
                class="comment-avatar"
                :src="o.userImage"
                :size="60"
              ></el-avatar>
            </el-tooltip>

            <span class="content-text">{{ o.contentText }}</span>
            <span class="comment-time">{{ o.time }}</span>
          </div></el-col
        ></el-row
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      Com_List: [],
      userImage:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      commentForm: {
        userId: "",
        productId: "",
        contentText: "",
        // time:"",
      },
    };
  },
  mounted() {
    this.init();
    this.initComments();
  },
  methods: {
    initComments() {
      this.$axios
        .post("demo/comment/getCommentList", this.$qs.stringify({ productId: this.$getSessionStorage("productMessage").productId }))
        .then((res) => {
          this.Com_List = res.data;
          console.log(this.Com_List);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init() {
      if (this.$getSessionStorage("user").userImage) {
        this.userImage = this.$getSessionStorage("user").userImage;
      }
      this.commentForm.userId = this.$getSessionStorage("user").userId;
      this.commentForm.productId = this.$getSessionStorage(
        "productMessage"
      ).productId;
    },
    newComment() {
      if(this.commentForm.userId=="")
      {
        this.$message.error("请先登录！");
        this.$router.push("/login");
      }else{
        //向数据库插入一条评论
      this.$axios
        .post("demo/comment/newComment", this.$qs.stringify(this.commentForm))
        .then((res) => {
          if (res == -1) {
            this.$message.error("评价失败！");
            return false;
          } else {
            this.$message.success("评价成功！");
            this.initComments();
            return true;
          }
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
.comment-time {
  position: absolute;
  right: 0;
}
.content-text {
  position: relative;
  bottom: 50px;
}
.comment-avatar {
  margin: 30px;
}
.all-comment {
  width: 76%;
  margin-left: 12%;
}
.comment-box {
  margin-top: 2%;
  border-bottom: 1px rgb(221, 221, 221) solid;
  text-align: left;
}
.messBoardBox {
  border-top: 1px rgb(221, 221, 221) solid;
  margin-left: 12%;
  margin-top: 50px;
  height: 130px;
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
  background: bisque;
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