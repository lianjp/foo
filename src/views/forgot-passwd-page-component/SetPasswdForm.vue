<template>
  <div class="setpasswd-form">
    <el-form
      ref="ruleForm"
      class="check-form"
      :model="ruleForm"
      status-icon
      :rules="rules"
      :disabled="disable"
      label-width="110px"
      @submit.native.prevent>
      <el-form-item
        label="手机号"
        prop="mobile">
        <el-input
          :clearable="clearable"
          placeholder="请输入手机号"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
          :value="ruleForm.mobile"
          @input="inputmobile" />
      </el-form-item>

      <div class="security-section">
        <el-form-item
          class="security-input"
          label="验证码"
          prop="securityCode">
          <el-input
            :clearable="clearable"
            placeholder="请输入验证码"
            :value="ruleForm.securityCode"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            autocomplete="off"
            @input="inputSecurityCode" />
        </el-form-item>
        <div class="security-button">
          <el-button
            type="text"
            size="mini"
            @click="getVerifyCode(6, 'ruleForm')">
            {{ isGettingSecurityCode?`${restTime} 秒`:'获取验证码' }}
          </el-button>
        </div>
      </div>
      <el-form-item
        class="password"
        prop="password1">
        <span slot="label">
          新密码
        </span>
        <el-input
          v-model="ruleForm.password1"
          name="password1"
          type="password"
          size="medium"
          placeholder="请输入密码"
          :clearable="clearable"
          :auto-complete="'new-password'" />
      </el-form-item>
      <el-form-item
        class="password"
        prop="password2">
        <span slot="label">
          确认新密码
        </span>
        <el-input
          v-model="ruleForm.password2"
          name="password2"
          type="password"
          size="medium"
          placeholder="请确认密码"
          :clearable="clearable"
          :auto-complete="'new-password'"
          @keydown.enter.native="submitForm('ruleForm')" />
      </el-form-item>
      <el-form-item class="operation">
        <el-button
          type="primary"
          size="mini"
          :style="{
            width: '200px'
          }"
          :loading="loading"
          @click="submitForm('ruleForm')">
          提交
        </el-button>
        <el-button
          size="mini"
          @click="resetForm('ruleForm')">
          重填
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  validatePhone,
  validatePhoneIsNum,
  validatePassNotOnlyNum,
  validatePassNotOnlyLetter,
  validatePass
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
    // 验证 验证码
    const validataSecurityCode = (rule, value, callback) => {
      const reg = /^[\d]*$/
      if (!reg.test(value)) {
        callback(new Error('验证码为数字'))
      } else {
        callback()
      }
    }
    const validatePassSameAsPassBefore = (rule, value, callback) => {
      if (this.ruleForm.password1 !== value) {
        callback(new Error('两次密码输入不同'))
      } else {
        callback()
      }
    }
    return {
      timeId: null,
      restTime: 0,
      isGettingSecurityCode: false,
      ruleForm: {
        // 验证码
        securityCode: '',
        mobile: '',
        password1: '',
        password2: ''
      },
      rules: {
        password1: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          { validator: validatePassNotOnlyNum, trigger: ['blur'] },
          { validator: validatePassNotOnlyLetter, trigger: ['blur'] },
          { validator: validatePass, trigger: ['blur'] }
        ],
        password2: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          { validator: validatePass, trigger: ['blur'] },
          { validator: validatePassNotOnlyNum, trigger: ['blur'] },
          { validator: validatePassNotOnlyLetter, trigger: ['blur'] },
          { validator: validatePassSameAsPassBefore, trigger: ['blur'] }
        ],
        securityCode: [
          {
            required: true,
            type: 'string',
            message: '必填字段',
            trigger: ['blur', 'change']
          },
          { validator: validataSecurityCode, trigger: ['blur'] },
          {
            len: 5,
            type: 'string',
            message: '必须是 5 位数字',
            trigger: ['blur']
          }
        ],
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
    inputSecurityCode(value) {
      const reg = /^\d{0,5}$/
      if (reg.test(value) || value === '') {
        this.ruleForm.securityCode = value
      }
    },
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
    async getVerifyCode(restTime, formName) {
      if (
        !(await new Promise((resolve, reject) => {
          this.$refs[formName].validateField('mobile', (_, e) => {
            resolve(!e)
          })
        }))
      ) {
        return
      }
      if (!this.isGettingSecurityCode) {
        this.isGettingSecurityCode = true
        this.restTime = restTime
        this.timeId = window.setInterval(() => {
          this.restTime = parseInt(this.restTime - 1)
          if (this.restTime <= 0) {
            window.clearInterval(this.timeId)
            this.isGettingSecurityCode = false
          }
        }, 1000)
        this.$emit('getVerifyCode', {
          ...this[formName]
        })
      }
    },
    resetForm(formName = 'ruleForm') {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.setpasswd-form {
  max-width: 500px;
  // .check-form {
  // }
  .security-section {
    display: flex;
    align-items: center;
    .security-input {
      flex: 1 1 auto;
    }
    .security-button {
      width: 70px;
      margin-bottom: 22px;
      text-align: center;
    }
  }
  /deep/ .operation .el-form-item__content {
    margin-left: 0px !important;
    text-align: center;
  }
}
</style>
