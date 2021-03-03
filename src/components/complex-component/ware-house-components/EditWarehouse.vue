<template>
  <div class="EditWarehouse">
    <el-dialog
      title="编辑发货仓库"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="1200px"
      top="10vh"
      :modal="true"
      custom-class="EditWarehouseDialog"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <el-form
          ref="ruleForm"
          size="small"
          :model="ruleForm"
          :disabled="editWarehouseActionCount>0 || getDetailByIdActionCount>0"
          :rules="rules"
          class="EditWarehouseForm"
          status-icon
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item
            label="仓库名称"
            prop="name"
            title="仓库名称"
          >
            <el-input
              v-model.trim="ruleForm.name"
              size="small"
              :clearable="clearable"
              type="text"
              placeholder="仓库名称"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item
            label="联系电话"
            prop="tel"
            title="请填写 联系电话"
          >
            <el-input
              v-model.trim="ruleForm.tel"
              size="small"
              :clearable="clearable"
              type="text"
              placeholder="请填写 联系电话"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="地址选择"
            required
            title="地址选择"
          >
            <AreaInput
              ref="areaSection"
              v-model="ruleForm.zipcode"
              :disabled="editWarehouseActionCount>0 || getDetailByIdActionCount>0"
            />
          </el-form-item>
          <el-form-item
            label="详细地址"
            prop="address"
          >
            <el-input
              v-model="ruleForm.address"
              :rows="4"
              resize="none"
              type="textarea"
            />
          </el-form-item>
          <el-form-item
            label="是否默认"
            required
            title="是否默认"
          >
            <el-radio-group
              v-model="ruleForm.isdefault"
              size="small"
            >
              <el-radio
                label="1"
              >
                是
              </el-radio>
              <el-radio
                label="0"
              >
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog_footer">
        <el-button
          :loading="editWarehouseActionCount>0"
          size="small"
          @click="onClickSubmit"
        >
          提交
        </el-button>
        <el-button
          size="small"
          :disabled="editWarehouseActionCount>0"
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
      formName: ['ruleForm', 'areaSection'],
      ruleForm: {
        // 仓库名称
        name: '',
        tel: '',
        // 设为默认
        isdefault: '0',
        // 配送设置项
        zipcode: {
          province: '',
          city: '',
          county: ''
        },
        address: '',
        // 禁用启用
        enabled: '1'
      },
      rules: {
        tel: [
          {
            required: true,
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
        name: [
          {
            required: true,
            type: 'string',
            message: '必须填写 仓库名称',
            trigger: ['blur']
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['change']
          }
        ],
        enabled: [
          {
            required: true,
            type: 'string',
            message: '必须选择状态',
            trigger: ['change']
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('loading', {
      editWarehouseActionCount: 'warehouseModule/editWarehouse',
      getDetailByIdActionCount: 'warehouseModule/getDetailById'
    })
  },
  methods: {
    ...mapActions('warehouseModule', {
      editWarehouseAction: 'editWarehouse',
      getDetailByIdAction: 'getDetailById'
    }),

    async setBaseData() {
      const { code, data } = await this.getDetailByIdAction({
        id: this.dispatchId
      })
      if (this.isSuccessful(code)) {
        mapValues(data, (value, key) => {
          this.ruleForm[key] = value
        })
      }
    },
    clickhandler() {
      this.dialogVisible = true
      this.setBaseData()
      console.log('clickhandler')
    },
    beforeClose(done) {
      if (
        this.editWarehouseActionCount > 0 ||
        this.getDetailByIdActionCount > 0
      ) {
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
        this.submitForm()
      }
    },
    async submitForm() {
      const { code, message } = await this.editWarehouseAction({
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
    }
  }
}
</script>
<style lang="less" scoped>
.EditWarehouse {
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

.EditWarehouseDialog {
  .EditWarehouseForm,
  .EditWarehouseForm2 {
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
