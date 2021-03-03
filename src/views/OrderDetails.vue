<template>
  <div class="OrderDetails">
    <HomeHeader
      v-bind="{
        userName
      }"
    />

    <section class="w-full body">
      <tf-loading :loading="[getOrderDetailsByIdCount]">
        <div class="search_group">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-arrow-left"
              @click="$router.push(redirectUrl)"
            >
              返回
            </el-button>
          </el-button-group>
        </div>
        <div class="main_content">
          <el-steps
            v-if="showStep"
            :active="step"
            align-center
            :finish-status="finishStatus"
          >
            <el-step title="买家下单">
              <template v-slot:description>
                <span v-if="step >= 1">
                  {{ tt(oneDetail.createtime) }}
                </span>
              </template>
            </el-step>
            <el-step title="买家付款">
              <template v-slot:description>
                <span v-if="step >= 2">
                  {{ tt(oneDetail.paytime) }}
                </span>
              </template>
            </el-step>
            <el-step title="商家发货">
              <template v-slot:description>
                <span v-if="step >= 3">
                  {{ tt(oneDetail.sendtime) }}
                </span>
              </template>
            </el-step>
            <el-step title="订单完成">
              <template v-slot:description>
                <span v-if="step >= 4">
                  {{ tt(oneDetail.finishtime) }}
                </span>
              </template>
            </el-step>
          </el-steps>
          <!-- OrderDetails {{ orderId }} {{ oneDetail }} -->

          <el-row>
            <el-col :span="8">
              <OrderDataCard
                v-bind="oneDetail"
                :ordersn="oneDetail.ordersn"
                :price="oneDetail.price"
                :paytype="oneDetail.paytype | paytypeToLabel"
              />
              <OrderStateInfoCard v-bind="oneDetail" />
            </el-col>
            <el-col :span="16">
              <OrderDeliveryCard v-bind="oneDetail" />
            </el-col>
          </el-row>
          <GoodsDataCard
            class="GoodsDataCard"
            :list="oneDetail.orderGoodsList"
          />
        </div>
      </tf-loading>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import OrderStateInfoCard from './order-details-component/OrderStateInfoCard'
import OrderDataCard from './order-details-component/OrderDataCard'
import OrderDeliveryCard from './order-details-component/OrderDeliveryCard'
import GoodsDataCard from './order-details-component/GoodsDataCard'
export default {
  components: {
    OrderDataCard,
    OrderStateInfoCard,
    OrderDeliveryCard,
    GoodsDataCard
  },
  props: {
    orderId: {
      default: '',
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('orderModule', {
      oneDetail: 'currentOrderDetails'
    }),
    ...mapState('loading', {
      getOrderDetailsByIdCount: 'orderModule/getOrderDetailsById'
    }),

    ...mapState('userModule', ['userName']),
    step() {
      const status = this.oneDetail.status
      console.log(status)

      const statusMap = {
        '0': 1,
        '1': 2,
        '2': 3,
        '3': 4,
        '4': 5
      }
      return statusMap[status]
    },
    showStep() {
      const status = this.oneDetail.status
      return status < 4
    },
    finishStatus() {
      const status = this.oneDetail.status
      const statusMap = {
        '0': 'success',
        '1': 'success',
        '2': 'success',
        '3': 'success',
        '4': 'success'
      }
      return statusMap[status]
    },
    redirectUrl() {
      return this.$route.query.redirect_url || '/order'
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    ...mapActions('orderModule', ['getOrderDetailsById']),
    search() {
      this.getOrderDetailsById({
        id: this.orderId
      })
    }
  }
}
</script>
<style lang="less" scoped>
.OrderDetails {
  .w-full {
    .search_group {
      margin-top: 10px;
    }
    .main_content {
      margin-top: 10px;
    }
  }
  .GoodsDataCard {
    margin-top: 20px;
  }
}
</style>
