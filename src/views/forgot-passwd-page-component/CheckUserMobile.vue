<template>
  <div class="CheckUserMobile">
    <el-form
      ref="ruleForm"
      class="check-form"
      :model="ruleForm"
      status-icon
      :rules="rules"
      :disabled="disable"
      label-width="80px"
      @submit.native.prevent
    >
      <el-form-item
        label="手机号"
        prop="mobile"
      >
        <el-input
          :clearable="clearable"
          placeholder="请输入手机号"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
          :value="ruleForm.mobile"
          @input="inputmobile"
        />
      </el-form-item>
      <el-form-item class="operation">
        <el-button
          type="primary"
          size="mini"
          :style="{
            width: '200px'
          }"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
        <el-button
          size="mini"
          @click="resetForm('ruleForm')"
        >
          重填
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  validatePhone,
  validatePhoneIsNum
} from '@/components/simple-components/validateRegRues.js'
export default {
  props: {
    clearable: {
      type: Boolean
    },
    disable: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      ruleForm: { mobile: '' },
      rules: {
        mobile: [
          { validator: validatePhoneIsNum, trigger: ['change'] },
          { validator: validatePhone, trigger: ['blur'] },
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 输入验证
    inputmobile(value) {
      const reg = /^\d{0,11}$/
      if (reg.test(value) || value === '') {
        this.ruleForm.mobile = value
      }
    },
    async submitForm(formName) {
      const isPassed = await this.$refs[formName]
        .validate()
        .then(d => d, e => e)
      if (isPassed) {
        this.$emit('submit', {
          ...this[formName]
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.CheckUserMobile {
  max-width: 500px;
  // .check-form {
  // }
}
</style>
