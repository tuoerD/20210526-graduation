
<template>
  <div class="all-orders">
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
      <!-- <el-table-column label="操作" align="center"
        ><el-link @click="callSend">提醒发货</el-link> 
        </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "WaitSend",
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
            if (res.data[i].orderItemTag == "待发货") {
              this.tableData.push(res.data[i]);
            }
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
.all-orders {
  position: absolute;
  width: 80vw;
  left: 10vw;
  top: 200px;
}
</style>