<template>
  <tf-loading
    class="BackFreightAdress"
    :loading="[getBackAdressListActionCount, deleteBackAdressActionCount]"
  >
    <section class="w-full">
      <div class="button_group">
        <el-button-group>
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
            v-model="nativeKeyword"
            placeholder="请输入关键字"
            class="input-with-select"
            size="small"
            clearable
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @change="keywordsChangehandler"
          />
        </div>
        <el-button-group>
          <AddNewBackAdress @success="refresh">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
            >
              添加退货地址
            </el-button>
          </AddNewBackAdress>
        </el-button-group>
      </div>
    </section>

    <section class="w-full">
      <el-table
        ref="multipleTable"
        size="small"
        :data="list"
        border
        reserve-selection
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
          prop="title"
          width="130"
        />
        <el-table-column
          prop="name"
          label="联系人"
          min-width="80"
        />
        <el-table-column
          prop="mobile"
          label="手机"
          min-width="80"
        />
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip
          min-width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>

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
          prop="name"
          label="操作"
          align="center"
          min-width="180"
        >
          <template slot-scope="scope">
            <EditBackAdress
              :dispatch-id="scope.row.id"
              @success="refresh"
            >
              <el-button
                size="mini"
                type="primary"
              >
                编辑
              </el-button>
            </EditBackAdress>
            <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button> -->
            <DeleteBackAdress
              :dispatch-id="scope.row.id"
              @success="refresh"
            />
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
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
      nativeKeyword: keyword,
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('backFreightAdress', {
      list: 'backAdressList',
      total: 'backAdressTotal'
    }),
    ...mapState('loading', {
      deleteBackAdressActionCount: 'backFreightAdress/deleteBackAdress',
      getBackAdressListActionCount: 'backFreightAdress/getBackAdressList'
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
    // 退货地址管理模块
    ...mapActions('backFreightAdress', {
      searchStart: 'getBackAdressList',
      deleteStart: 'deleteBackAdress'
    }),
    keywordsChangehandler(keyword) {
      this.$routerQpush({ keyword })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    refresh() {
      this.toggleSelection()
      this.searchStart(this.queryOption)
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
.BackFreightAdress {
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
    margin-top: 16px;
    margin-bottom: 16px;
    min-height: 500px;
  }
}
</style>
