<template>
  <div class="AddNewDispatch">
    <el-dialog
      title="添加配送方式"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="1200px"
      top="10vh"
      :modal="true"
      custom-class="AddNewDispatchDialog"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <h5 class="title">
          添加配送方式
        </h5>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :disabled="addActionCount>0"
          :rules="rules"
          class="AddNewDispatchForm"
          status-icon
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item
            label="排序"
            prop="displayorder"
            title="排序"
          >
            <el-input
              v-model.trim="ruleForm.displayorder"
              size="small"
              :clearable="clearable"
              type="text"
              placeholder="排序"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="配送方式名称"
            prop="dispatchname"
            title="配送方式名称"
          >
            <el-input
              v-model.trim="ruleForm.dispatchname"
              size="small"
              :clearable="clearable"
              type="text"
              placeholder="配送方式名称"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autocomplete="off"
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

          <el-form-item
            required
            label="计费方式"
            title="计费方式"
          >
            <el-radio-group
              v-model="ruleForm.calculatetype"
              size="small"
            >
              <el-radio
                label="0"
              >
                按重量计费
              </el-radio>
              <el-radio
                label="1"
              >
                按件计费
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="快递公司"
            size="small"
            prop="express"
            title="快递公司"
          >
            <el-select v-model="ruleForm.express" size="small" placeholder="请选择快递公司">
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
            label="配送区域"
            prop="calculatetype"
            title="配送区域"
          >
            <!-- prop 是当前操作的数据 -->
            <el-form-item>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    运送到
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    {{ calculateTitle[0] }}
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    {{ calculateTitle[1] }}
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    {{ calculateTitle[2] }}
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    {{ calculateTitle[3] }}
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    操作
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="row">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    全国【默认运费】
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item
                      :key="'firstweightOrNum' + ruleForm.calculatetype"
                      :rules="weightOrNumRule"
                      prop="firstweightOrNum"
                    >
                      <el-input v-model="ruleForm.firstweightOrNum" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item
                      :key="'firstweightOrNumprice' + ruleForm.calculatetype"
                      :rules="moneyRule"
                      prop="firstweightOrNumprice"
                    >
                      <el-input v-model="ruleForm.firstweightOrNumprice" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item
                      :key="'secondweightOrNum' + ruleForm.calculatetype"
                      :rules="weightOrNumRule"
                      prop="secondweightOrNum"
                    >
                      <el-input v-model="ruleForm.secondweightOrNum" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-form-item
                      :key="'secondweightOrNumprice' + ruleForm.calculatetype"
                      :rules="moneyRule"
                      prop="secondweightOrNumprice"
                    >
                      <el-input v-model="ruleForm.secondweightOrNumprice" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content bg-purple" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item
              v-for="(area, index) in ruleForm.areas"
              :key="area.key + ruleForm.calculatetype"
              class="row"
            >
              <el-row>
                <el-col :span="6">
                  <div class="grid-content">
                    <!-- 第 {{ index }} 行 -->
                    <AreaSection v-model="area.city" />
                    <!-- 不用 form item 输出，但是要用它的验证功能 -->
                    <el-form-item
                      :rules="areaRule"
                      :prop="'areas.' + index + '.city'"
                    >
                      <el-checkbox-group v-model="area.city" :style="{display: 'none'}" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item
                      :rules="weightOrNumRule"
                      :prop="'areas.' + index + '.firstweightOrNum'"
                    >
                      <el-input v-model="area.firstweightOrNum" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item
                      :rules="moneyRule"
                      :prop="'areas.' + index + '.firstweightOrNumprice'"
                    >
                      <el-input v-model="area.firstweightOrNumprice" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item
                      :rules="weightOrNumRule"
                      :prop="'areas.' + index + '.secondweightOrNum'"
                    >
                      <el-input v-model="area.secondweightOrNum" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content">
                    <el-form-item
                      :rules="moneyRule"
                      :prop="'areas.' + index + '.secondweightOrNumprice'"
                    >
                      <el-input v-model="area.secondweightOrNumprice" size="small" />
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div class="grid-content">
                    <el-button
                      size="small"
                      type="danger"
                      icon="el-icon-delete"
                      @click.prevent="removeArea(area)"
                    />
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            根据重量来计算运费，当物品不足“首重”时候，将按“首重费用”计算，超出部分，按照“续重重量”和“续重费用”乘积计算叠加。
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              @click="addArea"
            >
              新增
            </el-button>
          </el-form-item>
        </el-form>
        <h5 class="title">
          特殊配置
        </h5>
        <el-form
          ref="ruleForm2"
          :model="ruleForm"
          :rules="rules"
          :disabled="addActionCount>0"
          class="AddNewDispatchForm2"
          label-width="180px"
          @submit.native.prevent
        >
          <el-form-item
            label="区域类型"
            required
            title="区域类型"
          >
            <el-radio-group
              v-model="ruleForm.isdispatcharea"
              size="small"
            >
              <el-radio
                label="0"
              >
                不配送区域
              </el-radio>
              <el-radio
                label="1"
              >
                只配送区域
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="选择地区"
            title="选择地区"
          >
            <AreaSection v-model="ruleForm.nodispatchareas" />
            <!-- 不用 form item 输出，但是要用它的验证功能 -->
            <el-form-item
              :rules="[]"
              prop="nodispatchareas"
            >
              <el-checkbox-group v-model="ruleForm.nodispatchareas" :style="{display: 'none'}" />
            </el-form-item>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="enabled"
            title="状态"
          >
            <el-radio-group
              v-model="ruleForm.enabled"
              size="small"
            >
              <el-radio
                label="1"
              >
                启用
              </el-radio>
              <el-radio
                label="0"
              >
                禁用
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog_footer">
        <el-button
          :loading="addActionCount>0"
          size="small"
          @click="onClickSubmit"
        >
          提交
        </el-button>
        <el-button
          size="small"
          :disabled="addActionCount>0"
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
// 金钱正则
// const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
// const reg1 = '/^(0|[1-9]\d{0,3})(\.\d{1,2})?$/';

