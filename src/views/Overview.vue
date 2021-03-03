<template>
  <div class="Overview">
    <HomeHeader
      v-bind="{
        logInState: true,
        userName
      }"
    />
    <tf-loading class="main body" :loading="[getOverviewDataCount]">
      <h4 class="Overview_title">
        店铺描述
      </h4>
      <section class="table table_1">
        <h5 class="table_title">
          商家提醒
        </h5>
        <GridTable
          :table-width="1200"
          :item-width="400"
          :item-x-gap="0"
          :item-y-gap="10"
        >
          <GridTableItem
            v-for="(item, index) in tableOptions"
            :key="index"
            class="tr"
          >
            <div class="td">
              <p title="title" class="title">
                {{ item.title }}
              </p>
              <ol class="children">
                <li
                  v-for="(itemChild, childIndex) in item.children"
                  :key="childIndex"
                  class="child"
                  @click="
                    () => {
                      itemChild.link && $router.push(itemChild.link)
                    }
                  "
                >
                  <span class="child_title">
                    {{ itemChild.title }}
                  </span>
                  <span class="child_count">
                    {{ itemChild.count }}
                  </span>
                </li>
              </ol>
            </div>
          </GridTableItem>
        </GridTable>
      </section>
      <section class="table table_2">
        <h5 class="table_title">
          今日数据
        </h5>
        <GridTable
          :table-width="1200"
          :item-width="400"
          :item-x-gap="0"
          :item-y-gap="10"
        >
          <GridTableItem
            v-for="(item, index) in tableOptions2"
            :key="index"
            class="tr"
          >
            <div class="td">
              <p title="title" class="title">
                {{ item.title }}
              </p>
              <div class="p_today_total total">
                <span class="total_span">{{ item.today }}</span>
              </div>
              <div class="footer">
                <div class="p_yesterday_total total">
                  <span class="label_span">昨日：</span>
                  <span class="total_span">{{ item.yesterday }}</span>
                </div>
                <div class="p_month_total total">
                  <span class="label">本月：</span>
                  <span class="total_span">{{ item.month }}</span>
                </div>
              </div>
            </div>
          </GridTableItem>
        </GridTable>
      </section>

      <section class="table table_3">
        <h5 class="table_title">
          订单概述
        </h5>
        <GridTable
          :table-width="1200"
          :item-width="600"
          :item-x-gap="0"
          :item-y-gap="10"
        >
          <GridTableItem
            v-for="(item, index) in tableOptions3"
            :key="index"
            class="tr"
          >
            <div class="th">
              <div class="header">
                <span title="title">
                  {{ item.title }}
                </span>
              </div>
            </div>

            <div class="td">
              <div>
                <p class="title">
                  成交量
                </p>
                <div class="p_today_total">
                  <span class="total_span">{{ item.volume }}</span>
                </div>
              </div>
              <div>
                <p class="title">
                  成交额
                </p>
                <div class="p_today_total">
                  <span class="total_span">{{ item.turnover }}</span>
                </div>
              </div>
            </div>
          </GridTableItem>
        </GridTable>
      </section>
    </tf-loading>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const mapValues = require('lodash/mapValues')
