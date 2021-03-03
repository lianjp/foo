<template>
  <div class="Financial">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <tf-loading class="w-full body" :loading="[searchActionCount]">
      <div class="menu_section">
        <el-tabs v-model="nativeStatus" class="el-tabs">
          <el-tab-pane
            v-for="(item, index) in statusOptions"
            :key="index"
            :label="item.label"
            :name="item.value"
          >
            <span slot="label">
              <ColoredSpan :type="item.type">
                <i class="el-icon-date" />
                {{ item.label }}
                <!-- <el-badge
                  :value="999"
                  :max="99"
                  :type="item.type"
                  class="badge_item" /> -->
              </ColoredSpan>
            </span>
          </el-tab-pane>
        </el-tabs>

        <el-button-group class="button_group__left">
          <el-button
            class="request_withdraw_money "
            type="primary"
            size="small"
            @click="$router.push({ name: 'RequestWithdrawMoney' })"
          >
            申请提现
          </el-button>
        </el-button-group>
      </div>

      <div class="search_section">
        <el-button-group>
          <el-button
            size="small"
            type=""
            icon="el-icon-refresh"
            @click="refresh"
          />
        </el-button-group>
        <el-input
          v-model="nativeKeyword"
          clearable
          size="small"
          placeholder="请输入单号"
          class="search_input"
          @change="keywordChangehandler"
        >
          <span slot="prepend" class="title">申请单号</span>
          <!-- <el-button slot="append" icon="el-icon-search" /> -->
        </el-input>
        <div class="data_picker">
          <span class="title">时间选择</span>
          <el-date-picker
            v-model="timestamp"
            type="daterange"
            size="small"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
          >
            :picker-options="pickerOptions" />
          </el-date-picker>
        </div>

        <el-button-group>
          <el-button size="small" type="primary" icon="el-icon-download">
            导出
          </el-button>
        </el-button-group>
      </div>

      <div class="table">
        <el-table
          ref="multipleTable"
          :data="list"
          size="small"
          border
          reserve-selection
          class="table_section"
          tooltip-effect="dark"
          row-key="id"
          style="width: 100%"
        >
          <el-table-column label="申请单号" prop="applyno" min-width="200" />

          <el-table-column label="申请金额" prop="realprice" width="100" />

          <el-table-column
            label="抽成后金额"
            prop="realpricerate"
            min-width="200"
          />

          <el-table-column label="抽成比例" width="100">
            <template slot-scope="scope">
              {{ scope.row.payrate }}%
            </template>
          </el-table-column>

          <el-table-column prop="ordernum" label="申请订单个数" width="100" />

          <el-table-column prop="applytype" label="提现方式" width="100" />

          <el-table-column align="center" label="申请时间" width="180">
            <template slot-scope="scope">
              {{ tt(scope.row.applytime) }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="
                  $router.push({
                    name: 'WithdrawalDetails',
                    params: {
                      id: scope.row.id
                    }
                  })
                "
              >
                查看详情
              </el-button>
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// Financial
import pickerOptions from '../timePickerOption.js'
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    status: {
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
      // 搜索关键字
      nativeKeyword: keyword,
      // 时间挫快捷键
      pickerOptions,
      // 时间挫， 起始结束
      timestamp: '',
      pageSize: 10,
      // 配置项
      statusOptions: [
        {
          label: '待审核',
          value: '1',
          type: 'primary'
        },
        {
          label: '待结算',
          value: '2',
          type: 'danger'
        },
        {
          label: '已结算',
          value: '3',
          type: 'primary'
        },
        {
          label: '已无效',
          value: '-1',
          type: 'warning'
        }
      ]
    }
  },
  computed: {
    ...mapState('userModule', ['userName']),
    ...mapState('financialModule', {
      list: 'finacialRecordList',
      total: 'finacialRecordTotal'
    }),
    ...mapState('loading', {
      searchActionCount: 'financialModule/getFinacialRecordList'
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
        return this.status || '1'
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
      handler(queryOption, oldQueryOption) {
        this.searchStart(queryOption)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('financialModule', {
      searchStart: 'getFinacialRecordList'
    }),
    refresh() {
      this.searchStart(this.queryOption)
    },
    keywordChangehandler(keyword) {
      this.$routerQpush({ keyword })
    }
  }
}
</script>
<style lang="less" scoped>
.Financial {
  .w-full {
    .wf();
    // 搜索模块
    .search_section {
      display: flex;
      justify-content: space-between;
      .search_input {
        width: 380px;
      }
      .data_picker {
        .title {
          font-size: 13px;
          padding: 0 10px;
          color: #585858;
        }
      }
    }
    // 上边的操作模块
    .button_group {
      display: flex;
      justify-content: space-between;
    }
    .menu_section {
      margin-top: 10px;
      position: relative;
      .badge_item {
        width: 35px;
      }
      .button_group__left {
        position: absolute;
        right: 0;
        top: 0;
      }
      .el-tabs {
        flex: 1 1 auto;
      }
    }
    .table {
      margin-top: 10px;
    }
  }
  .table_section {
    margin-top: 16px;
    margin-bottom: 16px;
    min-height: 500px;
  }
  /deep/ .search_input .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