import {
  validateMoney,
  validateWeight,
  validateNumber
} from '@/components/simple-components/validateRegRues.js'
// const moneyRule = [
//   {
//     type: 'array',
//     min: 1,
//     required: true,
//     message: '地区至少选择 1 个',
//     trigger: ['change']
//   }
// ]

export default {
  data() {
    const areaRule = [
      {
        type: 'array',
        min: 1,
        required: true,
        message: '地区至少选择 1 个',
        trigger: ['change']
      }
    ]
    return {
      dialogVisible: false,
      // disable: false,
      clearable: false,
      formName: ['ruleForm', 'ruleForm2'],
      areaRule,
      moneyRule: [{ validator: validateMoney, trigger: ['blur'] }],
      ruleForm: {
        // 排序
        displayorder: '',
        // 配送方式名称
        dispatchname: '',
        // 设为默认
        isdefault: '0',
        // 计费方式
        calculatetype: '0',
        // 快递公司 的 id
        express: '',
        // 配送设置项
        areas: [],
        // 全国的
        firstweightOrNum: '',
        firstweightOrNumprice: '',
        secondweightOrNum: '',
        secondweightOrNumprice: '',
        // 特殊区域类型
        isdispatcharea: '0',
        // 不配送，或只配送的区域
        nodispatchareas: [],
        // 禁用启用
        enabled: '1'
      },
      rules: {
        displayorder: [
          {
            validator: validateNumber,
            trigger: ['blur'],
            message: '格式不正确'
          }
        ],
        dispatchname: [
          {
            required: true,
            type: 'string',
            message: '必须填写 配送方式名称',
            trigger: ['blur']
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        express: [
          {
            required: true,
            type: 'string',
            message: '必须选择一个快递方式',
            trigger: ['change']
          }
        ],
        nodispatchareas: areaRule,
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
    ...mapState('baseData', {
      expressList: 'expressList'
    }),
    ...mapState('loading', {
      addActionCount: 'expressModule/addDispatch'
    }),

    calculateTitle() {
      const calculatetype = this.ruleForm.calculatetype
      const map = {
        '0': ['首重（克）', '首费（元）', '续重（克）', '续费（元）'],
        '1': ['首件（个）', '首费（元）', '续件（个）', '续费（元）']
      }
      return map[calculatetype] || map[0]
    },
    weightOrNumRule() {
      const calculatetype = this.ruleForm.calculatetype
      const map = {
        '0': [{ validator: validateWeight, trigger: ['blur'] }],
        '1': [{ validator: validateNumber, trigger: ['blur'] }]
      }
      return map[calculatetype] || map[0]
    }
  },
  created() {
    this.getExpressList()
  },
  methods: {
    ...mapActions('baseData', {
      getExpressList: 'getExpressList'
    }),
    ...mapActions('expressModule', {
      addDispatchAction: 'addDispatch'
    }),
    clickhandler() {
      this.dialogVisible = true
      console.log('clickhandler')
    },
    beforeClose(done) {
      if (this.addActionCount > 0) {
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
    removeArea(item) {
      const index = this.ruleForm.areas.indexOf(item)
      if (index !== -1) {
        this.ruleForm.areas.splice(index, 1)
      }
    },
    resetForm() {
      const formName = this.formName
      formName.forEach(name => {
        this.$refs[name].resetFields()
      })
    },
    addArea() {
      this.ruleForm.areas.push({
        firstweightOrNum: '',
        firstweightOrNumprice: '',
        secondweightOrNum: '',
        secondweightOrNumprice: '',
        city: [],
        key: Date.now()
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
        this.addNewDispatch()
      }
    },
    async addNewDispatch() {
      const { code, message } = await this.addDispatchAction(this.ruleForm)
      console.log('addNewDispatch', code, message)
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
.AddNewDispatch {
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

.AddNewDispatchDialog {
  .AddNewDispatchForm,
  .AddNewDispatchForm2 {
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
