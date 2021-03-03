<template>
  <div class="StanderdTable">
    <div class="main_table">
      <div class="table_header">
        <EditStander
          v-model="ruleForm.specs">
          <el-button
            size="small">
            新建或编辑规格
          </el-button>
        </EditStander>

        <!-- <el-button
          class="header_button"
          size="small"
          @click="onClickSubmit">
          保存
        </el-button> -->

        <el-button
          class="header_button"
          size="small"
          @click="resetFields">
          重置表格数据
        </el-button>
      </div>
      <template v-if="ruleForm.specs.length === 0">
        <div class="has_no_specs">
          没有建立规格，需要点击上方的新建或编辑规格
        </div>
      </template>
      <template v-else>
        <el-form
          ref="ruleForm"
          status-icon
          :model="ruleForm"
          size="small"
          :disabled="disabled"
          @submit.native.prevent>
          <el-table
            ref="multipleTable"
            :data="ruleForm.list"
            border
            class="table_section"
            tooltip-effect="dark"
            row-key="id">
            <!-- 可以随便选择一个迭代，每个里面都有相同的 index 和 title -->
            <el-table-column
              v-for="(item ,index) in ruleForm.list[0].preProps"
              :key="index"
              :label="ruleForm.list[0].prePropsTitle[index]">
              <template v-slot:default="scope">
                <div class="storename">
                  {{ scope.row.preProps[index] }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="库存"
              fixed="right"
              align="center"
              width="120">
              <template v-slot:default="{row, column, $index}">
                <el-form-item
                  :key="$index"
                  :prop="`list.${$index}.stock`"
                  :rules="totalRule">
                  <el-input
                    v-model="row.stock"
                    size="small"
                    placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column
              label="供货价"
              fixed="right"
              align="center"
              width="120">
              <template v-slot:default="{row, column, $index}">
                <el-form-item
                  :key="$index"
                  :prop="`list.${$index}.costprice`"
                  :rules="moneyRule">
                  <el-input
                    v-model="row.costprice"
                    size="small"
                    placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column
              label="建议零售价"
              fixed="right"
              align="center"
              width="250">
              <template v-slot:default="{row, column, $index}">
                <div class="suggested-retail">
                  <el-form-item
                    :key="$index + 'minretailprice'"
                    class="suggested-retail-minretailprice"
                    :prop="`list.${$index}.minretailprice`"
                    :rules="moneyRule">
                    <el-input
                      v-model="row.minretailprice"
                      size="small"
                      placeholder="最小值" />
                  </el-form-item>
                  <span
                    class="suggested-retail-span">
                    -
                  </span>
                  <el-form-item
                    :key="$index + 'maxretailprice'"
                    class="suggested-retail-maxretailprice"
                    :prop="`list.${$index}.maxretailprice`"
                    :rules="moneyRule">
                    <el-input
                      v-model="row.maxretailprice"
                      size="small"
                      placeholder="最大值" />
                  </el-form-item>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="编码"
              fixed="right"
              align="center"
              width="120">
              <template v-slot:default="{row, column, $index}">
                <el-form-item
                  :key="$index"
                  :prop="`list.${$index}.goodssn`"
                  :rules="contentRules">
                  <el-input
                    v-model="row.goodssn"
                    size="small"
                    placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="条码"
              fixed="right"
              align="center"
              width="120">
              <template v-slot:default="{row, column, $index}">
                <el-form-item
                  :key="$index"
                  :prop="`list.${$index}.productsn`"
                  :rules="contentRules">
                  <el-input
                    v-model="row.productsn"
                    size="small"
                    placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column
              label="重量 (克)"
              fixed="right"
              align="center"
              width="120">
              <template v-slot:default="{row, column, $index}">
                <el-form-item
                  :key="$index"
                  :prop="`list.${$index}.weight`"
                  :rules="weightRule">
                  <el-input
                    v-model="row.weight"
                    size="small"
                    placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </template>
    </div>
  </div>
</template>
<script>
import fullPermutation from '@/utils/fullPermutation.js'
import EditStander from './EditStander'
import {
  validateMoney,
  validateWeight,
  validateNumber
} from '@/components/simple-components/validateRegRues.js'
const cloneDeep = require('lodash/cloneDeep')
const keys = require('lodash/keys')
const merge = require('lodash/merge')
const pick = require('lodash/pick')

const init = initData => {
  const ruleForm = {
    specs: [],
    list: []
  }
  if (initData.specs && initData.list) {
    ruleForm.specs = initData.specs || []
    ruleForm.list = initData.list || []

    const fullPermutationArr = fullPermutation(
      ruleForm.specs.map(v => v.content)
    )
    const ruleFormListMap = {}
    ruleForm.list.forEach(v => {
      ruleFormListMap[v.preProps.join(',')] = v
    })

    ruleForm.list = fullPermutationArr.map((v, i) => {
      // 全排列的 title 数组
      const beforeItem = ruleFormListMap[v.join(',')] || {}
      return {
        prePropsTitle: ruleForm.specs.map(v => v.title),
        preProps: v,
        // 库存
        stock: beforeItem.stock,
        // 供货价格
        costprice: beforeItem.costprice,
        // 最小建议价格
        minretailprice: beforeItem.minretailprice,
        // 最大零售价格
        maxretailprice: beforeItem.maxretailprice,
        // 编码
        goodssn: beforeItem.goodssn,
        // 条码
        productsn: beforeItem.productsn,
        // 重量
        weight: beforeItem.weight
      }
    })
  }
  return ruleForm
}

export default {
  components: {
    EditStander
  },
  props: {
    initData: {
      default: () => ({}),
      type: Object
    },
    disabled: {
      default: true,
      type: Boolean
    }
  },
  data() {
    const moneyRule = [
      {
        validator: validateMoney,
        message: '金钱格式错误',
        trigger: ['blur']
      }
    ]
    const weightRule = [{ validator: validateWeight, trigger: ['blur'] }]
    const totalRule = [
      {
        validator: validateNumber,
        message: '库存个数格式错误',
        trigger: ['blur']
      }
    ]

    const ruleForm = init(this.initData)

    return {
      ruleForm,
      moneyRule,
      weightRule,
      totalRule
    }
  },
  computed: {
    contentRules() {
      return [
        {
          required: true,
          message: '值不能为空',
          trigger: ['blur', 'change']
        }
      ]
    }
  },
  watch: {
    initData(newVal) {
      this.resetFields()
    },
    // 根据 Stander 数据生成 list 表格
    'ruleForm.specs': {
      handler(newVal) {
        /**
         *
          newVal = [
            {title: '颜色', content:['白色','黑色']},
            {title: '尺寸', content:['22','33']},
            {title: '性别', content:['男','女']}
          ]
        */
        // const result = []
        // const contentArray = newVal.map(v => v.content)
        // for (const v of contentArray) {
        // }
        const fullPermutationArr = fullPermutation(newVal.map(v => v.content))
        this.ruleForm.list = fullPermutationArr.map(v => {
          return {
            prePropsTitle: newVal.map(v => v.title),
            preProps: v,
            // 库存
            stock: '',
            // 供货价格
            costprice: '',
            // 最小建议价格
            minretailprice: '',
            // 最大零售价格
            maxretailprice: '',
            // 编码
            goodssn: '',
            // 条码
            productsn: '',
            // 重量
            weight: ''
          }
        })
      }
    }
  },
  methods: {
    async onClickSubmit() {
      const pass =
        this.$refs.ruleForm && (await this.validate.then(_ => true, _ => false))
      if (pass) {
        this.$emit('input', cloneDeep(this.ruleForm))
      }
    },
    resetFields() {
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
    },
    getFormData() {
      return cloneDeep(this.ruleForm)
    },
    setFormData(formData) {
      formData = cloneDeep(formData)
      this.ruleForm = merge(this.ruleForm, pick(formData, keys(this.ruleForm)))
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (this.$refs.ruleForm) {
          if (this.ruleForm.list.length === 0) {
            reject(new Error('没有填写规格'))
          } else {
            this.$refs.ruleForm.validate().then(resolve, reject)
          }
        } else {
          this.$message({
            type: 'error',
            message: '必须建立至少一个详细规格',
            duration: 1500
          })
          reject(new Error('没有填写规格'))
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.StanderdTable {
  .main_table {
    .table_header {
      margin-bottom: 10px;
      .header_button {
        margin-left: 20px;
      }
    }
  }
  .suggested-retail {
    display: flex;
    .suggested-retail-minretailprice {
      width: 40%;
      flex: 1 1 auto;
    }
    .suggested-retail-maxretailprice {
      width: 40%;
      flex: 1 1 auto;
    }
    .suggested-retail-span {
      width: 10%;
      flex: 1 1 auto;
    }
  }
  .has_no_specs {
    color: #f56c6c;
    padding: 10px 0;
  }
}
</style>
