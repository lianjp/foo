<template>
  <div class="AfterSaleOrder">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <tf-loading class="w-full body" :loading="[searchActionCount]">
      <div class="menu_section">
        <el-tabs ref="tabs" v-model="nativeStatus">
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
                <el-badge
                  :value="summaryData[item.key]"
                  :max="99"
                  :type="item.type"
                  class="badge_item"
                />
              </ColoredSpan>
            </span>
            <!-- 待发货才有订单状态2 -->
            <!-- <div v-if="nativeStatus == 1">
              <span style="font-size: 13px;">
                订单状态：
              </span>
              <el-select
                v-model="nativeStatus2"
                size="small"
                placeholder="请选择">
                <el-option
                  v-for="item2 in status2Options"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value" />
              </el-select>
            </div> -->
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="search_section">
        <el-button-group class="button_group__left">
          <el-button
            size="small"
            type=""
            icon="el-icon-refresh"
            @click="refresh"
          />
        </el-button-group>

        <el-input
          v-model="nativeKeyword"
          placeholder="请输入"
          class="input-with-select"
          autocomplete="off"
          autocorrect="off"
          clearable
          autocapitalize="off"
          spellcheck="false"
          size="small"
          @change="keywordChangehandler"
        >
          <el-select
            slot="prepend"
            v-model="nativeSelectType"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in selectTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-button slot="append" icon="el-icon-search" /> -->
        </el-input>
        <div class="input-with-payway">
          <span class="title">支付方式</span>
          <el-select
            v-model="nativePayType"
            size="small"
            style="width: 120px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in payTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="data_picker">
          <!-- <el-select
            v-model="select3"
            size="small"
            style="width: 120px;"
            placeholder="请选择">
            <el-option label="不按时间" value="1" />
            <el-option label="下单时间" value="2" />
            <el-option label="付款时间" value="3" />
            <el-option label="发货时间" value="4" />
            <el-option label="完成时间" value="5" />
          </el-select> -->
          <span class="title">下单时间</span>
          <div class="data_picker__picker">
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
        <el-button-group>
          <el-button size="small" type="primary" icon="el-icon-download">
            导出
          </el-button>
        </el-button-group>
      </div>

      <div v-if="nativeStatus == 6" class="search_section">
        <div class="data_picker">
          <span class="title">处理状态</span>
          <el-select
            v-model="nativeServiceType"
            size="small"
            style="width: 120px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in serviceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div v-if="nativeStatus == 7" class="search_section">
        <div class="data_picker">
          <span class="title">维权状态</span>
          <el-select
            v-model="nativeProtectionType"
            size="small"
            style="width: 120px;"
            placeholder="请选择"
          >
            <el-option
              v-for="item in protectionTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="table">
        <el-table
          ref="multipleTable"
          size="small"
          :data="list"
          border
          class="table_section"
          tooltip-effect="dark"
          row-key="id"
        >
          <el-table-column :resizable="false" label="订单" min-width="300">
            <template slot-scope="scope">
              <div class="ordersn">
                {{ scope.row.ordersn }}
              </div>
              <!-- <div
                v-for="goodInfo in scope.row.ordergoods"
                :key="goodInfo.id">
                <OrderGoodCard
                  :good-picture="goodInfo.thumb[0].url"
                  :total="goodInfo.total"
                  :goods-name="goodInfo.goodsname"
                  :price="goodInfo.gxgoodsprice" />
              </div> -->
              <el-table
                class="goodInfo_table"
                size="small"
                :data="scope.row.ordergoods"
                border
                tooltip-effect="dark"
                row-key="id"
              >
                <el-table-column :resizable="false" width="70" label="图片">
                  <template slot-scope="goodInfo">
                    <div class="thumb">
                      <img
                        class="table_img"
                        :src="goodInfo.row.thumb[0].url"
                        :alt="goodInfo.row.goodsname"
                      >
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  label="名称"
                  show-overflow-tooltip
                  min-width="130"
                  prop="goodsname"
                >
                  <template slot-scope="goodInfo">
                    {{ goodInfo.row.goodsname || '未设置' }}
                  </template>
                </el-table-column>

                <el-table-column
                  :resizable="false"
                  min-width="100"
                  label="单价 / 数量"
                >
                  <template slot-scope="goodInfo">
                    <div class="total">
                      单价：{{ goodInfo.row.total }}
                    </div>
                    <div class="total">
                      数量： {{ goodInfo.row.total }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            :resizable="false"
            label="买家"
            width="110"
          >
            <template slot-scope="scope">
              <div class="storename">
                {{ scope.row.realname }}
              </div>
              <div class="mobile">
                {{ scope.row.usermobile }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="storename"
            :resizable="false"
            label="分销商"
            width="130"
          >
            <template slot-scope="scope">
              <div class="storename">
                {{ scope.row.storename }}
              </div>
              <div class="mobile">
                {{ scope.row.mobile }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="paytype"
            :resizable="false"
            label="支付 / 配送"
            width="130"
          >
            <template slot-scope="scope">
              <div class="paytype">
                支付: {{ scope.row.paytype | paytypeToLabel }}
              </div>
              <div class="expresscom">
                配送: {{ scope.row.expresscom || '未设置' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="价格" width="130">
            <template slot-scope="scope">
              <div class="gxprice">
                {{ scope.row.gxprice || '无价格' }}
              </div>
              <div class="dispatchprice">
                {{ `运费： ${scope.row.dispatchprice || '无运费'}` }}
              </div>
            </template>
          </el-table-column>

          <el-table-column :resizable="false" label="下单时间" width="150">
            <template slot-scope="scope">
              <div class="gxprice">
                {{ tt(scope.row.createtime) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            :resizable="false"
            align="center"
            width="130"
          >
            <template v-if="nativeStatus == 6" slot-scope="scope">
              {{ scope.row.status | orderTypeToLabel }}
              <!-- {{ scop.row.servicetype | afterSaleOrderTypeToLabel }} -->
            </template>
            <template v-else slot-scope="scope">
              {{ scope.row.status | orderTypeToLabel }}
              <!-- {{ scop.row.protectiontype | afterSaleOrderTypeToLabel }} -->
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            label="操作"
            align="center"
            width="130"
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.status }} -->
              <SureDeliver
                v-if="scope.row.status == '1'"
                :dispatch-id="scope.row.orderid"
                @success="refresh"
              >
                <el-button size="mini" type="primary">
                  确认发货
                </el-button>
              </SureDeliver>
              <el-button
                style="margin-left: 10px;"
                size="mini"
                type="primary"
                @click="
                  $router.push({
                    name: 'AfterOrderDetails',
                    params: {
                      id: scope.row.refundid
                    },
                    query: {
                      redirect_url: $route.fullPath
                    }
                  })
                "
              >
                查看详情
              </el-button>
              <ExpressInfo :dispatch-id="scope.row.orderid">
                <el-button
                  v-if="scope.row.status == '2' || scope.row.status == '3'"
                  size="small"
                  type="text"
                >
                  物流详情
                </el-button>
              </ExpressInfo>
            </template>

            <!-- <template slot-scope="scope">
               {{ scope.row.status }}
              <SureDeliver
                v-if="scope.row.status == '1'"
                :dispatch-id="scope.row.orderid"
                @success="refresh"
              >
                <el-button
                  size="mini"
                  type="primary"
                >
                  确认发货
                </el-button>
              </SureDeliver>
            </template> -->
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
    <!-- {{ list }} -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import pickerOptions from '../timePickerOption.js'
// const omit = require('lodash/omit')
// const isEqual = require('lodash/isEqual')
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
    },
    selectType: {
      type: String,
      default: ''
    },
    payType: {
      type: String,
      default: ''
    },
    serviceType: {
      type: String,
      default: ''
    },
    protectionType: {
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
      // 时间戳， 起始结束
      timestamp: '',
      pageSize: 10,
      // 配置项
      statusOptions: [
        {
          label: '售后申请',
          value: '6',
          type: 'primary',
          key: 'saleApplication'
        },
        {
          label: '维权订单',
          value: '7',
          type: 'danger',
          key: 'maintain'
        }
      ],
      selectTypeOptions: [
        {
          label: '订单号',
          value: '1'
        },
        {
          label: '会员等级',
          value: '2'
        },
        {
          label: '收件人名',
          value: '3'
        },
        {
          label: '地址信息',
          value: '4'
        },
        {
          label: '快递单号',
          value: '5'
        },
        {
          label: '商品名称',
          value: '6'
        },
        {
          label: '商品编码',
          value: '7'
        },
        {
          label: '分销商账号',
          value: '8'
        }
      ],
      payTypeOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '微信支付',
          value: '21'
        },
        {
          label: '支付宝支付',
          value: '22'
        }
      ],
      serviceTypeOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未处理',
          value: '1'
        },
        {
          label: '已处理',
          value: '2'
        }
      ],
      protectionTypeOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '维权中',
          value: '1'
        },
        {
          label: '维权完结',
          value: '2'
        }
      ],
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('userModule', ['userName']),
    ...mapState('afterSaleOrder', {
      afterSaleOrderList: 'afterSaleOrderList',
      afterSaleOrderTotal: 'afterSaleOrderTotal',
      protectionOrderList: 'protectionOrderList',
      protectionOrderTotal: 'protectionOrderTotal',
      summaryData: 'summaryData'
    }),
    ...mapState('loading', {
      searchActionCount: 'afterSaleOrder/toDistributeContent'
    }),
    list() {
      const listMap = {
        6: 'afterSaleOrderList',
        7: 'ProtectionOrderList'
      }
      return this[listMap[this.status]]
    },
    total() {
      const totalMap = {
        6: 'afterSaleOrderTotal',
        7: 'ProtectionOrderTotal'
      }
      return this[totalMap[this.status]]
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
        return this.status || '6'
      },
      set(num) {
        if (this.status !== num) {
          this.$routerQpush({ status: num })
        }
      }
    },
    nativeSelectType: {
      get() {
        return this.selectType || '1'
      },
      set(num) {
        if (this.selectType !== num) {
          this.$routerQpush({ selectType: num })
        }
      }
    },
    nativePayType: {
      get() {
        return this.payType || ''
      },
      set(num) {
        if (this.payType !== num) {
          this.$routerQpush({ payType: num })
        }
      }
    },
    nativeServiceType: {
      get() {
        return this.serviceType || ''
      },
      set(num) {
        if (this.serviceType !== num) {
          this.$routerQpush({ serviceType: num })
        }
      }
    },
    nativeProtectionType: {
      get() {
        return this.protectionType || ''
      },
      set(num) {
        if (this.protectionType !== num) {
          this.$routerQpush({ protectionType: num })
        }
      }
    },

    // 查询参数
    queryOption() {
      return {
        status: this.nativeStatus,
        selectType: this.selectType,
        payType: this.payType,
        currentPage: this.nativeCurrentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        timestamp: this.timestamp,
        serviceType: this.serviceType,
        protectionType: this.protectionType
      }
    }
  },

  watch: {
    queryOption: {
      handler(queryOption, oldQueryOption) {
        this.toDistributeContent(queryOption)
      },
      immediate: true
    },
    summaryData() {
      this.$refs.tabs.$refs.nav.$forceUpdate()
    }
  },
  methods: {
    ...mapActions('afterSaleOrder', {
      toDistributeContent: 'toDistributeContent'
    }),
    refresh() {
      this.toDistributeContent(this.queryOption)
    },
    keywordChangehandler(keyword) {
      this.$routerQpush({ keyword })
    }
  }
}
</script>
<style lang="less" scoped>
@OrderImgSize: 50px;

.goodInfo_table {
  .table_img {
    display: block;
    width: @OrderImgSize;
    height: @OrderImgSize;
  }
}
.AfterSaleOrder {
  .w-full {
    .wf();
  }
  .menu_section {
    margin-top: 10px;
    .badge_item {
      width: 35px;
    }
  }

  .table {
    margin-top: 10px;
  }

  .button_group {
    display: flex;
    justify-content: space-between;
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
      width: 200px;
    }
    // .input-with-payway {
    // }
    .data_picker {
      display: flex;
      align-items: center;
      /deep/ .el-select .el-input__inner {
        border-radius: 4px 0 0 4px;
      }
      /deep/ .data_picker__picker .el-input__inner {
        border-radius: 0px 4px 4px 0px;
      }
      .data_picker__picker {
        width: 350px;
      }
    }
  }
  .table_section {
    margin-top: 16px;
    margin-bottom: 16px;
    min-height: 500px;
  }

  /deep/ .input-with-select .el-select .el-input {
    width: 100px;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  /deep/ .search_section .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
