<template>
  <div>
    <div class="top-place">
      <el-button
        class="new-product-btn"
        type="primary"
        @click="newProduct"
        plain
        >新增商品</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="化妆品名称">
              <span>{{ props.row.productName }}</span>
            </el-form-item>
            <el-form-item label="化妆品ID">
              <span>{{ props.row.productId }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.storeId }}</span>
            </el-form-item>
            <el-form-item label="化妆品分类">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="原价">
              <span>{{ props.row.startPrice }}</span>
            </el-form-item>
            <el-form-item label="现价">
              <span>{{ props.row.nowPrice }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.inventory }}</span>
            </el-form-item>
            <el-form-item label="销量">
              <span>{{ props.row.salesVolume }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="化妆品ID"
        prop="productId"
        align="center"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        label="化妆品图片"
        prop="picture"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.picture"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="化妆品名称"
        prop="productName"
        align="center"
        width="250px"
      >
      </el-table-column>
      <el-table-column
        label="化妆品类别"
        prop="type"
        align="center"
        width="250px"
      >
      </el-table-column>
      <el-table-column
        label="销量"
        prop="salesVolume"
        align="center"
        width="200px"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="库存"
        prop="inventory"
        align="center"
        width="200px"
        sortable
      >
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form
        ref="form"
        :model="createForm"
        label-width="280px"
        :label-position="left"
      >
        <el-form-item label="化妆品图片">
        <div style="height: 100px;width:250px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8083/demo/product/addProPic"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div></el-form-item>
        <el-form-item label="化妆品ID">
          <el-input v-model="createForm.productId"></el-input>
        </el-form-item>
        <el-form-item label="化妆品名称">
          <el-input v-model="createForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-input v-model="createForm.startPrice"></el-input>
        </el-form-item>
        <el-form-item label="现价">
          <el-input v-model="createForm.nowPrice"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="createForm.inventory"></el-input>
        </el-form-item>
        <el-form-item label="所属店铺">
          <!-- <el-input v-model="createForm.storeId"></el-input> -->
          <el-select v-model="createForm.storeId" placeholder="请选择">
            <el-option
              v-for="item in stores"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="化妆品类别">
          <!-- <el-input v-model="createForm.type"></el-input> -->
          <el-select v-model="createForm.type" placeholder="请选择">
            <el-option
              v-for="o in types"
              :key="o.value"
              :label="o.label"
              :value="o.value"
            >
              <span style="float: left">{{ o.label }}</span>
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <div style="height: 100px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8083/demo/product/addProPic"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div> -->
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Store_List:[],
      stores: [],
      types:[
        {value:'水乳',label:'水乳'},
        {value:'精华水',label:'精华水'},
        {value:'精华液',label:'精华液'},
        {value:'面霜',label:'面霜'},
        {value:'眼霜',label:'眼霜'},
        {value:'眼精华',label:'眼精华'},
        {value:'身体乳',label:'身体乳'},
        {value:'防晒',label:'防晒'},
        {value:'粉底液',label:'粉底液'},
        {value:'气垫',label:'气垫'},
        {value:'眼影',label:'眼影'},
        {value:'眼线笔',label:'眼线笔'},
        {value:'睫毛膏',label:'睫毛膏'},
        {value:'眉笔',label:'眉笔'},
        {value:'腮红',label:'腮红'},
        {value:'修容',label:'修容'},
        {value:'高光',label:'高光'},
        {value:'唇釉',label:'唇釉'},
        {value:'唇膏',label:'唇膏'},
        {value:'定妆喷雾',label:'定妆喷雾'},
        {value:'散粉',label:'散粉'},
        {value:'美妆工具',label:'美妆工具'},
      ],
      value: "",
      chooseType:"",
      imageUrl: "",
      imageBase:"",
      tableData: [],
      createForm: {
        productId: "",
        productName: "",
        startPrice: "",
        nowPrice: "",
        inventory: "",
        picture: "",
        storeId: "",
        type: "",
        salesVolume: "",
      },
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.getProList();
    this.loadStoreList();
  },
  methods: {
    loadStoreList(){
      //加载店铺选项
      this.$axios
        .post("demo/store/getStoreList")
        .then((res) => {
          this.Store_List=res.data;
          for (let item1 of this.Store_List) {
            
            this.stores.push({value: item1.storeId, label: item1.storeName});
          }
          console.log(this.stores);
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.createForm.picture=res;
      // console.log(this.imageBase);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getProList() {
      this.$axios
        .post("demo/product/getProductList")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    newProduct() {
      this.createForm = {
        productId: "",
        productName: "",
        startPrice: "",
        nowPrice: "",
        inventory: "",
        picture: "",
        storeId: "",
        type: "",
        salesVolume: "",
      };
      this.dialogFormVisible = true;
    },
    savePicture(){
      // console.log(this.createForm.productId);
      //存入图片
      this.$axios
        .post(
          "demo/product/savePicture",
          this.$qs.stringify({picture:this.imageBase,productId:this.createForm.productId})
          // {params: {
          //   picture:this.imageBase,
          //   productId:this.createForm.productId
          // }}
        )
        .then((res) => {
          if (res.data == -1) {
            return false;
          } else {
            return true;
          }
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    submitCreate() {
      if (this.createForm.productId == "") {
        this.$message.error("请输入化妆品ID");
        return;
      }
      if (this.createForm.productName == "") {
        this.$message.error("请输入化妆品名称");
        return;
      }
      if (this.createForm.startPrice == "") {
        this.$message.error("请输入化妆品原价");
        return;
      }
      if (this.createForm.nowPrice == "") {
        this.$message.error("请输入化妆品现价");
        return;
      }
      if (this.createForm.inventory == "") {
        this.$message.error("请输入化妆品库存");
        return;
      }
      if (this.createForm.storeId == "") {
        this.$message.error("请输入所属店铺");
        return;
      }
      if (this.createForm.type == "") {
        this.$message.error("请输入化妆品类别");
        return;
      }
      this.$axios
        .post(
          "demo/product/createNewProduct",
          this.$qs.stringify(this.createForm)
        )
        .then((res) => {
          if (res.data == -1) {
            this.$message.error("该化妆品ID已被使用");
            return false;
          } else {
            this.$message.success("新增成功！");
            this.dialogFormVisible = false;
            return true;
          }
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
      // this.savePicture();
      
    },
  },
};
</script>

<style>
.el-input {
  width: 250px;
  margin-right: 120px;
}
.el-select {
  width: 250px;
  margin-right: 120px;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
.top-place {
  height: 60px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.new-product-btn {
  float: right;
  position: relative;
  top: 20px;
  right: 20px;
}
</style>