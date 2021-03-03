<template>
  <div
    class="EditDistributor"
  >
    <el-dialog
      title="分销商详情"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="500px"
      top="10vh"
      :modal="true"
      custom-class="EditDistributorDialog"
      :append-to-body="true"
    >
      <tf-loading class="dialog_bod" :loading="[getDetailByIdActionCount]">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :disabled="submitActionCount>0 || getDetailByIdActionCount>0"
          class="EditDispatchForm"
          status-icon
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item
            label="分销商名称："
            title="分销商名称"
          >
            {{ ruleForm.storename }}
          </el-form-item>
          <el-form-item
            label="分销商账号："
            title="分销商账号(手机号)"
          >
            {{ ruleForm.mobile }}
          </el-form-item>
          <el-form-item
            label="分销订单数量："
            title="分销订单数量"
          >
            {{ ruleForm.ordertotal }}
          </el-form-item>
          <el-form-item
            label="分销订单金额："
            title="分销订单金额"
          >
            {{ ruleForm.orderprice }}
          </el-form-item>
          <el-form-item
            label="分销商当前状态："
            title="分销商当前状态"
          >
            {{ ruleForm.status | distributorStatusToLabel }}
          </el-form-item>
          <el-form-item
            label="加入时间："
            title="成为我的分销商时间"
          >
            {{ tt(ruleForm.jointime) }}
          </el-form-item>
          <el-form-item
            label="设置状态："
            title="设置状态"
          >
            <el-radio-group
              v-model="ruleForm.newStatus"
              size="small"
            >
              <el-radio
                label="1"
              >
                正常
              </el-radio>
              <el-radio
                label="0"
              >
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </tf-loading>

      <div
        slot="footer"
        class="dialog_footer"
      >
        <el-button
          :disabled="getDetailByIdActionCount > 0"
          :loading="submitActionCount>0"
          size="small"
          @click="onClickSubmit"
        >
          提交
        </el-button>
        <el-button
          size="small"
          :disabled="getDetailByIdActionCount > 0 || submitActionCount>0"
          @click="resetForm"
        >
          重置
        </el-button>
      </div>
    </el-dialog>
    <div class="main_slot" @click="clickhandler">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const mapValues = require('lodash/mapValues')
const get = require('lodash/get')

export default {
  props: {
    dispatchId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: '',
        jointime: '',
        mobile: '',
        orderprice: '',
        ordertotal: '',
        status: '',
        storename: '',
        newStatus: ''
      }
    }
  },
  computed: {
    ...mapState('loading', {
      getDetailByIdActionCount: 'distributorModule/getTraderDetailsById',
      submitActionCount: 'distributorModule/updateTrader'
    })
  },
  methods: {
    ...mapActions('distributorModule', {
      getDetailByIdAction: 'getTraderDetailsById',
      submitAction: 'updateTrader'
    }),
    async setBaseData() {
      const { code, data } = await this.getDetailByIdAction({
        id: this.dispatchId
      })
      if (this.isSuccessful(code)) {
        mapValues(data, (value, key) => {
          this.ruleForm[key] = value
        })
        const status = get(data, 'status', '0')
        this.ruleForm.newStatus = status
      }
    },

    clickhandler() {
      this.dialogVisible = true
      this.setBaseData()
    },
    onClickSubmit() {
      this.submitForm()
    },
    async submitForm() {
      const { code, message } = await this.submitAction({
        id: this.dispatchId,
        ...this.ruleForm
      })
      console.log('submitForm', code, message)
      if (this.isSuccessful(code)) {
        this.dialogVisible = false
        // this.resetForm()
        this.$emit('success')
      }
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        message
      })
    },
    resetForm() {
      this.setBaseData()
    },
    beforeClose(done) {
      if (this.getDetailByIdActionCount > 0 || this.submitActionCount > 0) {
        return
      }
      this.$confirm('此操作可能不会保存表单数据, 是否继续?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="less" scoped>
.EditDistributor {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>
<style lang="less">
@dialogGap: 190px;

.EditDistributorDialog {
  .dialog_body {
    // height: 70vh;
    max-height: calc(80vh - @dialogGap);
    overflow-y: auto;
    .title {
      text-indent: 2em;
      font-size: 16px;
      line-height: 2;
      border-bottom: 1px solid #dddddd;
    }
  }
  .dialog_footer {
    text-align: center;
  }
}
</style>
