<template>
  <div>
    <el-table
      :data="tableData1"
      style="width: 100%"
      row-key="id"
      border
    >
    <el-table-column prop="storeId" label="店铺ID">
      </el-table-column>
      <el-table-column prop="storeName" label="店铺名称">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StorePage",
  data() {
    return {
      tableData1: [],
    };
  },
  methods:{
    getStoreList(){
      this.$axios
        .post("demo/store/getStoreList")
        .then((res) => {
          this.tableData1 = res.data;
          // console.log(this.tableData);
        })
        .catch((e) => {
          this.$message.error("服务器内部发生异常");
          console.log(e);
        });
    }
  },
  mounted(){
    this.getStoreList();
  }
};
</script>

<style scoped>
</style>