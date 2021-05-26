<template>
  <div>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="orderDate"
        label="下单日期"
        sortable
        column-key="date"
      >
      </el-table-column>
      <el-table-column prop="orderId" label="订单编号"> </el-table-column>
      <el-table-column prop="userId" label="用户ID"> </el-table-column>
      <el-table-column prop="itemNumber" label="订单项数"> </el-table-column>
      <el-table-column prop="totalAmount" label="订单总金额"> </el-table-column>
      <!-- 筛选状态 -->
      <el-table-column
        prop="orderTag"
        label="订单状态"
        :filters="[
          { text: '待付款', value: '待付款' },
          { text: '待发货', value: '待发货' },
          { text: '待收货', value: '待收货' },
          { text: '待评价', value: '待评价' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        ><template slot-scope="scope">
          <el-tag
            :type="scope.row.orderTag === '待付款' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.orderTag }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.orderId,scope.row.orderTag)"
            >修改状态</el-button
          >
          <el-dialog :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="editOrderForm" label-width="100px">
              <el-form-item class="dialog-changeOrderTag" label="订单状态">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <div class="btn-dialog">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEdit">提交</el-button>
              </div>
            </el-form>
          </el-dialog>
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
      editOrderForm: {
        orderId: "",
        orderTag: "",
      },
      dialogFormVisible: false,
      options: [{
          value: '待付款',
          label: '待付款'
        }, {
          value: '待发货',
          label: '待发货'
        }, {
          value: '待收货',
          label: '待收货'
        }, {
          value: '待评价',
          label: '待评价'
        }],
        value: ''
    };
  },
  methods: {
    getOrdersList() {
      this.$axios
        .post("demo/orders/getOrdersList")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    },
    filterTag(value, row) {
      return row.orderTag === value;
    },
    handleEdit(id,tag) {
      this.dialogFormVisible = true;
      this.editOrderForm.orderId=id;
      this.editOrderForm.orderTag=tag;
    },
    submitEdit(){
      this.dialogFormVisible=false;
      this.editOrderForm.orderTag=this.value;
      // console.log(this.editOrderForm);
      this.$axios
        .post("demo/orders/editOrderTag",this.$qs.stringify(this.editOrderForm))
        .then((res) => {
          // console.log(res.data);
          if(res.data==1)
          {
            this.$message.success("修改成功");
            this.getOrdersList();
          }else{
            this.$message.error("修改失败");
          }
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    }
  },
  mounted() {
    this.getOrdersList();
  },
};
</script>

<style scoped>
/* .el-button {
  float: right;
} */
.btn-dialog{
  margin-left: 280px;
}
.dialog-changeOrderTag{
  margin-bottom: 22px;
  margin-left: 200px;
}
</style>