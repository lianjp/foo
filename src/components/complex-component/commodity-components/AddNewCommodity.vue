<template>
  <div class="AddNewCommodity">
    <el-dialog
      v-if="dialogVisible"
      title="商品信息填写"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="90%"
      top="5vh"
      :modal="true"
      custom-class="AddNewCommodityDialog"
      :append-to-body="true"
    >
      <div class="dialog_body">
        <div>
          <h5 class="title">
            基本信息
          </h5>
          <el-form
            ref="ruleForm"
            class="AddNewCommodityForm"
            size="small"
            :model="ruleForm"
            :disabled="addGoodsActionCount>0"
            :rules="rules"
            status-icon
            label-width="180px"
            @submit.native.prevent
          >
            <el-form-item title="业务模式" label="业务模式" prop="type" required>
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="1">
                  国内仓
                </el-radio>
                <el-radio label="2">
                  保税仓
                </el-radio>
                <el-radio label="3">
                  海外仓
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item title="商品品类" label="商品品类" prop="tcate">
              <!-- <CommodityCategorySelect
                v-model="ruleForm.tcate"
                :list="goodsCateListData"
                start-id="0"
              /> -->
              <MultiSelect
                ref="multiSelect"
                v-model="ruleForm.tcate"
                :list="goodsCateListData"
                root-id="0"
              />
            </el-form-item>

            <el-form-item title="商品品牌" label="商品品牌" prop="brandid" required>
              <el-select v-model="ruleForm.brandid" placeholder="请选择商品品牌">
                <el-option
                  v-for="(item, key) in brandData"
                  :key="key"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item title="商品名称" label="商品名称" prop="title">
              <el-input
                v-model.trim="ruleForm.title"
                size="small"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item title="发货仓库" label="发货仓库" prop="depotid" required>
              <el-select v-model="ruleForm.depotid" placeholder="请选择仓库">
                <el-option
                  v-for="(item, key) in wareHouseData"
                  :key="key"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item key="thumb" title="商品图片" label="商品图片" prop="thumb" required>
              <tf-el-upload
                v-model="ruleForm.thumb"
                class="commodity-el-upload"
                accept="image/*"
                action="api.php/api/upload/upload"
                name="image"
                :amount="5"
              >
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  第一张为缩略图，建议为正方形图片，其他为详情页面图片，尺寸建议宽度为640，并保持图片一致您可以删除修改顺序。
                </div>
              </tf-el-upload>
              <!-- 设置一个接受数组的元素，被动触发 验证规则 -->
              <el-checkbox-group v-show="false" v-model="ruleForm.thumb" />
            </el-form-item>

            <el-form-item label="商品详情" prop="content">
              <quill-editor
                ref="myTextEditor"
                v-model="ruleForm.content"
                class="quill-editor-section"
                @change="validateContentField"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </el-form-item>
            <!-- <div class="quill-code">
              <code class="hljs" v-html="contentCode" />
            </div>-->

            <el-form-item title="搜索关键字" label="搜索关键字" prop="goodskey">
              <el-input
                v-model.trim="ruleForm.goodskey"
                type="text"
                placeholder="多个关键字用英文逗号隔开"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item title="商品属性" label="商品属性" prop="attribute" required>
              <el-radio-group v-model="ruleForm.attribute">
                <el-radio label="0">
                  非专属商品
                </el-radio>
                <el-radio label="1">
                  专属商品
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <h5 class="title">
            库存/规格/价格
            <!-- {{ ruleForm.content }} -->
          </h5>
          <el-form
            ref="ruleForm2"
            class="AddNewCommodityForm2"
            size="small"
            :model="ruleForm"
            :disabled="addGoodsActionCount>0"
            :rules="rules"
            status-icon
            label-width="180px"
            @submit.native.prevent
          >
            <el-form-item title="商品页面是否显示库存" label="显示库存" required prop="showtotal">
              <el-switch v-model="ruleForm.showtotal" active-value="1" inactive-value="0" />
            </el-form-item>

            <el-form-item title="启用详细规格" label="启用详细规格" required prop="hasoption">
              <el-switch v-model="ruleForm.hasoption" active-value="1" inactive-value="0" />
            </el-form-item>

            <div v-if="ruleForm.hasoption == 0" class="not_hasoption">
              <el-form-item label-width="0px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item title="编码" label="编码" prop="goodssn">
                      <el-input
                        v-model="ruleForm.goodssn"
                        size="small"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item title="条码" label="条码" prop="productsn">
                      <el-input
                        v-model.trim="ruleForm.productsn"
                        size="small"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item title="重量" label="重量" prop="weight">
                  <el-input
                    v-model.trim="ruleForm.weight"
                    size="small"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    autocomplete="off"
                  >
                    <template slot="append">
                      克
                    </template>
                  </el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item title="库存" label="库存" prop="total">
                      <el-input
                        v-model="ruleForm.total"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="8">
                  </el-col>-->
                </el-row>
              </el-form-item>

              <el-form-item title="供货价" label="供货价" prop="supplyprice">
                <el-input
                  v-model.trim="ruleForm.supplyprice"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item title="建议零售价，开启详细规格后，只在外部展示" label="建议零售价" required>
                <el-col :span="11">
                  <el-form-item label-width="80px" title="最小值" label="最小值" prop="smallprice">
                    <el-input
                      v-model="ruleForm.smallprice"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <div style="text-align: center;">
                    -
                  </div>
                </el-col>
                <el-col :span="11">
                  <el-form-item label-width="80px" title="最大值" label="最大值" prop="largeprice">
                    <el-input
                      v-model="ruleForm.largeprice"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
            <div v-else class="has_option">
              <el-form-item title="详细规格配置表" label="详细规格配置表">
                <!-- v-model="ruleForm.specs" -->
                <StanderdTable ref="StanderdTable" :disabled="addGoodsActionCount>0" />
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div>
          <h5 class="title">
            物流运费
          </h5>
          <el-form
            ref="ruleForm3"
            class="AddNewCommodityForm3"
            size="small"
            :model="ruleForm"
            :disabled="addGoodsActionCount>0"
            :rules="rules"
            status-icon
            label-width="180px"
            @submit.native.prevent
          >
            <el-form-item title="运费设置" label="运费设置" required prop="dispatchtype">
              <el-radio-group v-model="ruleForm.dispatchtype">
                <el-radio label="0">
                  运费模板
                </el-radio>
                <el-radio label="1">
                  统一运费
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.dispatchtype == 0">
              <el-form-item key="dispatchid" prop="dispatchid">
                <el-select v-model="ruleForm.dispatchid" placeholder="默认模板">
                  <el-option
                    v-for="(item, key) in originDispatchData"
                    :key="key"
                    :label="item.dispatchname"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item>
                <AddNewDispatch @success="refresh">
                  <el-button size="small" type="primary" icon="el-icon-plus">
                    新建运费模板
                  </el-button>
                </AddNewDispatch>
              </el-form-item>
            </template>

            <el-form-item v-else key="dispatchprice" style="width: 500px;" prop="dispatchprice">
              <el-input
                v-model="ruleForm.dispatchprice"
                placeholder="固定邮费"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                autocomplete="off"
                suffix-icon="el-icon-date"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div slot="footer" class="dialog_footer">
        <el-button :loading="addGoodsActionCount>0" size="small" @click="onClickSubmit">
          提交
        </el-button>
        <el-button size="small" :disabled="addGoodsActionCount>0" @click="resetForm">
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
// import hljs from 'highlight.js'
import {
  validateMoney,
  validateWeight,
  validateNumber
} from '@/components/simple-components/validateRegRues.js'

