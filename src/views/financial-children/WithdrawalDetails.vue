<template>
  <div class="WithdrawalDetails">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <tf-loading
      class="main body"
      :loading="[getApplyWithdrawDetailByIdCount]"
    >
      <div class="search_group">
        <el-button-group>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-arrow-left"
            @click="$router.push({ name: 'Financial'})"
          >
            返回
          </el-button>
        </el-button-group>
      </div>
      <div class="main_content">
        <el-steps
          :active="step"
          align-center
          :finish-status="finishStatus"
        >
          <el-step title="申请中" :description="tt(oneDetail.applytime)" />
          <el-step title="平台审核" description="" />
          <el-step title="平台打款" description="" />
          <el-step title="无效" description="" />
        </el-steps>

        <GridTable
          class="card_group"
          :table-width="1200"
          :item-width="380"
          align-items="center"
          :item-x-gap="10"
          :item-y-gap="10"
        >
          <GridTableItem>
            <div class="card">
              <h5 class="title">
                申请的金额
              </h5>
              <div class="card_body">
                {{ oneDetail.realpricerate }}
              </div>
              <div class="card_footer">
                抽成前金额： {{ oneDetail.realprice }}
              </div>
            </div>
          </GridTableItem>

          <GridTableItem>
            <div class="card">
              <h5 class="title">
                申请的订单金额
              </h5>
              <div class="card_body">
                {{ oneDetail.orderprice }}
              </div>
              <div class="card_footer">
                订单个数： {{ oneDetail.ordernum }}
              </div>
            </div>
          </GridTableItem>

          <GridTableItem>
            <div class="card">
              <h5 class="title">
                抽成比例
              </h5>
              <div class="card_body">
                {{ oneDetail.payrate }} %
              </div>
              <div class="card_footer" />
            </div>
          </GridTableItem>
        </GridTable>
        <div class="table">
          <header class="header">
            <b>
              提现方式：
            </b>
            {{ oneDetail.applytype | applyTypeToLabel }}
          </header>
          <div class="table_body">
            <el-table
              ref="multipleTable"
              :data="oneDetail.orderList"
              size="small"
              border
              reserve-selection
              class="table_section"
              tooltip-effect="dark"
              row-key="id"
              style="width: 100%"
            >
              <el-table-column
                label="订单编号"
                prop="ordersn"
                align="center"
                header-align="left"
                width="220"
              />
              <el-table-column
                label="订单金额"
                prop="price"
                align="center"
                header-align="left"
                min-width="120"
              />
              <el-table-column
                label="可提现金额"
                prop="withdrawalprice"
                align="center"
                header-align="left"
                min-width="120"
              />
              <el-table-column
                label="抽成比例"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.payrate }} %
                </template>
              </el-table-column>
              <el-table-column
                label="抽成后可获得金额"
                prop="percentageprice"
                align="center"
                header-align="left"
                min-width="120"
              />
              <el-table-column
                label="订单完成时间"
                min-width="180"
              >
                <template slot-scope="scope">
                  {{ tt(scope.row.finishtime) }}
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                width="100"
              >
                <template slot-scope="scope">
                  {{ scope.row.status | withdrawTypeToLabel }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </tf-loading>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    withdrawalId: {
      default: '0',
      type: String
    }
  },
  data() {
    return {}
  },

  computed: {
    ...mapState('loading', {
      getApplyWithdrawDetailByIdCount:
        'financialModule/getApplyWithdrawDetailById'
    }),
    ...mapState('userModule', ['userName']),
    ...mapState('financialModule', ['oneDetail']),
    finishStatus() {
      const status = this.oneDetail.status
      const statusMap = {
        '-1': 'error',
        // 提交申请
        '1': 'success',
        // 通过申请
        '2': 'success',
        // 完成打款
        '3': 'success'
      }
      return statusMap[status]
    },
    step() {
      const status = this.oneDetail.status
      const statusMap = {
        // 提交申请
        '1': 0,
        // 通过申请
        '2': 1,
        // 完成打款
        '3': 2,
        '-1': 3
      }
      return statusMap[status]
    }
  },
  created() {
    this.initData()
  },
  methods: {
    ...mapActions('financialModule', ['getApplyWithdrawDetailById']),
    initData() {
      this.getApplyWithdrawDetailById({
        id: this.withdrawalId
      })
    }
  }
}
</script>

<style lang="less" scoped>
@marginDistance: 10px;

.WithdrawalDetails {
  .main {
    .search_group {
      margin-top: 10px;
    }
    .main_content {
      margin-top: 10px;
    }
  }

  .card_group {
    margin-top: @marginDistance;
    .card {
      border: 1px solid #e7eaec;
      .title {
        min-height: 48px;
        line-height: 48px;
        padding-left: 20px;
        font-size: 14px;
        border-bottom: 1px solid #e7eaec;
        font-weight: 600;
      }
      .card_body {
        min-height: 48px;
        line-height: 48px;
        padding-left: 20px;
      }
      .card_footer {
        min-height: 55px;
        line-height: 55px;
        padding-left: 20px;
      }
    }
  }
  .table {
    .header {
      margin: 10px 0;
    }
  }
}
</style>
