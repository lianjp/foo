<template>
  <tf-loading
    class="Warehouse"
    :loading="[
      deleteWarehouseCount,
      searchActionCount
    ]"
  >
    <section class="w-full">
      <div class="button_group">
        <el-button-group class="button_group__left">
          <el-button
            size="small"
            type=""
            icon="el-icon-refresh"
            @click="refresh"
          />
          <el-button
            size="small"
            :disabled="multipleSelection.length === 0"
            type="danger"
            icon="el-icon-delete"
            @click="onDelete"
          >
            删除
          </el-button>
        </el-button-group>
        <div>
          <el-input
            v-if="false"
            v-model="nativeKeyword"
            clearable
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="请输入关键字"
            class="input-with-select"
            size="small"
            @change="keywordsChangehandler"
          />
        </div>
        <el-button-group>
          <AddNewWarehouse @success="refresh">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
            >
              新建仓库
            </el-button>
          </AddNewWarehouse>
        </el-button-group>
      </div>
    </section>

    <section class="w-full">
      <el-table
        ref="multipleTable"
        size="small"
        :data="list"
        border
        class="table_section"
        tooltip-effect="dark"
        row-key="id"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          reserve-selection
          type="selection"
          width="40"
        />
        <el-table-column
          label="名称"
          prop="name"
          width="130"
        />
        <el-table-column
          prop="created"
          label="创建时间"
          min-width="120"
        >
          <template slot-scope="scope">
            {{ tt(scope.row.created) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="仓库地址"
          min-width="80"
        />
        <el-table-column
          prop="tel"
          label="联系电话"
          min-width="80"
        />

        <el-table-column
          prop="isdefault"
          label="默认"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.isdefault | isdefaultTolabel }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="180"
        >
          <template slot-scope="scope">
            <EditWarehouse
              :dispatch-id="scope.row.id"
              @success="refresh"
            >
              <el-button
                size="mini"
                type="primary"
              >
                编辑
              </el-button>
            </EditWarehouse>
            <DeleteWarehouse
              :dispatch-id="scope.row.id"
              @success="refresh"
            />
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <!-- <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next, total, jumper"
            :total="400">
          </el-pagination> -->
        <el-pagination
          :current-page.sync="nativeCurrentPage"
          :page-size="pageSize"
          :total="+total"
          background
          layout="prev, pager, next, total, jumper"
        />
        <PaginationGroupRight
          :multiple-selection="multipleSelection"
          @toggleSelection="toggleSelection"
        />
      </div>
    </section>
  </tf-loading>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    // 订单状态
    state: {
      type: String,
      default: '1'
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    const keyword = this.keyword

    return {
      pageSize: 10,
      // total: 100,
      // 搜索关键字
      nativeKeyword: keyword,
      // select: '1',
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('warehouseModule', {
      list: 'warehouseList',
      total: 'warehouseTotal'
    }),
    ...mapState('loading', {
      searchActionCount: 'warehouseModule/getwarehouseList',
      deleteWarehouseCount: 'warehouseModule/deleteWarehouse'
    }),
    nativeCurrentPage: {
      get() {
        return this.currentPage || 1
      },
      set(num) {
        if (this.currentPage !== num) {
          this.$routerQpush({ currentPage: num })
        }
      }
    },
    // 查询参数
    queryOption() {
      return {
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      }
    }
  },
  watch: {
    queryOption: {
      handler(queryOption) {
        this.searchStart(queryOption)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('warehouseModule', {
      searchStart: 'getwarehouseList',
      // 删除仓库
      deleteStart: 'deleteWarehouse'
    }),

    async refresh() {
      this.toggleSelection()
      await this.searchStart(this.queryOption)
    },

    async onDelete() {
      const confirmResult = await this.$confirm(
        '此操作是敏感操作，是否继续?',
        '删除',
        {
          type: 'warning'
        }
      ).then(_ => true, _ => false)
      if (confirmResult) {
        const { code, message } = await this.deleteStart({
          ids: this.multipleSelection.map(v => v.id)
        })
        this.$message({
          message,
          type: this.isSuccessful(code) ? 'success' : 'error',
          duration: 800
        })
        if (this.isSuccessful(code)) {
          this.refresh()
        }
      }
    },
    keywordsChangehandler(keyword) {
      this.$routerQpush({ keyword })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleOverView(index, row) {
      console.log(index, row)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
.Warehouse {
  .w-full {
    .wf();
  }
  .filter_group {
    margin-top: 10px;
    .tag {
      .cp();
    }
  }

  /deep/ .input-with-select .el-select .el-input {
    width: 93px;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .filter_group {
    margin-top: 10px;
    .badge_item {
      width: 35px;
    }
  }
  .search_section {
    display: flex;
    justify-content: space-between;
    .input-with-select {
      width: 380px;
    }
  }
  .button_group {
    display: flex;
    justify-content: space-between;
  }
  .table_section {
    min-height: 500px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>
