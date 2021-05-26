<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ consumerCount }}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ productCount }}</div>
              <div>化妆品总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ ordersCount }}</div>
              <div>订单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ storeCount }}</div>
              <div>店铺总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3>化妆品类型数量统计</h3>
        <el-card>
          <ve-pie :data="productType" :theme="typeOptions"></ve-pie>
        </el-card>
      </el-col>
      <el-col :span="12">
        <h3>网站销售额统计</h3>
        <el-card>
          <ve-line :data="ordersAmount"></ve-line>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VePie from "v-charts/lib/pie";
export default {
  components: { VePie },
  data() {
    return {
      consumerCount: 0,
      productCount: 0,
      ordersCount: 0,
      storeCount: 0,
      User_List: [],
      Product_List: [],
      Orders_List: [],
      Store_List: [],
      productType: {
        columns: ["类型", "总数"],
        rows: [
          { 类型: "水乳", 总数: 0 },
          { 类型: "精华水", 总数: 0 },
          { 类型: "精华液", 总数: 0 },
          { 类型: "面霜", 总数: 0 },
          { 类型: "眼霜", 总数: 0 },
          { 类型: "眼精华", 总数: 0 },
          { 类型: "身体乳", 总数: 0 },
          { 类型: "防晒", 总数: 0 },
          { 类型: "粉底液", 总数: 0 },
          { 类型: "气垫", 总数: 0 },
          { 类型: "眼影", 总数: 0 },
          { 类型: "眼线笔", 总数: 0 },
          { 类型: "睫毛膏", 总数: 0 },
          { 类型: "眉笔", 总数: 0 },
          { 类型: "腮红", 总数: 0 },
          { 类型: "修容", 总数: 0 },
          { 类型: "高光", 总数: 0 },
          { 类型: "唇釉", 总数: 0 },
          { 类型: "唇膏", 总数: 0 },
          { 类型: "定妆喷雾", 总数: 0 },
          { 类型: "散粉", 总数: 0 },
          { 类型: "美妆工具", 总数: 0 },
        ],
      },
      typeOptions: {
        legend: {
          // type: 'scroll',
          orient: "vertical",
          x: "left",
        },
        series: [
          {
            // radius: "55%",
            // center: ["70%", "50%"],
            // left:40,
          },
        ],
      },
      ordersAmount: {
        columns: ["日期", "金额"],
        rows: [
          { 日期: "2021-05-27", 金额: 0 },
        // { 日期: "2021-05-07", 金额: 0 }
        ],
      },
    };
  },
  mounted() {
    this.getUserAll();
    this.getProductAll();
    this.getOrdersAll();
    this.getStoreAll();
  },
  methods: {
    getUserAll() {
      this.$axios
        .post("demo/user/getList")
        .then((res) => {
          this.User_List = res.data;
          this.consumerCount = this.User_List.length;
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    getProductAll() {
      this.$axios
        .post("demo/product/getProductList")
        .then((res) => {
          this.Product_List = res.data;
          this.productCount = this.Product_List.length;
          for (let item of this.Product_List) {
            this.getByType(item.type);
          }
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    getOrdersAll() {
      this.$axios
        .post("demo/orders/getOrdersList")
        .then((res) => {
          this.Orders_List = res.data;
          this.ordersCount = this.Orders_List.length;
          this.getAmountByDate();
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    getStoreAll() {
      this.$axios
        .post("demo/store/getStoreList")
        .then((res) => {
          this.Store_List = res.data;
          this.storeCount = this.Store_List.length;
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    getByType(type) {
      for (let item of this.productType.rows) {
        if (type == item["类型"]) {
          item["总数"]++;
        }
      }
    },
    getAmountByDate() {
      for (let item1 of this.Orders_List) {
        for (let item2 of this.ordersAmount.rows) {
          if (item1.orderDate.includes(item2["日期"])) {
            item2["金额"] += item1.totalAmount;
          }
          else{
            this.ordersAmount.rows.push({日期:item1.orderDate,金额:item1.totalAmount})
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.mgb20 {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 50px;
}
.grid-cont-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: darkgray;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
</style>