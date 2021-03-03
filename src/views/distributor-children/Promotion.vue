<template>
  <tf-loading :loading="[searchActionCount]" class="promotion">
    <div class="search_section">
      <el-button-group class="button_group__left">
        <el-button
          size="small"
          type=""
          icon="el-icon-refresh"
          @click="refresh"
        />
      </el-button-group>
      <div class="input-with-payway">
        <span class="title">审核状态</span>
        <el-select
          v-model="nativeStatus"
          size="small"
          style="width: 120px;"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, key) in statusMap"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-input
        v-model="nativeKeyword"
        clearable
        placeholder="请输入"
        class="input-with-select"
        size="small"
        @change="keywordsChangehandler"
      >
        <span slot="prepend" class="title">分销商账号 / 分销商店铺</span>
      </el-input>

      <div v-if="false" class="data_picker">
        <span class="title">成为推广员时间</span>
        <el-date-picker
          v-model="timestamp"
          type="daterange"
          align="right"
          size="small"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions"
        />
      </div>
    </div>
    <div class="w-full">
      <el-table
        ref="multipleTable"
        :data="list"
        border
        reserve-selection
        class="table_section"
        tooltip-effect="dark"
        row-key="id"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="商品名称" prop="goodsname" width="130" />
        <el-table-column label="品牌" prop="brand" width="130" />
        <el-table-column label="商品" show-overflow-tooltip width="400">
          <template slot-scope="scope">
            <ProductionCard
              :cate="scope.row.tcate"
              :name="scope.row.goodsname"
              :img="scope.row.thumb[0].url"
            />
          </template>
        </el-table-column>
        <el-table-column label="分销商" show-overflow-tooltip width="140">
          <template v-slot:default="scope">
            <div class="storename">
              {{ scope.row.storename }}
            </div>
            <div class="mobile">
              {{ scope.row.mobile }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="审核状态" width="100">
          <template v-slot:default="scope">
            <div>
              {{ scope.row.status | applyStatusToLabel }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="申请时间" width="100">
          <template v-slot:default="scope">
            {{ tt(scope.row.jointime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
          <template slot-scope="scope">
            <AuditPromotion :dispatch-id="scope.row.id" @success="refresh">
              <el-button size="mini" type="primary">
                审核
              </el-button>
            </AuditPromotion>
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
      </div>
    </div>
  </tf-loading>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import pickerOptions from '../timePickerOption.js'

const statusMap = [
  {
    label: '全部',
    value: ''
  },
  {
    value: '0',
    label: '待审核'
  },
  {
    value: '1',
    label: '审核通过'
  },
  {
    value: '2',
    label: '审核拒绝'
  }
]

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    status: {
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
      // 搜索关键字
      nativeKeyword: keyword,
      // 时间挫快捷键
      pickerOptions,
      // 时间挫， 起始结束
      timestamp: '',
      statusMap,
      pageSize: 10,

      multipleSelection: []
    }
  },
  computed: {
    ...mapState('distributorModule', {
      list: 'promotersList',
      total: 'promotersTotal'
    }),
    ...mapState('loading', {
      searchActionCount: 'distributorModule/getPromotersMyList'
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

    nativeStatus: {
      get() {
        return this.status || ''
      },
      set(num) {
        if (this.status !== num) {
          this.$routerQpush({ status: num })
        }
      }
    },
    // 查询参数
    queryOption() {
      return {
        status: this.nativeStatus,
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        timestamp: this.timestamp
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
    ...mapActions('distributorModule', {
      searchStart: 'getPromotersMyList',
      deleteBackAdress: 'deleteBackAdress'
    }),
    keywordsChangehandler(keyword) {
      this.$routerQpush({ keyword })
    },

    refresh() {
      this.toggleSelection()
      this.searchStart(this.queryOption)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.promotion {
  .w-full {
    .wf();
  }
  .search_section {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    .title {
      padding-right: 10px;
      font-size: 13px;
      color: #585858;
    }
    .input-with-select {
      width: 400px;
    }
    .input-with-payway {
      min-width: 200px;
    }
    .data_picker {
      display: flex;
      align-items: center;
    }
  }

  .table_section {
    margin-top: 16px;
    margin-bottom: 16px;
    min-height: 500px;
  }
  /deep/ .input-with-select .el-select .el-input {
    width: 120px;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  /deep/ .search_section .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
