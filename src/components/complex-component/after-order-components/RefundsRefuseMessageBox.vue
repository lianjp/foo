<template>
  <div class="AgreementMessageBox">
    <el-dialog
      title="拒绝申请"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="1200px"
      top="5vh"
      :modal="true"
      custom-class="AgreementMessageBoxDialog"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :disabled="refundsRefuseActionCount > 0"
          :rules="rules"
          class="AgreementMessageBoxForm"
          status-icon
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item title="拒绝原因" label="拒绝原因" prop="excuse">
            <el-select v-model="ruleForm.excuse" placeholder="请选择拒绝原因">
              <el-option
                v-for="(item, key) in options"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item title="拒绝说明" label="拒绝说明" prop="message">
            <el-input
              v-model="ruleForm.message"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入拒绝说明"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog_footer" style="text-align: center;">
        <el-button size="small" @click="onClickSubmit">
          提交
        </el-button>
        <el-button size="small" @click="closeDialog">
          关闭
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

export default {
  props: {
    refundId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: '商品没问题，买家未举证',
          label: '1.商品没问题，买家未举证'
        },
        {
          value: '商品没问题，买家举证无效',
          label: '2.商品没问题，买家举证无效'
        },
        {
          value: '商品已影响二次销售',
          label: '3.商品已影响二次销售'
        },
        {
          value: '要求买家承担发货运费',
          label: '4.要求买家承担发货运费'
        },
        {
          value: '其他',
          label: '5.其他'
        }
      ],
      formName: ['ruleForm'],
      ruleForm: {
        excuse: '',
        message: ''
      },
      rules: {
        excuse: [
          {
            required: true,
            type: 'string',
            message: '必须选择 拒绝原因',
            trigger: ['blur']
          }
        ],
        message: [
          {
            required: true,
            type: 'string',
            message: '必须填写 拒绝说明',
            trigger: ['blur']
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('loading', {
      refundsRefuseActionCount: 'afterSaleOrder/refundsRefuse'
    })
  },
  methods: {
    ...mapActions('afterSaleOrder', {
      refundsRefuseAction: 'refundsRefuse'
    }),
    clickhandler() {
      this.dialogVisible = true
    },
    beforeClose(done) {
      if (this.refundsRefuseActionCount > 0) {
        return
      }
      this.$confirm('此操作可能不会保存表单数据, 是否继续?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    resetForm() {
      const formName = this.formName
      formName.forEach(name => {
        this.$refs[name].resetFields()
      })
    },
    async onClickSubmit() {
      const formName = this.formName
      const validateResult = []
      for (const name of formName) {
        const result = await this.$refs[name]
          .validate()
          .then(_ => true, _ => false)
        validateResult.push(result)
      }
      if (validateResult.every(v => v)) {
        this.refundsRefuse()
      }
    },
    async refundsRefuse() {
      const { code, message } = await this.refundsRefuseAction({
        refundId: this.refundId,
        ...this.ruleForm
      })
      console.log('refundsRefuse', code, message)
      if (this.isSuccessful(code)) {
        this.dialogVisible = false
        this.resetForm()
        this.$emit('success')
      }
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        message
      })
    },
    closeDialog() {
      if (this.getExpressInfoByIdCount > 0) {
        return
      }
      this.dialogVisible = false
    }
    // beforeClose(done) {
    //   if (this.getExpressInfoByIdCount > 0) {
    //     return
    //   }
    //   done()
    // }
  }
}
</script>

<style lang="less" scoped>
// 组件表单
.AgreementMessageBox {
  display: inline-block;
  margin-left: 10px;
  .main_slot {
    display: inline-block;
  }
  .dialog_footer {
    text-align: center;
  }
}
</style>

<style lang="less">
// 弹窗
@dialogGap: 190px;
.ExpressInfoDialog {
  .dialog_body {
    padding: 20px 40px 0px;
    min-height: 100px;
    overflow-y: auto;
    max-height: calc(90vh - @dialogGap);
  }
}
</style>