import StanderdTable from './StanderdTable'
export default {
  components: {
    StanderdTable
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
    return {
      // 对话框可见
      dialogVisible: false,
      clearable: false,
      formName: ['ruleForm', 'ruleForm2', 'ruleForm3', 'StanderdTable'],
      ruleForm: {
        // 业务模式
        type: '1',
        // 商品品类，一级分类
        // pcate: '',
        // 商品品类，二级分类
        // ccate: '',
        // 商品品类，三级分类
        tcate: '',
        // 品牌 id
        brandid: '',
        // 商品名称
        title: '',
        // 供货价设置
        supplyprice: '',
        // 建议售价最小值
        smallprice: '',
        // 建议售价最大值
        largeprice: '',
        // 仓库id
        depotid: '',
        // 商品图片
        thumb: [],
        // 商品详情
        content: '',
        // 搜索关键词
        goodskey: '',
        // 商品属性
        attribute: '0',
        // 是否启动规格
        hasoption: '0',
        // 商品规格，详细配置的对象，不再有此组件维护
        // specs: {},
        // 商品规格对应属性
        // options: '',
        // 编码
        goodssn: '',
        // 条码
        productsn: '',
        // 重量
        weight: '',
        // 库存
        total: '',
        // 运费设置类型
        dispatchtype: '0',
        // 运费模板id
        dispatchid: '',
        // 统一运费
        dispatchprice: '',
        // 是否启用库存
        showtotal: false
      },
      rules: {
        tcate: [
          {
            required: true,
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        brandid: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        title: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          {
            min: 0,
            max: 117,
            message: '长度在 0 到 117 个字符',
            trigger: ['blur', 'change']
          }
        ],
        supplyprice: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...moneyRule
        ],
        smallprice: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...moneyRule
        ],
        largeprice: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...moneyRule
        ],
        weight: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...weightRule
        ],
        thumb: [
          {
            type: 'array',
            required: true,
            message: '至少 2 张， 最多 5 张',
            min: 2,
            max: 5,
            trigger: ['blur', 'change']
          }
        ],
        dispatchid: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        dispatchprice: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...moneyRule
        ],
        depotid: [
          {
            required: true,
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        goodskey: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        goodssn: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        productsn: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        total: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          ...totalRule
        ]
      }
    }
  },
  computed: {
    ...mapState('baseData', {
      brandData: 'brandData',
      wareHouseData: 'wareHouseData',
      originDispatchData: 'dispatchData',
      goodsCateListData: 'goodsCateList'
    }),
    ...mapState('loading', {
      addGoodsActionCount: 'goodsModule/addGoods'
    })
  },

  created() {
    this.getBrandData()
    this.getAllWareHouse()
    this.getDispatchData()
    this.getAllGoodsCateListData()
  },

  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
      this.validateContentField()
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    validateContentField() {
      this.$refs.ruleForm.validateField(['content'])
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    ...mapActions('baseData', {
      getBrandData: 'getBrandData',
      getAllWareHouse: 'getAllWareHouse',
      getDispatchData: 'getDispatchData',
      refreshDispatchData: 'refreshDispatchData',
      getAllGoodsCateListData: 'getAllGoodsCateList'
    }),
    ...mapActions('goodsModule', {
      addGoodsAction: 'addGoods'
    }),

    clickhandler() {
      this.dialogVisible = true
      console.log('clickhandler')
    },
    // 退出表格
    beforeClose(done) {
      if (this.addGoodsActionCount > 0) {
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
    // 删除
    removeDomain(item) {
      const index = this.ruleForm.areas.indexOf(item)
      if (index !== -1) {
        this.ruleForm.areas.splice(index, 1)
      }
    },
    // 重置表格
    resetForm() {
      this.$refs.multiSelect.reset()

      const formName = this.formName
      formName.forEach(name => {
        this.$refs[name] && this.$refs[name].resetFields()
      })
    },

    async onClickSubmit() {
      const formName = this.formName
      const validateResult = []
      for (const name of formName) {
        if (!this.$refs[name]) {
          continue
        }
        const result = await this.$refs[name]
          .validate()
          .then(_ => true, _ => false)
        validateResult.push(result)
      }
      if (validateResult.every(v => v)) {
        this.addNewCommodity()
      }
    },

    async addNewCommodity() {
      const standerdTableFormData =
        this.$refs.StanderdTable && this.$refs.StanderdTable.getFormData()
      const { code, message } = await this.addGoodsAction({
        ...this.ruleForm,
        standerdTableFormData
      })
      console.log('addNewCommodity', code, message)
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
    refresh() {
      this.refreshDispatchData()
    }
  }
}
</script>

<style lang="less" scoped>
// 组件表单
.AddNewCommodity {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>

<style lang="less">
// 弹窗
@dialogGap: 190px;
.AddNewCommodityDialog {
  .AddNewCommodityForm,
  .AddNewCommodityForm2,
  .AddNewCommodityForm3 {
    // padding-top: 20px;
    .pt(20px);
    margin: auto;
  }
  .AddNewCommodityForm2 {
    .not_hasoption {
      min-height: 275px;
    }
    .has_option {
      min-height: 275px;
    }
  }
  .AddNewCommodityForm3 {
    min-height: 160px;
  }
  .dialog_body {
    max-height: calc(90vh - @dialogGap);
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
  .commodity-el-upload {
    min-height: 208px;
  }
}
</style>
