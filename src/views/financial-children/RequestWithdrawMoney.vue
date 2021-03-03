<template>
  <div class="RequestWithdrawMoney">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <tf-loading
      class="w-full body"
      :loading="[overViewDataActionLoading]"
    >
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
              可提现金额
            </h5>
            <div class="card_body">
              {{ overViewData.withdrawable }}
            </div>
            <div class="card_footer">
              <ImmediatelyWithdraw @success="immediatelySuccessHandler">
                <template v-slot:default="{ loading }">
                  <el-button
                    :loading="loading"
                    size="small"
                    type="primary"
                  >
                    立即提现
                  </el-button>
                </template>
              </ImmediatelyWithdraw>
            </div>
          </div>
        </GridTableItem>

        <GridTableItem>
          <div class="card">
            <h5 class="title">
              待审核金额
            </h5>
            <div class="card_body">
              {{ overViewData.auditing }}
            </div>
            <div class="card_footer" />
          </div>
        </GridTableItem>
        <GridTableItem>
          <div class="card">
            <h5 class="title">
              待结算金额
            </h5>
            <div class="card_body">
              {{ overViewData.settlement }}
            </div>
            <div class="card_footer" />
          </div>
        </GridTableItem>
        <GridTableItem>
          <div class="card">
            <h5 class="title">
              已结算金额
            </h5>
            <div class="card_body">
              {{ overViewData.settled }}
            </div>
            <div class="card_footer" />
          </div>
        </GridTableItem>
        <GridTableItem>
          <div class="card">
            <h5 class="title">
              订单金额
            </h5>
            <div class="card_body">
              {{ overViewData.orderAmount.orderTotalPrice }}
            </div>
            <div class="card_footer">
              订单个数：{{ overViewData.orderAmount.orderTotal }}
            </div>
          </div>
        </GridTableItem>
      </GridTable>

      <div class="search_group">
        <div class="input_with_way">
          <span class="title">提现方式</span>
          <el-select
            v-model="drawWay"
            class="select_section"
            size="small"
            placeholder="请选择"
          >
            <el-option label="提现到微信钱包" value="1" />
            <!-- <el-option label="提现到支付宝" value="2" /> -->
          </el-select>
        </div>
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

      <div class="table">
        <el-table
          ref="multipleTable"
          :data="overViewData.orderList"
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
    </tf-loading>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ImmediatelyWithdraw from './request-withdraw-money-components/ImmediatelyWithdraw'
export default {
  components: {
    ImmediatelyWithdraw
  },
  data() {
    return {
      drawWay: '1'
    }
  },
  computed: {
    ...mapState('userModule', ['userName']),
    ...mapState('financialModule', ['overViewData']),
    ...mapState('loading', {
      overViewDataActionLoading: 'financialModule/getFinacialOverview'
    })
  },
  created() {
    this.getFinacialOverview()
  },
  methods: {
    ...mapActions('financialModule', ['getFinacialOverview']),
    immediatelySuccessHandler() {
      this.getFinacialOverview()
    }
  }
}
</script>
<style lang="less" scoped>
@marginDistance: 10px;
.w-full {
  .wf();
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
  .search_group {
    display: flex;
    margin-top: @marginDistance;
    justify-content: space-between;
    align-items: center;
    .input_with_way {
      .select_section {
        width: 160px;
      }
      .title {
        padding: 0 10px;
        font-size: 13px;
        color: #585858;
      }
    }
  }
  .table {
    margin-top: @marginDistance;
  }
}
</style>
