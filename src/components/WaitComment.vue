
<template>
  <div class="all-orders">
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button> -->
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="orderDate"
        label="日期"
        sortable
        width="180"
        column-key="date"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品"
        width="250"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="storeName" label="店铺" align="center">
      </el-table-column>
      <!-- <el-table-column prop="nowPrice" label="单价"> </el-table-column> -->
      <el-table-column prop="productCount" label="数量" align="center">
      </el-table-column>
      <el-table-column prop="itemPay" label="金额" align="center">
      </el-table-column>
      <el-table-column prop="handle" label="操作" align="center"
        ><template slot-scope="scope"
          ><el-link @click="toComment(scope.row.productName)">去评价</el-link></template
        ></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
export default {
  name: "WaitComment",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.initWaitPay();
  },
  methods: {
    initWaitPay() {
      var id = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "/demo/orders/getOrdersInfo/" + id,
          this.$qs.stringify({ userId: this.$getSessionStorage("user").userId })
        )
        .then((res) => {
          for (var i = 0; res.data[i]; i++) {
            if (res.data[i].orderItemTag == "待评价") {
              this.tableData.push(res.data[i]);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toComment(proName) {
      // alert("111");
      this.$axios
        .post("demo/product/getProductInfoByName/"+proName,this.$qs.stringify({productName:this.proName}))
        .then((res)=>{
          // alert("123");
          this.$setSessionStorage("productMessage",res.data);
          this.$router.push({ path: "/detail" });
          // console.log(res.data);
        })
        .catch((e)=>{
          this.$message.error("服务器内部发生异常");
          console.log(e);
        })
    },
  },
};
</script>

<style scoped>
.all-orders {
  position: absolute;
  width: 80vw;
  left: 10vw;
  top: 200px;
}
</style>