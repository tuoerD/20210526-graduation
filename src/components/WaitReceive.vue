
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
      >
      </el-table-column>
      <el-table-column prop="productName" label="商品"> </el-table-column>
      <el-table-column prop="storeName" label="店铺"> </el-table-column>
      <el-table-column prop="nowPrice" label="单价"> </el-table-column>
      <el-table-column prop="productCount" label="数量"> </el-table-column>
      
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
    initWaitPay() {
      var id = this.$getSessionStorage("user").userId;
      this.$axios
        .post(
          "/demo/orders/getOrdersInfo/" + id,
          this.$qs.stringify({ userId: this.$getSessionStorage("user").userId })
        )
        .then((res) => {
          for (var i = 0; res.data[i]; i++) {
            if (res.data[i].orderTag == "待收货") {
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