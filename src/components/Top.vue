<template>
  <div class="hello">
    <ul class="nav-all">
      <!-- 购物车 -->
      <li class="nav-item" v-if="isLogin">
        <el-link
          :underline="false"
          icon="el-icon-shopping-cart-full"
          @click="initCart"
          >购物车</el-link
        >
        <el-drawer
          title="购物车"
          :visible.sync="table1"
          direction="rtl"
          size="55%"
        >
          <el-table :data="gridData" @selection-change="handleSelectionChange">
            <el-table-column
              property="productName"
              label="商品名"
              width="500"
            ></el-table-column>
            <el-table-column
              property="nowPrice"
              label="商品单价"
            ></el-table-column>
            <el-table-column property="quantity" label="数量">
            </el-table-column>
            <el-table-column type="selection"> </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="dels" style="float: right; margin: 0 20px"
              >删除</el-button
            >
            <el-button
              @click="toggleSelection"
              type="primary"
              style="float: right"
              >结算</el-button
            >
          </div>
        </el-drawer>
      </li>
      <!-- 个人中心 -->
      <!-- <li class="nav-item" v-if="isLogin">
        <el-link :underline="false" icon="el-icon-user" @click="table2 = true"
          >个人中心</el-link
        ><el-drawer
          title="个人中心"
          :visible.sync="table2"
          direction="rtl"
          size="35%"
        >
          <div>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  修改资料<i class="el-icon-edit"></i>
                </template>
                <user-info></user-info>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  我的订单<i class="el-icon-document"></i
                ></template>
                <order-info></order-info>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  退出登录<i class="el-icon-thumb"></i
                ></template>
                <el-button type="text" @click="changeUser"
                  >切换其他账号</el-button
                ><br />
                <el-button type="text" @click="quit">退出当前账号</el-button>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-drawer>
      </li> -->
      <div v-if="!isLogin">
        <!-- 登录 -->
        <li class="nav-item">
          <el-dropdown @command="loginCommand">
            <span class="el-dropdown-link">
              登录<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login">用户登录</el-dropdown-item>
              <el-dropdown-item command="managerLogin"
                >管理员登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!-- 注册 -->
        <li class="nav-item">
          <el-link :underline="false" href="/register">注册</el-link>
        </li>
      </div>
      <div v-else>
        <li class="nav-avatar">
          <el-dropdown @command="avatarCommand">
            <span class="el-dropdown-link"
              ><el-avatar :src="userImage" :size="35"></el-avatar
            ></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal"
                ><i class="el-icon-user"></i>个人设置</el-dropdown-item
              >
              <el-dropdown-item command="orders"
                ><i class="el-icon-edit-outline"></i>我的订单</el-dropdown-item
              >
              <el-dropdown-item command="logout"
                ><i class="el-icon-remove-outline"></i
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </div>
    </ul>
    <router-view></router-view>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-table :data="conOrder_List" height="250" border style="width: 100%">
        <el-table-column prop="productName" label="化妆品名称" align="center">
        </el-table-column>
        <el-table-column prop="picture" label="图片" width="180" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.picture"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" align="center">
        </el-table-column>
        <el-table-column prop="nowPrice" label="单价" align="center">
        </el-table-column>
      </el-table>
      <span style="position: relative; margin-right: 10px"
        >合计：￥{{ totalPay }}</span
      >
      <el-button @click="cancelOrder">取消</el-button>
      <el-button type="primary" @click="submitOrder">提交订单</el-button>
    </el-dialog>
  </div>
</template>

