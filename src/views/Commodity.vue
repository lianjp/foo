<template>
  <div class="Commodity">
    <HomeHeader
      v-bind="{
        logInState: true,
        userName
      }"
    />
    <section class="main body">
      <section class="w-full">
        <div class="filter_group">
          <el-tabs ref="tabs" v-model="nativeStatus">
            <el-tab-pane
              v-for="(item, index) in statusOptions"
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
          <el-button-group class="button_group__left">
            <el-button
              size="small"
              type
              icon="el-icon-refresh"
              @click="refresh"
            />

            <el-button
              v-if="filterTypeTo(status, 'pushToShelves')"
              size="small"
              type
              :disabled="multipleSelection.length === 0"
              icon="el-icon-upload2"
              @click="onPushToShelves"
            >
              上架
            </el-button>

            <el-button
              v-if="filterTypeTo(status, 'pushOutShelves')"
              size="small"
              type
              :disabled="multipleSelection.length === 0"
              icon="el-icon-download"
              @click="onPushOutShelves"
            >
              下架
            </el-button>

            <el-button
              v-if="filterTypeTo(status, 'delete')"
              size="small"
              :disabled="multipleSelection.length === 0"
              type="danger"
              icon="el-icon-delete"
              @click="onDelete"
            >
              删除
            </el-button>

            <el-button
              v-if="filterTypeTo(status, 'restore')"
              size="small"
              :disabled="multipleSelection.length === 0"
              type="warning"
              icon="el-icon-warning"
              @click="onRestore"
            >
              恢复
            </el-button>

            <el-button
              v-if="filterTypeTo(status, 'restore')"
              size="small"
              :disabled="multipleSelection.length === 0"
              type="danger"
              icon="el-icon-delete"
              @click="onRemoveCompletelyGoods"
            >
              彻底删除
            </el-button>
          </el-button-group>

          <el-input
            v-model="nativeKeyword"
            placeholder="请输入内容"
            class="input-with-select"
            size="small"
            @change="keywordChangehandler"
          />
          <el-button-group>
            <AddNewCommodity @success="refresh">
              <el-button size="small" type="primary" icon="el-icon-plus">
                添加商品
              </el-button>
            </AddNewCommodity>
          </el-button-group>
        </div>
      </section>

      <tf-loading
        :loading="[
          searchGoodsListActionCount,
          removeCompletelyGoodsActionCount,
          addGoodsActionCount,
          restoreGoodsActionCount,
          pushToShelvesActionCount,
          pushOutShelvesActionCount,
          deleteGoodsActionCount
        ]"
      >
        <el-table
          ref="multipleTable"
          :data="goodsList"
          border
          reserve-selection
          class="table_section"
          tooltip-effect="dark"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" />
          <el-table-column prop="brandname" label="品牌" min-width="80" />
          <el-table-column label="商品" width="220" show-overflow-tooltip>
            <template slot-scope="scope">
              <ProductionCard
                :cate="scope.row.categoryname"
                :name="scope.row.title"
                :img="scope.row.thumb ? scope.row.thumb[0].url : ''"
              />
            </template>
          </el-table-column>
          <el-table-column prop="supplyprice" label="供货价" min-width="80" />
          <el-table-column prop="name" label="建议零售价" min-width="100">
            <template slot-scope="scope">
              {{ scope.row.smallprice }} ~ {{ scope.row.largeprice }}
            </template>
          </el-table-column>
          <el-table-column prop="total" label="库存" min-width="80" />
          <el-table-column prop="salenum" label="销量" min-width="80" />
          <el-table-column prop="type" label="状态" min-width="80">
            <template slot-scope="scope">
              {{ scope.row.type | commodityTypeToLabel }}
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="155">
            <template slot-scope="scope">
              {{ tt(scope.row.createtime) }}
            </template>
          </el-table-column>

          <el-table-column prop="name" label="操作" align="center" width="370">
            <template slot-scope="scope">
              <EditCommodity
                v-if="filterTypeTo(scope.row.type, 'edit')"
                :dispatch-id="scope.row.id"
                @success="refresh"
              >
                <el-button size="mini">
                  编辑
                </el-button>
              </EditCommodity>

              <DeleteCommodity
                v-if="filterTypeTo(scope.row.type, 'delete')"
                :dispatch-id="scope.row.id"
                @success="refresh"
              />

              <PushToShelves
                v-if="filterTypeTo(scope.row.type, 'pushToShelves')"
                :dispatch-id="scope.row.id"
                @success="refresh"
              />

              <PushOutShelves
                v-if="filterTypeTo(scope.row.type, 'pushOutShelves')"
                :dispatch-id="scope.row.id"
                @success="refresh"
              />

              <el-button
                v-if="filterTypeTo(scope.row.type, 'preview')"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >
                <!-- <i class="el-icon-info" /> -->
                预览
              </el-button>

              <!-- 二维码 -->
              <QRcodeDialog text="http://kjsystem.cn/">
                <el-button
                  v-if="filterTypeTo(scope.row.type, 'preview')"
                  size="mini"
                >
                  <i class="el-icon-document" />
                </el-button>
              </QRcodeDialog>

              <RestoreCommodity
                v-if="filterTypeTo(status, 'restore')"
                :dispatch-id="scope.row.id"
                @success="refresh"
              />

              <RemoveCompletelyGoods
                v-if="filterTypeTo(status, 'removeCompletely')"
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
            :total="+goodsTotal"
            background
            layout="prev, pager, next, total, jumper"
          />
          <PaginationGroupRight
            :multiple-selection="multipleSelection"
            @toggleSelection="toggleSelection"
          />
        </div>
      </tf-loading>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import orderStateTypeMap from '@/type/orderStateTypeMap.js'
