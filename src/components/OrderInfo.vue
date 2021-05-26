
<template>
  <div class="all-orders">
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="orderDate"
        label="日期"
        sortable
        width="180"
        column-key="date"
      >
      </el-table-column>
      <el-table-column prop="productName" label="商品"> </el-table-column>
      <el-table-column prop="storeName" label="店铺"> </el-table-column>
      <el-table-column prop="productCount" label="数量"> </el-table-column>
      <el-table-column prop="itemPay" label="金额"> </el-table-column>
      <el-table-column
        prop="orderItemTag"
        label="标签"
        :filters="[
          { text: '待支付', value: '待支付' },
          { text: '待发货', value: '待发货' },
          { text: '待收货', value: '待收货' },
          { text: '待评价', value: '待评价' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    this.initOrders();
  },
  methods: {
    initOrders() {
      var id = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "/demo/orders/getOrdersInfo/" + id,
          this.$qs.stringify({ userId: this.$getSessionStorage("user").userId })
        )
        .then((res) => {
          this.tableData=res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterTag(value, row) {
      return row.orderItemTag === value;
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