<template>
  <div class="SureDeliver">
    <el-dialog
      title="订单发货"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="800px"
      top="10vh"
      :modal="true"
      custom-class="SureDeliverDialog"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <el-form
          ref="ruleForm"
          size="small"
          :model="ruleForm"
          :disabled="submitActionCount>0 || getDetailByIdActionCount>0"
          :rules="rules"
          class="SureDeliverForm"
          status-icon
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item
            label="收货人"
            prop="realname"
            title="不可更改"
          >
            <el-input :value="ruleForm.realname" disabled />
          </el-form-item>

          <el-form-item
            label="收货人地址"
            prop="address"
            title="不可更改"
          >
            <el-input :value="ruleForm.address" disabled />
          </el-form-item>

          <el-form-item
            label="收货人联系电话"
            prop="usermobile"
            title="不可更改"
          >
            <el-input :value="ruleForm.usermobile" disabled />
          </el-form-item>

          <el-form-item
            label="快递公司"
            size="small"
            prop="express"
            title="快递公司"
          >
            <el-select
              v-model="ruleForm.express"
              filterable
              size="small"
              placeholder="请选择快递公司"
            >
              <el-option
                v-for="(item, key) in expressList"
                :key="key"
                size="small"
                :label="`${item.name}--${key}`"
                :value="key"
              />
              <!-- <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" /> -->
            </el-select>
          </el-form-item>

          <el-form-item
            label="快递单号"
            prop="expresssn"
            title="快递单号"
          >
            <el-input
              v-model.trim="ruleForm.expresssn"
              size="small"
              :clearable="clearable"
              type="text"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog_footer">
        <el-button
          :loading="submitActionCount>0"
          size="small"
          type="primary"
          @click="onClickSubmit"
        >
          确认发货
        </el-button>
        <el-button
          v-if="false"
          size="small"
          :loading="getDetailByIdActionCount>0"
          :disabled="submitActionCount>0"
          @click="resetForm"
        >
          重新获取
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
      // disable: false,
      clearable: false,
      formName: ['ruleForm'],
      ruleForm: {
        // 收货人账户名
        username: '',
        // 收货人真实姓名
        realname: '',
        // 收货人电话
        usermobile: '',
        // 收货人地址
        address: '',
        // 订单id
        id: '',
        // 快递公司
        express: '',
        // 快递单号
        expresssn: ''
      },
      rules: {
        username: [
          {
            type: 'string',
            message: '必须填写 收货人账户名',
            trigger: ['blur']
          }
        ],
        realname: [
          {
            type: 'string',
            message: '必须填写 收货人真实姓名',
            trigger: ['blur']
          }
        ],
        usermobile: [
          {
            type: 'string',
            message: '必须填写 电话号码'
          },
          {
            type: 'string',
            pattern: /^1[0-9]{10}$|^[569][0-9]{7}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        address: [
          {
            type: 'string',
            message: '必须填写 收件人地址',
            trigger: ['blur']
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        id: [
          {
            required: true,
            type: 'string',
            message: '必须填写 订单id',
            trigger: ['blur']
          }
        ],
        express: [
          {
            required: true,
            type: 'string',
            message: '必须填写 快递公司',
            trigger: ['blur']
          }
        ],
        expresssn: [
          {
            required: true,
            type: 'string',
            message: '必须填写 快递单号',
            trigger: ['blur']
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('baseData', {
      expressList: 'expressList'
    }),
    ...mapState('loading', {
      submitActionCount: 'orderModule/confirmDelivery',
      getDetailByIdActionCount: 'orderModule/getSureDeliverInfoById'
    })
  },
  created() {
    this.getExpressList()
  },
  methods: {
    ...mapActions('baseData', {
      getExpressList: 'getExpressList'
    }),
    ...mapActions('orderModule', {
      submitAction: 'confirmDelivery',
      getDetailByIdAction: 'getSureDeliverInfoById'
    }),

    async setBaseData() {
      const { code, data } = await this.getDetailByIdAction({
        id: this.dispatchId
      })
      // const formName = this.formName

      // for (const name of formName) {
      //   this.$refs[name].resetFields()
      // }
      if (this.isSuccessful(code)) {
        mapValues(data, (value, key) => {
          this.ruleForm[key] = value
        })
      }
    },
    clickhandler() {
      this.dialogVisible = true
      this.setBaseData()
    },
    beforeClose(done) {
      if (this.submitActionCount > 0 || this.getDetailByIdActionCount > 0) {
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
      this.setBaseData()
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
        this.submit()
      }
    },
    async submit() {
      const { code, message } = await this.submitAction({
        id: this.dispatchId,
        ...this.ruleForm
      })
      console.log('submit', code, message)
      if (this.isSuccessful(code)) {
        this.dialogVisible = false
        this.resetForm()
        this.$emit('success')
      }
      this.$message({
        type: this.isSuccessful(code) ? 'success' : 'error',
        message
      })
    }
  }
}
</script>
<style lang="less" scoped>
.SureDeliver {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
.grid-content {
  padding: 0 5px;
}

.row + .row {
  margin-top: 20px;
}
</style>
<style lang="less">
@dialogGap: 190px;

.SureDeliverDialog {
  .SureDeliverForm,
  .EditBackAdressForm2 {
    // padding-top: 20px;
    .pt(20px);
    margin: auto;
  }
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
