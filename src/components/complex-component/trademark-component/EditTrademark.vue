<template>
  <div class="EditTrademark">
    <el-dialog
      v-if="dialogVisible"
      v-bind="$attrs"
      title="编辑品牌"
      width="600px"
      custom-class="reTalk"
      :visible.sync="dialogVisible"
      :fullscreen="false"
      :append-to-body="true"
      :before-close="handleClose"
      v-on="$listeners">
      <el-form
        ref="ruleForm"
        :disabled="loading"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="ruleForm"
        @submit.native.prevent>
        <el-form-item label="品牌名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            :clearable="!loading" />
        </el-form-item>
        <el-form-item
          label="品牌类型"
          prop="type"
          title="请填写 品牌类型">
          <el-radio-group
            v-model="ruleForm.type">
            <el-radio
              :label="1">
              自有品牌
            </el-radio>
            <el-radio
              :label="2">
              授权品牌
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          key="material"
          label="品牌资料"
          prop="material">
          <!--
          :file-list 不支持 .sync 必须自己维护。
          添加删除时候进行修改。
          或超标进行修改
        -->
          <tf-el-upload
            v-model="ruleForm.material"
            accept="image/*"
            action="api.php/api/upload/upload"
            name="image"
            :amount="1">
            <div slot="tip" class="el-upload__tip">
              商品注册证 or 商品注册受理证复印本
            </div>
          </tf-el-upload>
          <el-checkbox-group v-model="ruleForm.material" />
        </el-form-item>

        <el-form-item label="有效时期" prop="timestamp" title="注册商标有效时期">
          <el-date-picker
            v-model="ruleForm.timestamp"
            type="daterange"
            size="small"
            align="right"
            :clearable="!loading"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']" />
          <!-- :picker-options="pickerOptions" -->
        </el-form-item>

        <el-form-item class="form_footer">
          <el-button
            type="primary"
            size="mini"
            title="提交申请"
            :loading="loading"
            @click="submitForm('ruleForm')">
            提交申请
          </el-button>
          <el-button
            size="mini"
            title="如果是审核未通过，重新填写是恢复成上次提交的数据，如果是第一次申请，重新填写是重置表单"
            @click="resetForm('ruleForm')">
            重新填写
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="main_slot" @click="clickhandler">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
// 直接和 vuex 通讯
import { mapState, mapActions } from 'vuex'

import pickerOptions from '@/views/timePickerOption.js'

export default {
  props: {
    dispatchId: {
      type: String,
      default: '0'
    }
  },
  data() {
    const ruleForm = {
      // 新品牌名称
      name: '',
      // 类型
      type: 1,
      // 图片
      material: [],
      // 时间段
      timestamp: []
    }
    return {
      pickerOptions,
      ruleForm,
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        type: [
          {
            required: true,
            type: 'number',
            message: '请选择 种类',
            trigger: ['blur']
          }
        ],
        material: [
          {
            type: 'array',
            required: true,
            message: '品牌资料的图片',
            len: 1
          }
        ],
        timestamp: [
          {
            type: 'array',
            required: true,
            message: '必须填写有效时期时间段',
            len: 2
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('loading', {
      editNewTrademarkCount: 'trademarkModule/editNewTrademark',
      getTrademarkDetailCount: 'trademarkModule/getTrademarkDetail'
    }),

    loading() {
      return this.getTrademarkDetailCount > 0 || this.editNewTrademarkCount > 0
    }
  },
  methods: {
    ...mapActions('trademarkModule', [
      'editNewTrademark',
      'getTrademarkDetail'
    ]),
    // 回复弹窗关闭前的拦截器
    handleClose(done) {
      done()
    },

    async setBaseData() {
      const { code, data } = await this.getTrademarkDetail({
        id: this.dispatchId
      })
      if (this.isSuccessful(code)) {
        this.ruleForm = {
          ...data
        }
      }
    },

    clickhandler() {
      this.dialogVisible = true
      this.setBaseData()
    },
    async submitForm(formName) {
      const isPassed = await this.$refs[formName]
        .validate()
        .then(d => d, e => e)
      if (isPassed) {
        this.submit({
          ...this[formName]
        })
      }
    },

    async submit(formData) {
      const result = await this.editNewTrademark({
        ...formData,
        id: this.dispatchId
      })
      const { code, message } = result
      this.$message({
        message,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
      if (this.isSuccessful(code)) {
        this.$emit('success')
        this.dialogVisible = false
      }
    },

    resetForm() {
      this.setBaseData()
    }
  }
}
</script>
<style lang="less" scoped>
.EditTrademark {
  display: inline-block;
  .main_slot {
    display: inline-block;
  }
}
</style>
