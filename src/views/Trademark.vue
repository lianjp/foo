<template>
  <div class="Trademark">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <section class="w-full body">
      <div class="menu_section">
        <el-tabs
          ref="tabs"
          v-model="nativeStatus"
        >
          <el-tab-pane
            v-for="(item, index) in stateOptions"
            :key="index"
            lazy
            :label="item.label"
            :name="item.value"
          >
            <span slot="label">
              <ColoredSpan :type="item.type">
                <i class="el-icon-date" />
                {{ item.label }}
                <el-badge
                  :value="summaryData[item.key]"
                  :max="99"
                  :type="item.type"
                  class="badge_item"
                />
              </ColoredSpan>
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="search_section">
        <el-input
          v-model="nativeKeyword"
          clearable
          size="small"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="请输入内容"
          class="search_input"
          @change="keywordsChangehandler"
        >
          <span slot="prepend" class="title">品牌名称</span>
          <!-- <el-button slot="append" icon="el-icon-search" /> -->
        </el-input>
        <div class="data_picker">
          <span class="title">申请时间</span>
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
            :picker-options="pickerOptions"
          />
        </div>
      </div>

      <div class="button_group">
        <el-button-group class="button_group__left">
          <el-button
            size="small"
            type=""
            icon="el-icon-refresh"
            @click="searchTrademarkList(queryOption)"
          />
        </el-button-group>
        <el-button-group>
          <AddNewTrademark @success="refresh">
            <el-button size="small" type="primary" icon="el-icon-plus">
              新增品牌
            </el-button>
          </AddNewTrademark>
        </el-button-group>
      </div>

      <div class="table">
        <tf-loading :loading="[searchTrademarkListCount]">
          <el-table
            ref="multipleTable"
            :data="trademarkList"
            size="small"
            border
            reserve-selection
            class="table_section"
            tooltip-effect="dark"
            row-key="id"
            style="width: 100%"
          >
            <el-table-column label="申请时间" width="180">
              <template slot-scope="scope">
                {{ tt(scope.row.createtime) }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="品牌名称" min-width="80" />
            <el-table-column label="审核状态" min-width="80">
              <template slot-scope="scope">
                {{ getStatusName(scope.row.status).label }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="280">
              <template slot-scope="scope">
                <el-button
                  v-if="getStatusName(scope.row.status).value === '1'"
                  size="mini"
                  @click="
                    $router.push({
                      name: 'Commodity',
                      query: {
                        status: '1',
                        keyword: scope.row.name
                      }
                    })
                  "
                >
                  查看商品
                </el-button>

                <!-- @click="rePush(scope.$index, scope.row)" -->
                <EditTrademark :dispatch-id="scope.row.id" @success="refresh">
                  <el-button
                    v-if="getStatusName(scope.row.status).value === '2'"
                    size="mini"
                  >
                    重新发起
                  </el-button>
                </EditTrademark>

                <DeleteTrademark
                  v-if="getStatusName(scope.row.status).value !== '0'"
                  :trademark-id="scope.row.id"
                  @success="refreslTrademarkList"
                />

                <CancelTrademark
                  v-if="getStatusName(scope.row.status).value === '0'"
                  :trademark-id="scope.row.id"
                  @success="refreslTrademarkList"
                />
              </template>
            </el-table-column>
          </el-table>
        </tf-loading>

        <div class="pagination">
          <el-pagination
            :current-page.sync="nativeCurrentPage"
            :page-size="pageSize"
            :total="+trademarkTotal"
            background
            layout="prev, pager, next, total, jumper"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import pickerOptions from './timePickerOption.js'

// const mapValues = require('lodash/mapValues')
export default {
  components: {},
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      default: '-1'
    },
    keyword: {
      type: String,
      default: ''
    }
  },

  data() {
    const keyword = this.keyword
    return {
      // 新增或编辑，动作类型
      // 'add' 'edit'
      actionType: 'add',
      // 新增或编辑商品初始值
      addOrEditTradeMarkInitData: {},
      // 搜索关键字
      nativeKeyword: keyword,
      // 时间挫快捷键
      pickerOptions,
      // 时间挫， 起始结束
      timestamp: [],

      pageSize: 10,
      // 配置项
      stateOptions: [
        {
          label: '全部',
          value: '-1',
          type: 'primary',
          key: 'allBrand'
        },
        {
          label: '待审核',
          value: '0',
          type: 'primary',
          key: 'auditing'
        },
        {
          label: '审核拒绝',
          value: '2',
          type: 'danger',
          key: 'refuse'
        },
        {
          label: '审核通过',
          value: '1',
          type: 'primary',
          key: 'audited'
        }
        // ,
        // {
        //   label: '审核通过未供货',
        //   value: '3',
        //   type: 'warning'
        // }
      ],
      // 新增品牌的弹窗
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('trademarkModule', ['trademarkList', 'trademarkTotal', 'summaryData']),
    ...mapState('loading', {
      searchTrademarkListCount: 'trademarkModule/searchTrademarkList',
      addNewTrademarkCount: 'trademarkModule/addNewTrademark',
      editNewTrademarkCount: 'trademarkModule/editNewTrademark',
      getTrademarkDetailCount: 'trademarkModule/getTrademarkDetail'
    }),
    getStatusName() {
      const stateOptions = this.stateOptions
      const stateMap = {}
      stateOptions.forEach(v => {
        stateMap[v.value] = v
      })
      return status => {
        return stateMap[status]
      }
    },
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
        status: this.status,
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize,
        timestamp: this.timestamp,
        keyword: this.keyword
      }
    },
    ...mapState('userModule', ['userName'])
  },
  watch: {
    queryOption: {
      handler(queryOption) {
        this.searchTrademarkList(queryOption)
      },
      immediate: true
    },
    summaryData() {
      this.$refs.tabs.$refs.nav.$forceUpdate()
    }
  },
  methods: {
    ...mapActions('trademarkModule', [
      'searchTrademarkList',
      'addNewTrademark',
      'editNewTrademark',
      'getTrademarkDetail'
    ]),
    handleClick(tab, event) {
      console.log(tab, event)
    },
    refresh() {
      this.searchTrademarkList(this.queryOption)
    },
    keywordsChangehandler(keyword) {
      this.$routerQpush({ keyword })
    },
    handleCancel(index, row) {
      console.log(index, row)
    },
    async rePush(index, row) {
      const { code, data } = await this.getTrademarkDetail({
        id: row.id
      })
      if (this.isSuccessful(code)) {
        this.actionType = 'edit'
        this.dialogVisible = true
        this.addOrEditTradeMarkInitData = {
          ...data,
          id: row.id
        }
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    showAddNewTrademark() {
      this.actionType = 'add'
      this.dialogVisible = true
    },
    refreslTrademarkList() {
      this.searchTrademarkList(this.queryOption)
    },
    async submitAddOrEditNewTrademark(formData) {
      const actionType = this.actionType
      let result
      if (actionType === 'add') {
        result = await this.addNewTrademark(formData)
      } else if (actionType === 'edit') {
        result = await this.editNewTrademark({
          ...formData,
          id: this.addOrEditTradeMarkInitData.id
        })
      }
      const { code, message } = result
      this.$message({
        message,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
      if (this.isSuccessful(code)) {
        this.searchTrademarkList(this.queryOption)
        this.dialogVisible = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.Trademark {
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
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
    .menu_section {
      margin-top: 10px;
      .badge_item {
        width: 35px;
      }
    }
    .table {
      margin-top: 10px;
      .table_section {
        min-height: 400px;
      }
    }
  }
  /deep/ .search_input .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
