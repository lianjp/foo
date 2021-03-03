<template>
  <tf-loading
    class="WayOfExpressage"
    :loading="[
      searchActionCount,
      deleteDispatchCount,
      enableDispatchCount,
      disableDispatchCount]"
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
            type=""
            icon="el-icon-success"
            @click="onEnable"
          >
            启用
          </el-button>
          <el-button
            size="small"
            :disabled="multipleSelection.length === 0"
            type="info"
            icon="el-icon-error"
            @click="onDisable"
          >
            禁用
          </el-button>
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
          <el-select
            v-model="nativeState"
            size="small"
            placeholder="请选择"
          >
            <el-option label="全部" value="" />
            <el-option label="禁用" value="0" />
            <el-option label="启用" value="1" />
          </el-select>
        </div>
        <div>
          <el-input
            v-model="nativeKeyword"
            placeholder="请输入关键字"
            class="input-with-select"
            autocomplete="off"
            autocorrect="off"
            clearable
            autocapitalize="off"
            spellcheck="false"
            size="small"
            @change="keywordsChangehandler"
          />
        </div>
        <el-button-group>
          <AddNewDispatch @success="refresh">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
            >
              添加配送方式
            </el-button>
          </AddNewDispatch>
        </el-button-group>
      </div>
    </section>

    <section class="w-full">
      <el-table
        ref="multipleTable"
        size="small"
        :data="list"
        border
        :resizable="false"
        reserve-selection
        class="table_section"
        tooltip-effect="dark"
        row-key="id"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
          reserve-selection
        />
        <el-table-column
          prop="displayorder"
          label="顺序"
          min-width="40"
        />
        <el-table-column
          label="名称"
          prop="dispatchname"
          width="130"
        />
        <el-table-column
          prop="calculatetype"
          label="计费方式"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.calculatetype }}
          </template>
        </el-table-column>
        <el-table-column
          prop="firstweightprice"
          label="首重价格"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.firstweightprice | moneyToLabel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="secondweightprice"
          label="续重价格"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.secondweightprice | moneyToLabel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="firstnumprice"
          label="首件价格"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.firstnumprice | moneyToLabel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="secondnumprice"
          label="续件价格"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.secondnumprice | moneyToLabel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.enabled | enabledToLabel }}
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
            <!-- <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">
                  编辑
                </el-button> -->
            <EditDispatch
              :dispatch-id="scope.row.id"
              @success="refresh"
            >
              <el-button
                size="mini"
                type="primary"
              >
                编辑
              </el-button>
            </EditDispatch>
            <DeleteDispatch
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
      <!-- <div>
        {{ state }} {{ currentPage }}
      </div> -->
      <!-- <div>
        {{ multipleSelection.map(v=>v.id) }}
      </div> -->
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
    // 配送方式状态
    state: {
      type: String,
      default: ''
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
      loading2: true,
      // total: 100,
      // 搜索关键字
      nativeKeyword: keyword,
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('expressModule', {
      list: 'dispatchList',
      total: 'dispatchListTotal'
    }),
    ...mapState('loading', {
      searchActionCount: 'expressModule/getDispatchList',
      enableDispatchCount: 'expressModule/enableDispatch',
      disableDispatchCount: 'expressModule/disableDispatch',
      deleteDispatchCount: 'expressModule/deleteDispatch'
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
    nativeState: {
      get() {
        return this.state || ''
      },
      set(num) {
        if (this.state !== num) {
          this.$routerQpush({ state: num })
        }
      }
    },
    // 查询参数
    queryOption() {
      return {
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        state: this.nativeState
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
    ...mapActions('expressModule', {
      searchStart: 'getDispatchList',
      enableDispatch: 'enableDispatch',
      disableDispatch: 'disableDispatch',
      deleteStart: 'deleteDispatch'
    }),
    async onEnable() {
      const { code, message } = await this.enableDispatch({
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
    },
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
    async onDisable() {
      const { code, message } = await this.disableDispatch({
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
    // toggleSelection([tableData[1], tableData[2]])
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
.WayOfExpressage {
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
