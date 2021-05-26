<template>
<div class="BusinessInfo">
  <el-form ref="form" :model="form" label-width="80px">
    <el-col :span="20">
    <el-form-item label="商家头像">
    <div style="width: 100%;height: 178px;margin-bottom:20px">
    <img :src="this.form.avatar" alt="" style="height: 178px;" v-if="managementStatu">
    <AvatarUpload style="margin-bottom:20px" v-else  @avatarTransfer="getTopLab"></AvatarUpload>
    </div>
    </el-form-item>
    <el-form-item label="商家名称">
      <font v-if="managementStatu">{{form.name}}</font>
      <el-input v-model="form.name" v-else></el-input>
    </el-form-item>
    <el-form-item label="经营类型">
      <div  v-if="managementStatu">
      <el-tag type="warning" v-for="item in form.category" :key="item" style="margin-right:1vw" disable-transitions=true>{{item}}</el-tag>
      </div>
      <div v-else>
      <el-checkbox-group v-model="form.category">
        <el-checkbox v-for="item in categoryLimit" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      </div>
    </el-form-item>
    <el-form-item label="商家地址">
      <font v-if="managementStatu">{{form.address}}</font>
      <el-input v-model="form.address" v-else></el-input>
    </el-form-item>
    
    <el-form-item label="官网地址">
      <el-link :href="form.url" target="_blank" v-if="managementStatu"  :underline="false">{{form.url}}</el-link>
      <!-- <font >{{form.businessUrl}}</font> -->
      <el-input v-model="form.url" v-else></el-input>
    </el-form-item>
    <el-form-item label="商店介绍">
      <font v-if="managementStatu">{{form.introduction}}</font>
      <el-input type="textarea" v-model="form.introduction" v-else></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="4">
    <el-form-item>
      <el-button type="info"  @click="onSubmit" v-if="managementStatu">修改</el-button>
      <el-button type="success"  @click="onSubmit" v-else>保存</el-button>
    </el-form-item>
    </el-col>
  </el-form>
</div>
</template>
<script>
import AvatarUpload from "@/components/AvatarUpload.vue"
export default {
  name:"BusinessInfo",
  components: {
    AvatarUpload
  },
  data() {
    return {
      managementStatu:true,
      categoryLimit: ['绿茶','白茶','黄茶','青茶','红茶','黑茶','其他'],
      form: {
        // name: '湖南省白沙溪茶厂股份有限公司',
        // avatar:'',
        // // category: ['黑茶'],
        // introduction: '湖南省白沙溪茶厂股份有限公司坐落在雪峰山脉东北端，位于清代两江总督陶澍故里，是安化茶马古道之起点，距省会长沙240km，离县城东坪27km，S308线贯穿其中，交通便利。且傍山临水，享资水之秀美,纳山川之灵气。山峦起伏，云雾缭绕，景色宜人，人杰地灵。',
        // url:"http://www.bsxtea.com/home2.html",
        // address: '上海市普陀区真北路',
      },
      formTem:{},
      rules:{
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
        // ],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      if(this.managementStatu==false){
        this.$setSessionStorage("business",this.form);
        let str=this.form.category;
        for(const k in this.form){
          this.formTem[k]=this.form[k];
          console.log(k);
        }
        this.formTem.category=this.formTem.category.join(" ");
        this.$axios
        ({
          method: 'post',
          url: '/business/updateBusiness',
          data: this.formTem,
        })
        .then(res=> {
          // alert(res.data.msg)
          // let str=this.form.category.split(" ");
          // this.form.category=str;
        });
      }
      this.managementStatu=!this.managementStatu;
    },
    getTopLab(msg){
      // console.log("msg:"+this.$getLocalStorage("PersonalLabName"))
      //父子组件间的传递关系大于页面间的传递
      this.form.avatar= msg;
    },
  },
  created:function(){
    console.log("businessFormCreated");
    this.form=this.$getSessionStorage("business");
    console.log("businessForm:");
    
    this.$emit('businessInfoForm',this.form);
    
  }
}
</script>
<style>
.BusinessInfo{
  text-align: left;
}
</style>
