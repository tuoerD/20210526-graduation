
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
      <el-table-column prop="productName" label="商品" width="250" align="center"> </el-table-column>
      <el-table-column prop="storeName" label="店铺" align="center"> </el-table-column>
      <el-table-column prop="productCount" label="数量" align="center"> </el-table-column>
      <el-table-column prop="itemPay" label="金额" align="center"> </el-table-column>
      <el-table-column prop="orderItemId" v-if="false"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-link @click="confirmReceive(scope.row.orderItemId)">确认收货</el-link>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'WaitReceive',
  data () {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initWaitPay();
  },
  methods: {
    confirmReceive(itemId){
      this.$confirm("此操作将确认收货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //将该订单项的状态修改为待评价
          // alert(itemId);
          this.$axios
        .post("demo/orderitem/editOrderItemTag",this.$qs.stringify({orderItemId:itemId,orderItemTag:"待评价"}))
        .then((res) => {
          if(res.data==1)
          {
            this.$message.success("收货成功");
            // this.initWaitPay();
            location.reload();
          }else{
            this.$message.error("失败");
          }
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
        })
        // this.initWaitPay();
    },
    initWaitPay() {
      var id = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "/demo/orders/getOrdersInfo/" + id,
          this.$qs.stringify({ userId: this.$getSessionStorage("user").userId })
        )
        .then((res) => {
          for (var i = 0; res.data[i]; i++) {
            if (res.data[i].orderItemTag == "待收货") {
              this.tableData.push(res.data[i]);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
}
</script>

<style scoped>
.all-orders {
  position: absolute;
  width: 80vw;
  left: 10vw;
  top: 200px;
}
</style>