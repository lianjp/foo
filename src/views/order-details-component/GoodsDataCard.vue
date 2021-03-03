<template>
  <div class="GoodsDataCard">
    <h5>商品信息</h5>
    <el-table border :data="list">
      <el-table-column prop="goodsname" label="标题" width="180" />
      <el-table-column prop="goodssn" label="商品编码" width="180" />
      <el-table-column prop="productsn" label="商品条码" width="180" />
      <el-table-column prop="address" label="单价、数量" min-width="180">
        <template v-slot:default="scope">
          <div>
            <div class="total">
              <span class="label">
                数量：
              </span>
              <span class="val">
                {{ scope.row.total }}
              </span>
            </div>
            <div class="price">
              <span class="label">
                单价：
              </span>
              <span class="val">
                {{ scope.row.gxgoodsprice }}
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" />
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.GoodsDataCard {
  h5 {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  .cell {
    display: flex;
    margin-top: 15px;
    align-items: center;
    .label {
      min-height: 0;
      flex: 0 0 100px;
      text-align: right;
    }
    .value {
      min-height: 0;
      flex: 1 1 auto;
    }
  }
}
</style>
