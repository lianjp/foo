<template>
  <div
    class="AuditPromotion"
  >
    <el-dialog
      title="专属商品推广申请审核"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="500px"
      top="10vh"
      :modal="true"
      custom-class="AuditPromotionDialog"
      :append-to-body="true"
    >
      <tf-loading :loading="[getDetailByIdActionCount]">
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
            label="商品编码："
            title="商品编码"
          >
            {{ ruleForm.goodsname }}
          </el-form-item>
          <el-form-item
            label="品牌："
            title="品牌"
          >
            {{ ruleForm.brand }}
          </el-form-item>
          <el-form-item
            label="分销商："
            title="分销商"
          >
            {{ ruleForm.storename }}
          </el-form-item>
          <el-form-item
            label="审核状态："
            title="审核状态"
          >
            {{ ruleForm.status | applyStatusToLabel }}
          </el-form-item>

          <el-form-item
            label="申请时间："
            title="申请时间"
          >
            {{ tt(ruleForm.jointime) }}
          </el-form-item>
          <el-form-item
            label="操作："
            title="操作"
          >
            <el-radio-group
              v-model="ruleForm.newStatus"
              size="small"
            >
              <el-radio
                label="1"
              >
                审核通过
              </el-radio>
              <el-radio
                label="2"
              >
                审核拒绝
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
        brand: '',
        ccate: '',
        goodsname: '',
        id: '',
        jointime: '',
        mobile: '',
        pcate: '',
        status: '',
        storename: '',
        tcate: '',
        newStatus: '1'
      }
    }
  },
  computed: {
    ...mapState('loading', {
      getDetailByIdActionCount: 'distributorModule/getPromotesDetailsById',
      submitActionCount: 'distributorModule/checkPromote'
    })
  },
  methods: {
    ...mapActions('distributorModule', {
      getDetailByIdAction: 'getPromotesDetailsById',
      submitAction: 'checkPromote'
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
        if (status !== '0') {
          this.ruleForm.newStatus = status
        }
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
.AuditPromotion {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>
<style lang="less">
@dialogGap: 190px;

.AuditPromotionDialog {
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
