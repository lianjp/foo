<template>
  <div class="EditStander">
    <el-dialog
      title="配置规格"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="1000px"
      top="15vh"
      :modal="true"
      custom-class="EditStanderForm"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <el-form
          v-if="dialogVisible"
          ref="ruleForm"
          status-icon
          :model="ruleForm"
          size="small"
          @submit.native.prevent
        >
          <tf-drag-table
            v-model="ruleForm.list"
            class="standerd_table"
            :use-drag-handle="true"
            :append-to="'.EditStanderForm .dialog_body'"
          >
            <template v-slot:default="{ item , index}">
              <div class="form_one_stander">
                <!-- 一个规格 -->
                <div class="form_row-1">
                  <el-form-item
                    v-if="item"
                    :key="item.key"
                    style="flex: 1 1 auto;"
                    label-width="100px"
                    label="规格标题"
                    :prop="'list.' + index + '.title'"
                    :rules="titleRules"
                  >
                    <el-input v-model="item.title" size="small" placeholder="请输入标题，不允许有英文逗号" />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="success"
                      icon="el-icon-plus"
                      @click="addNewItem(item, index)"
                    >
                      添加规格项
                    </el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeItem(item, index)"
                    />
                  </el-form-item>
                </div>
                <div class="form_row-2">
                  <el-row
                    v-if="item.content"
                  >
                    <el-col
                      v-for="(contentItem, contentIndex) in item.content"
                      :key="`${item.key}-${contentIndex}`"
                      :span="8"
                      style="display: flex"
                    >
                      <el-form-item
                        :key="`${item.key}-${contentIndex}`"
                        label-width="100px"
                        label="规格值"
                        :prop="`list.${index}.content.${contentIndex}`"
                        :rules="contentRules"
                      >
                        <el-input
                          v-model="item.content[contentIndex]"
                          size="small"
                          placeholder="请输入规格值"
                        />
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          @click="removeChildItem(item, index, contentItem, contentIndex)"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-form-item
                  label-width="100px"
                  :prop="`list.${index}.content`"
                  :rules="[
                    { type: 'array', required: true, message: '请至少有一个规格值', trigger: 'change' }
                  ]"
                >
                  <el-checkbox-group v-model="item.content" />
                </el-form-item>
                <div
                  class="form_row-3"
                >
                  <i v-handle class="el-icon-d-caret" />
                </div>
              </div>
            </template>
          </tf-drag-table>
        </el-form>

        <div class="body_footer">
          <el-button
            size="small"
            @click="addSList"
          >
            添加规格
          </el-button>
        </div>
      </div>
      <div slot="footer" class="dialog_footer">
        <el-button
          size="small"
          @click="onClickSubmit"
        >
          提交
        </el-button>
        <el-button
          size="small"
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
import { HandleDirective } from 'vue-slicksort'
const cloneDeep = require('lodash/cloneDeep')
// 验证不含英文逗号数据
export const validateNotComma = (rule, value, callback) => {
  const reg = /,/
  if (reg.test(value)) {
    callback(new Error('不允许包含英文 , 逗号'))
  } else {
    callback()
  }
}
export default {
  directives: { handle: HandleDirective },
  props: {
    value: {
      default: () => [],
      type: Array
    }
  },

  data() {
    const initData = cloneDeep(this.value)
    return {
      dialogVisible: false,
      ruleForm: {
        list:
          initData.length > 0
            ? initData
            : [
              {
                // 规格标题
                title: '',
                content: [],
                key: Date.now()
              }
            ]
      }
    }
  },
  computed: {
    titleRules() {
      return [
        {
          required: true,
          message: '标题不能为空',
          trigger: ['blur', 'change']
        },
        {
          min: 1,
          max: 15,
          message: '长度在 1 到 15 个字符',
          trigger: ['blur', 'change']
        },
        {
          validator: validateNotComma,
          trigger: ['blur', 'change']
        }
      ]
    },
    contentRules() {
      return [
        {
          required: true,
          message: '规格值不能为空',
          trigger: ['blur', 'change']
        },
        {
          min: 1,
          max: 15,
          message: '长度在 1 到 15 个字符',
          trigger: ['blur', 'change']
        },
        {
          validator: validateNotComma,
          trigger: ['blur', 'change']
        }
      ]
    }
  },
  methods: {
    addSList() {
      this.ruleForm.list.push({
        // 规格标题
        title: '',
        content: [],
        key: Date.now()
      })
    },
    clickhandler() {
      this.dialogVisible = true
      this.initFormData()
    },
    removeItem(item, index) {
      console.log(item)
      this.ruleForm.list.splice(index, 1)
    },
    removeChildItem(item, index, contentItem, contentIndex) {
      this.ruleForm.list[index].content.splice(contentIndex, 1)
    },
    async onClickSubmit() {
      const result = await this.$refs.ruleForm
        .validate()
        .then(_ => true, _ => false)
      if (result) {
        const cloneList = cloneDeep(this.ruleForm.list)
        this.$emit('input', cloneList)
        this.dialogVisible = false
        this.resetForm()
      }
    },
    addNewItem(item, index) {
      this.ruleForm.list[index].content.push('')
    },
    resetForm() {
      this.initFormData()
      this.$nextTick(() => {
        this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
      })
    },
    initFormData() {
      const initData = cloneDeep(this.value)
      this.ruleForm.list =
        initData.length > 0
          ? initData
          : [
            {
              // 规格标题
              title: '',
              content: [],
              key: Date.now()
            }
          ]
    },
    beforeClose(done) {
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

<style lang="less">
@dialogGap: 190px;
.EditStander {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
.EditStanderForm {
  .dialog_body {
    // height: 70vh;
    height: calc(70vh - @dialogGap);
    overflow-y: scroll;
    .body_footer {
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
  }
  .dialog_footer {
    text-align: center;
  }
  .form_one_stander {
    padding: 20px 20px;
    max-width: 800px;
    margin: auto;
    border-radius: 5px;
    background-color: #fff;
    // border: 1px solid #dddddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .form_row-1 {
      display: flex;
      align-items: center;
    }
    .form_row-2 {
      min-height: 51px;
    }
    .form_row-3 {
      height: 0;
    }
  }
}
</style>
