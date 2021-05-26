<template>
  <div>
    <div class="input-search-box">
      <el-input
        v-model="searchForm.searchKey"
        size="small"
        placeholder="输入关键字搜索"
      >
        <el-select
          v-model="searchForm.selectKey"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option label="所有字段" value="0"></el-option>
          <el-option label="用户ID" value="1"></el-option>
          <el-option label="用户名称" value="2"></el-option>
          <el-option label="用户邮箱" value="3"></el-option>
          <el-option label="联系电话" value="4"></el-option>
          <el-option label="收货地址" value="5"></el-option> </el-select
        ><el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        ></el-button
      ></el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户ID" prop="userId"> </el-table-column>

      <el-table-column label="用户名称" prop="userName"> </el-table-column>

      <el-table-column label="用户邮箱" prop="userEmail"> </el-table-column>

      <el-table-column label="联系电话" prop="phoneNumber"> </el-table-column>

      <el-table-column label="收货地址" prop="userAddress"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.userId)"
            >编辑</el-button
          >
          <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="updateUserForm" label-width="100px">
              <!-- <el-form-item label="商品ID">
                <el-input v-model="createForm.productId"></el-input>
              </el-form-item> -->
              <el-form-item label="用户名称">
                <el-input v-model="updateUserForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱">
                <el-input v-model="updateUserForm.userEmail"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="updateUserForm.phoneNumber"></el-input>
              </el-form-item>
              <el-form-item label="收货地址">
                <el-input v-model="updateUserForm.userAddress"></el-input>
              </el-form-item>
              <div class="btn-dialog">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitEdit">提交</el-button>
              </div>
            </el-form>
          </el-dialog>
          
          <!-- 操作栏 -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.userId)"
            v-if="!scope.row.delTag"
            >禁用</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteOff(scope.row.userId)"
            v-if="scope.row.delTag"
            >解禁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        searchKey: "",
        selectKey: "",
      },
      dialogFormVisible: false,
      updateUserForm: {
        userId:"",
        userName: "",
        userEmail: "",
        phoneNumber: "",
        userAddress: "",
      },
    };
  },
  methods: {
    handleEdit(id) {
      this.dialogFormVisible=true;
      this.$axios
            .post("demo/user/updateUserInfo", this.$qs.stringify({
            userId: id,
          }))
            .then((res) => {
              this.$setSessionStorage("userEdit",res.data);
              this.updateUserForm.userId=this.$getSessionStorage("userEdit").userId;
              this.updateUserForm.userName=this.$getSessionStorage("userEdit").userName;
              this.updateUserForm.userEmail=this.$getSessionStorage("userEdit").userEmail;
              this.updateUserForm.phoneNumber=this.$getSessionStorage("userEdit").phoneNumber;
              this.updateUserForm.userAddress=this.$getSessionStorage("userEdit").userAddress;
            })
            .catch((error) => {
              console.log(error);
            });
    },
    //禁用用户按钮
    handleDelete(id) {
      this.$confirm("此操作将禁用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("demo/user/deleteUser", this.$qs.stringify({
            userId:id,
          }))
            .then((res) => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "禁用成功!",
                });
                this.initUserList();
              }
              else{
                this.$message({
                  type: "error",
                  message: "禁用失败!",
                });
              }
            })
            //异常
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    //取消禁用
    handleDeleteOff(id) {
      this.$confirm("此操作将解除对用户的禁用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("demo/user/deleteUser", this.$qs.stringify({
            userId: id,
          }))
            .then((res) => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "解禁成功!",
                });
                this.initUserList();
              }
              else{
                this.$message({
                  type: "error",
                  message: "解禁失败!",
                });
              }
            })
            //异常
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    submitEdit(){
      this.$axios
          .post("demo/user/editUserInfo", this.$qs.stringify(this.updateUserForm))
          .then((res) => {
            if(res.data==1)
            {
            this.$message.success("用户信息修改成功！");
            this.initUserList();
            this.dialogFormVisible=false;
            }
            else{
              this.$message.error("修改失败，请检查用户状态！");
              this.dialogFormVisible=false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    searchUser() {
      this.$axios
        .post("demo/user/getUserListByKey", this.$qs.stringify(this.searchForm))
        .then((res) => {
          this.tableData = res.data;
        })
        //异常
        .catch((error) => {
          console.log(error);
        });
    },
    initUserList(){
      this.$axios
      .post("demo/user/getList")
      .then((res) => {
        this.tableData = res.data;
      })
      .catch((e) => {
        this.$message.error("服务器内部发生异常");
        console.log(e);
      });
    }
  },
  created() {
    this.initUserList();
  },
};
</script>

<style scoped>
.btn-dialog{
  margin-left:280px;
}
.input-search-box {
  width: 23vw;
  float: right;
}
.el-select {
  width: 8vw;
}
</style>