<script>
import OrderInfo from "./OrderInfo.vue";
import UserInfo from "./UserInfo.vue";
export default {
  components: { UserInfo, OrderInfo },
  name: "Top",
  data() {
    return {
      totalPay: 0,
      conOrder_List: [],
      dialogFormVisible: false,
      isLogin: false,
      num: 1,
      table1: false,
      table2: false,
      orderData: [],
      dialog: false,
      loading: false,
      gridData: [],
      multipleSelection: [], //存储选中的列表
      userImage:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  mounted() {
    if (this.$getSessionStorage("user") == null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      if (this.$getSessionStorage("user").userImage) {
        this.userImage = this.$getSessionStorage("user").userImage;
      }
    }
  },
  methods: {
    createOrder(){
      //先创建订单
      this.$axios
          .post(
            "demo/orders/createOrder",
            this.$qs.stringify({ userId:this.$getSessionStorage("user").userId,itemNumber:this.conOrder_List.length,totalAmount:this.totalPay  })
          )
          .then((res) => {
            let neworder=res.data
            this.$setSessionStorage("neworder",neworder);
            console.log(this.$getSessionStorage("neworder"));
            // console.log(this.conOrder_List);
            this.createOrderItems();
          })
          .catch((e) => {
            this.$message.error("服务器内部发生异常");
            console.log(e);
          });
    },
    createOrderItems(){
      //创建订单项(遍历)
      this.conOrder_List.forEach((item, index, array) => {
        
        this.$axios
          .post(
            "demo/orderitem/createOrderItems",
            this.$qs.stringify({ orderId: this.$getSessionStorage("neworder").orderId,productId:item.productId,nowPrice:item.nowPrice,productCount:item.quantity })
          )
          .then((res) => {
            if(res.data<0)
            {
              this.$message.error("创建订单项失败！");
            }else{
              console.log(this.$getSessionStorage("neworder").orderId);
            }
          })
          .catch((e) => {
            this.$message.error("创建订单项发生异常");
            console.log(e);
          });});
    },
    submitOrder(){
      this.createOrder();
      // this.createOrderItems();
      this.dialogFormVisible=false;
      // this.conOrder_List = [];
      // this.totalPay = 0;
      this.dels();
    },
    cancelOrder() {
      // console.log("ww");
      this.dialogFormVisible = false;
      this.conOrder_List = [];
      this.totalPay = 0;
    },
    initCart() {
      this.table1 = true;
      var id = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "demo/cart/getCartInfo/" + id,
          this.$qs.stringify({ userId: this.$getSessionStorage("user").userId })
        )
        .then((res) => {
          // this.$setSessionStorage("")
          this.gridData = res.data;
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    loginCommand(command) {
      //登录用
      //切换路由到对应登录页
      this.$router.push(command);
    },
    avatarCommand(command) {
      if (command == "logout") {
        this.quit();
      }
      if (command == "personal") {
        this.$router.push("/person");
      }
      if (command == "orders") {
        this.$router.push("/orders");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      this.conOrder_List = [];
      this.totalPay = 0;
      let cartIds = [];
      this.multipleSelection.forEach((cart) => {
        cartIds.push(cart.cartId);
      });
      if (cartIds.length == 0) {
        this.$message({
          message: "请选择",
          type: "warning",
        });
        return;
      }
      cartIds.forEach((item, index, array) => {
        //获取订单信息（确认信息）
        this.$axios
          .post(
            "demo/cart/getOrdersByCart",
            this.$qs.stringify({ cartId: item })
          )
          .then((res) => {
            this.conOrder_List.push(res.data);
            this.totalPay += res.data.nowPrice * res.data.quantity;
          })
          .catch((e) => {
            this.$message.error("服务器内部发生异常");
            console.log(e);
          });
          // console.log(this.conOrder_List);
      });
      this.dialogFormVisible = true;
    },
    quit() {
      //退出当前账号
      this.$setSessionStorage("user", null);
      this.isLogin = false;
      this.$router.push({ path: "/index" });
      this.$message.success("退出成功！");
    },
    changeUser() {
      this.$setSessionStorage("user", null);
      this.isLogin = false;
      this.$router.push({ path: "/login" });
    },
    dels() {
      let ids = [];
      this.multipleSelection.forEach((cart) => {
        ids.push(cart.cartId);
      });
      // console.log(ids);
      //如果没有选就提示
      if (ids.length == 0) {
        this.$message({
          message: "请选择",
          type: "warning",
        });
        return;
      }
      //批量删除
      this.delCart(ids);
    },
    delCart(ids) {
      this.$axios({
        method: "post",
        url: "demo/cart/mutiDelete",
        data: ids,
      })
        .then((res) => {
          if (res.data > 0) {
            this.$message.success("操作成功");
            this.initCart();
          } else {
            this.$message.success("操作失败");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.hello {
  background-color: bisque;
  height: 50px;
  box-shadow: 0px 5px 15px #e9e9e9;
  position: relative;
}
ul {
  list-style: none;
}
.nav-item {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}
.nav-avatar {
  float: right;
  margin-right: 10px;
}
.nav-all {
  text-align: center;
  height: 35px;
  width: 50vw;
  position: absolute;
  margin: auto;
  top: 0;
  /* left: 0; */
  right: 0;
  bottom: 0;
}
</style>
