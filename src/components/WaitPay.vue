<template>
  <div class="all-orders">
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      align="center"
    >
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
      <el-table-column prop="productCount" label="数量" align="center">
      </el-table-column>
      <el-table-column prop="itemPay" label="金额" align="center">
      </el-table-column>
      <el-table-column prop="orderItemId" v-if="false"> </el-table-column>
      <el-table-column label="操作" align="center"
        ><template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toPay(scope.row.orderItemId)">支付</el-button
          ><el-link @click="cancelOrder(scope.row.orderItemId)"
            >取消订单</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "WaitPay",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.initWaitPay();
  },
  methods: {
    toPay(itemId) {
      this.$confirm("确认支付?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(
              "demo/orderitem/editOrderItemTag",
              this.$qs.stringify({
                orderItemId: itemId,
                orderItemTag: "待发货",
              })
            )
            .then((res) => {
              if (res.data == 1) {
                this.$message.success("支付成功！");
                location.reload();
              } else {
                this.$message.error("失败");
              }
            })
            .catch((e) => {
              this.$message.error("服务器内部发生异常");
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    cancelOrder(itemId) {
      this.$confirm("是否取消该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除该订单项
          this.$axios
            .post(
              "/demo/orderitem/cancelOrderItem",
              this.$qs.stringify({ orderItemId: itemId })
            )
            .then((res) => {
              let nowOrder = res.data;
              this.$axios
                .post(
                  "/demo/orderitem/deleteOrderItem",
                  this.$qs.stringify({ orderItemId: itemId })
                )
                .then((res) => {
                  if (res.data > 0) {
                    this.$axios
                      .post(
                        "/demo/orders/deleteOrder",
                        this.$qs.stringify({ orderId: nowOrder })
                      )
                      .then((res) => {
                        if (res.data > 0) {
                          this.$message.success("取消成功！");
                          // this.initWaitPay();
                          location.reload();
                        }
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
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
            if (res.data[i].orderItemTag == "待付款") {
              this.tableData.push(res.data[i]);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterTag(value, row) {
      return row.orderTag === value;
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