const get = require('lodash/get')
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('userModule', ['userName']),
    ...mapState('baseData', ['overviewData']),
    ...mapState('loading', {
      getOverviewDataCount: 'baseData/getOverviewData'
    }),
    tableOptions() {
      const tableOptionsArray = [
        {
          title: '订单',
          children: [
            { key: 'orderTotal.needShipped' },
            { key: 'orderTotal.afterSale' },
            { key: 'orderTotal.rightsProtection' },
            { key: 'orderTotal.abnormal' }
          ]
        },
        {
          title: '商品申报',
          children: [
            {
              key: 'goods.auditing',
              link: {
                name: 'Commodity',
                query: {
                  status: '2'
                }
              }
            },
            {
              key: 'goods.rejected',
              link: {
                name: 'Commodity',
                query: {
                  status: '6'
                }
              }
            }
          ]
        },
        {
          title: '品牌申报',
          children: [
            {
              key: 'brand.auditing',
              link: {
                name: 'Trademark',
                query: {
                  status: '0'
                }
              }
            },
            {
              key: 'brand.passing',
              link: {
                name: 'Trademark',
                query: {
                  status: '1'
                }
              }
            },
            {
              key: 'brand.rejected',
              link: {
                name: 'Trademark',
                query: {
                  status: '2'
                }
              }
            }
          ]
        },
        {
          title: '分销商审核',
          children: [
            {
              key: 'merchStore.auditing',
              link: {
                name: 'Distributor',
                query: {
                  status: ''
                }
              }
            }
          ]
        },
        {
          title: '结算',
          children: [
            {
              key: 'applyInfo.pending',
              link: {
                name: 'Financial',
                query: {
                  status: '1'
                }
              }
            },
            {
              key: 'applyInfo.settlement',
              link: {
                name: 'Financial',
                query: {
                  status: '2'
                }
              }
            }
          ]
        }
      ]
      const overviewData = this.overviewData
      return tableOptionsArray.map(option => {
        return {
          title: option.title,
          children: option.children.map(({ key, link }) => {
            const value = get(overviewData, key, 0)
            return {
              title: value.type,
              count: value.count,
              link
            }
          })
        }
      })
    },
    tableOptions2() {
      const merchTotal = this.overviewData.merchTotal
      const tableOptionsArr2 = [
        {
          // key: 'orderTotal',
          title: '订单数',
          today: 'today.orderTotal',
          yesterday: 'yesterday.orderTotal',
          month: 'month.orderTotal'
        },
        {
          title: '下单商品总数',
          // key: 'goodsTotal',
          today: 'today.goodsTotal',
          yesterday: 'yesterday.goodsTotal',
          month: 'month.goodsTotal'
        },
        {
          // key: 'orderPrice',
          title: '下单金额（元）',
          today: 'today.orderPrice',
          yesterday: 'yesterday.orderPrice',
          month: 'month.orderPrice'
        }
      ]
      return tableOptionsArr2.map(option => {
        return mapValues(option, (value, key) => {
          if (key === 'title') {
            return value
          } else {
            return get(merchTotal, value, 0)
          }
        })
      })
    },
    tableOptions3() {
      const orderDeal = this.overviewData.orderDeal
      const tableOptionsArr3 = [
        {
          // key: 'orderTotal',
          title: '今日成交',
          volume: 'today.volume',
          turnover: 'today.turnover'
        },
        {
          title: '昨日成交',
          volume: 'yesterday.volume',
          turnover: 'yesterday.turnover'
        },
        {
          // key: 'orderPrice',
          title: '近7日成交',
          volume: 'seven.volume',
          turnover: 'seven.turnover'
        },
        {
          // key: 'orderPrice',
          title: '近1个月成交',
          volume: 'month.volume',
          turnover: 'month.turnover'
        }
      ]
      return tableOptionsArr3.map(option => {
        return mapValues(option, (value, key) => {
          if (key === 'title') {
            return value
          } else {
            return get(orderDeal, value, 0)
          }
        })
      })
    }
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    ...mapActions('baseData', ['getOverviewData']),
    async initData() {
      const { code, message } = await this.getOverviewData()
      if (this.isError(code)) {
        this.$message({
          type: 'error',
          message
        })
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@paddingGap: 20px;
.Overview {
  .Overview_title {
    text-align: center;
    font-size: 24px;
    padding: 20px 0;
  }
  .table .table_title {
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    padding-left: @paddingGap;
    line-height: 40px;
    background-color: #fbfbfb;
    border-bottom: 1px solid #dddddd;
  }
  .table_1 {
    .wf();
    .td {
      min-height: 160px;
      padding: @paddingGap;
      .title {
        font-size: 18px;
        line-height: 2;
        font-weight: bold;
      }
      .children {
        .cp();
        padding-left: @paddingGap;
      }
    }
  }
  .table_2,
  .table_3 {
    .wf();
    .td {
      padding: @paddingGap;
      .title {
        text-align: center;
      }
      .p_today_total {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-weight: bold;
      }
      .footer {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .table_3 {
    .th {
      padding: @paddingGap;
      .title {
        text-align: center;
      }
      .header {
        display: flex;
        justify-content: space-between;
      }
    }
    .td {
      padding: @paddingGap;
      display: flex;
      justify-content: space-around;
    }
  }
  /deep/ .table_2,
  .table_1 {
    .GridTable .table > .item:nth-child(3n) {
      // background-color: red;
      border: none;
    }
  }
  /deep/ .table_2,
  .table_1 {
    .GridTable .table > .item {
      border-right: 1px solid #dddddd;
    }
  }
  /deep/ .table_3 .GridTable .table > .item:nth-child(2n) {
    // background-color: red;
    border: none;
  }
  /deep/ .table_3 .GridTable .table > .item {
    border-right: 1px solid #dddddd;
  }
}
</style>
