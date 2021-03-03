
<template>
  <div class="register-form-section">
    <el-form
      ref="ruleForm"
      class="register-form"
      :model="ruleForm"
      status-icon
      :rules="rules"
      :disabled="disable"
      label-width="80px"
      @submit.native.prevent
    >
      <el-form-item
        label="姓名"
        prop="name"
        title="请填写真实姓名"
      >
        <el-input
          v-model.trim="ruleForm.name"
          :clearable="clearable"
          type="text"
          placeholder="请填写真实姓名"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
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
      <div class="security-section">
        <el-form-item
          class="security-input"
          label="验证码"
          prop="securityCode"
        >
          <el-input
            :clearable="clearable"
            placeholder="请输入验证码"
            name="securityCode"
            :value="ruleForm.securityCode"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            autocomplete="securityCode"
            @input="inputSecurityCode"
          />
        </el-form-item>
        <div class="security-button">
          <el-button
            type="text"
            size="mini"
            @click="getVerifyCode(6, 'ruleForm')"
          >
            {{ isGettingSecurityCode?`${restTime} 秒`:'获取验证码' }}
          </el-button>
        </div>
      </div>
      <el-form-item
        label="密码"
        prop="pass"
        title="请输入密码"
      >
        <el-input
          v-model.trim="ruleForm.pass"
          :clearable="clearable"
          type="password"
          name="password"
          placeholder="请输入密码"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="pass2"
        title="请确认密码"
      >
        <el-input
          v-model.trim="ruleForm.pass2"
          :clearable="clearable"
          type="password"
          placeholder="请确认密码"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="new-password"
        />
        <!-- autocomplete="off" -->
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
/*
 * @Author: tian.fanfan
 * @Date: 2019-02-22 17:50:58
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-04-22 15:17:56
 */
import {
  validatePhone,
  validatePhoneIsNum,
  validatePassNotOnlyLetter,
  validatePassNotOnlyNum,
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
    const validatePassIsSame = (rule, value, callback) => {
      if (this.ruleForm.pass !== this.ruleForm.pass2) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        this.$refs.ruleForm.validateField('pass')
        callback()
      }
    }
    // 验证密码
    const passValidator = [
      {
        required: true,
        type: 'string',
        message: '必须填写',
        trigger: ['blur', 'change']
      },
      { validator: validatePassNotOnlyNum, trigger: ['blur'] },
      { validator: validatePassNotOnlyLetter, trigger: ['blur'] },
      { validator: validatePass, trigger: ['blur'] }
    ]
    return {
      timeId: null,
      restTime: 0,
      isGettingSecurityCode: false,
      ruleForm: {
        // 验证码
        securityCode: '',
        // 手机号
        mobile: '',
        // 用户名
        name: '',
        pass: '',
        pass2: ''
      },
      rules: {
        pass: passValidator,
        pass2: [
          ...passValidator,
          { validator: validatePassIsSame, trigger: ['blur'] }
        ],
        name: [
          {
            required: true,
            type: 'string',
            message: '必须填写 姓名',
            trigger: ['blur', 'change']
          },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
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
  destroyed() {
    window.clearInterval(this.timeId)
  },
  beforeDestroy() {
    window.clearInterval(this.timeId)
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    }
  }
}
</script>
<style lang="less" scoped>
.register-form-section {
  max-width: 500px;
  .operation-section {
    display: flex;
    height: 40px;
    padding-left: 24px;
    margin-bottom: 22px;
    align-items: center;
  }
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