const mapValues = require('lodash/mapValues')
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    // 订单状态
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
      pageSize: 10,
      total: 100,
      nativeKeyword: keyword,
      // select: '1',
      statusOptions: [
        {
          value: orderStateTypeMap.In_Sale,
          label: '出售中',
          type: 'primary',
          key: 'inSaleing'
        },
        {
          value: orderStateTypeMap.Under_Review,
          label: '审核中',
          type: 'primary',
          key: 'pending'
        },
        {
          value: orderStateTypeMap.Audit_Rejection,
          label: '审核拒绝',
          type: 'warning',
          key: 'refuse'
        },
        {
          value: orderStateTypeMap.Sold_Out,
          label: '已售空',
          type: 'info',
          key: 'soldOut'
        },
        {
          value: orderStateTypeMap.In_Warehouse,
          label: '仓库中',
          type: 'primary',
          key: 'wareHouseing'
        },
        {
          value: orderStateTypeMap.Recycle_Bin,
          label: '回收站',
          type: 'danger',
          key: 'recyclBin'
        }
      ],

      status2Options: [
        {
          label: '全部',
          value: '',
          type: 'danger'
        },
        {
          label: '审核中',
          value: '0',
          type: 'danger'
        },
        {
          label: '审核通过',
          value: '3',
          type: 'warning'
        },
        {
          label: '审核拒绝',
          value: '4',
          type: 'danger'
        }
      ],

      multipleSelection: []
    }
  },
  computed: {
    ...mapState('loading', {
      searchGoodsListActionCount: 'goodsModule/searchGoodsList',
      deleteGoodsActionCount: 'goodsModule/deleteGoods',
      pushToShelvesActionCount: 'goodsModule/pushToShelves',
      pushOutShelvesActionCount: 'goodsModule/pushOutShelves',
      removeCompletelyGoodsActionCount: 'goodsModule/removeCompletelyGoods',
      addGoodsActionCount: 'goodsModule/addGoods',
      restoreGoodsActionCount: 'goodsModule/restoreGoods'
    }),

    ...mapState('goodsModule', ['goodsList', 'goodsTotal', 'summaryData']),
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
        keyword: this.keyword,
        status: this.status,
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize
      }
    },
    ...mapState('userModule', ['userName']),
    filterTypeTo() {
      const showButtomMan = {
        edit: {
          includes: [
            'Audit_Rejection',
            'In_Sale',
            // 'Under_Review',
            'In_Warehouse',
            'Sold_Out'
          ]
        },
        delete: {
          includes: ['In_Sale', 'Sold_Out', 'In_Warehouse']
        },
        preview: {
          includes: ['In_Sale', 'Sold_Out', 'In_Warehouse', 'Recycle_Bin']
        },
        pushToShelves: {
          includes: ['In_Warehouse']
        },
        pushOutShelves: {
          includes: ['In_Sale']
        },
        restore: {
          includes: ['Recycle_Bin']
        },
        removeCompletely: {
          includes: ['Recycle_Bin']
        }
      }
      const mappedButtonMap = mapValues(showButtomMan, value => {
        return value.includes.map(key => orderStateTypeMap[key])
      })
      return (status, key) => {
        return mappedButtonMap[key].includes(status)
      }
    }
  },
  watch: {
    queryOption: {
      handler(queryOption) {
        this.searchStart(queryOption)
      },
      immediate: true
    },
    summaryData() {
      this.$refs.tabs.$refs.nav.$forceUpdate()
    }
  },
  methods: {
    ...mapActions('goodsModule', {
      searchStart: 'searchGoodsList',
      deleteStart: 'deleteGoods',
      pushToShelvesStart: 'pushToShelves',
      pushOutShelvesStart: 'pushOutShelves',
      restoreGoodsStart: 'restoreGoods',
      removeCompletelyGoodsStart: 'removeCompletelyGoods'
    }),

    handleEdit(index, row) {
      console.log(index, row)
    },

    refresh() {
      this.toggleSelection()
      this.searchStart(this.queryOption)
    },

    async onPushToShelves() {
      const confirmResult = await this.$confirm(
        '此操作是敏感操作，是否继续?',
        '上架',
        {
          type: 'warning'
        }
      ).then(_ => true, _ => false)
      if (confirmResult) {
        const { code, message } = await this.pushToShelvesStart({
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
    async onPushOutShelves() {
      const confirmResult = await this.$confirm(
        '此操作是敏感操作，是否继续?',
        '下架',
        {
          type: 'warning'
        }
      ).then(_ => true, _ => false)
      if (confirmResult) {
        const { code, message } = await this.pushOutShelvesStart({
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
    async onRestore() {
      const confirmResult = await this.$confirm(
        '此操作是敏感操作，是否继续?',
        '恢复',
        {
          type: 'warning'
        }
      ).then(_ => true, _ => false)
      if (confirmResult) {
        const { code, message } = await this.restoreGoodsStart({
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
    async onRemoveCompletelyGoods() {
      const confirmResult = await this.$confirm(
        '此操作是敏感操作，是否继续?',
        '彻底删除',
        {
          type: 'warning'
        }
      ).then(_ => true, _ => false)
      if (confirmResult) {
        const { code, message } = await this.removeCompletelyGoodsStart({
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
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleOverView(index, row) {
      console.log(index, row)
    },
    // toggleSelection(rows) {
    //   this.$refs.multipleTable.clearSelection()
    // },
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
      // 当选择框选择的元素变化时候触发，会把选择的全部元素传入
      this.multipleSelection = val
    },
    keywordChangehandler(keyword) {
      this.$routerQpush({ keyword })
    }
  }
}
</script>
<style lang="less" scoped>
.Commodity {
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
    .status_select2 {
      // 定住宽度，不然 flex 均分了，会导致样式变化
      width: 300px;
    }
  }
  .table_section {
    min-height: 500px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>
