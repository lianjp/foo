
<template>
  <div class="log-in-form-section">
    <el-form
      ref="ruleForm"
      class="log-in-form"
      :model="ruleForm"
      status-icon
      :disabled="loading"
      :rules="rules"
      label-width="60px"
      @submit.native.prevent
    >
      <el-form-item label="账号" prop="mobile">
        <el-input
          :clearable="clearable"
          placeholder="请输入手机号"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
          :value="ruleForm.mobile"
          @input="inputMobile"
        />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          v-model.trim="ruleForm.pass"
          type="password"
          placeholder="请输入密码"
          :clearable="clearable"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
          @keydown.enter.native="submitForm('ruleForm')"
        />
      </el-form-item>
      <div class="operation-section">
        <div>
          <el-checkbox
            v-model="needAutoLogIn"
            title="勾选后，下次刷新或者重新打开页面会自动登录。"
          >
            一周内自动登录
          </el-checkbox>
        </div>
        <div style="flex: 1 1 auto;" />
        <div>
          <el-button type="text" size="medium" @click="forgotPasswd()">
            <span>
              忘记密码
            </span>
            <!-- <i class="icon iconfont icon-jiantou-right"></i> -->
          </el-button>
        </div>
      </div>
      <el-form-item label-width="0" class="footer_buttonGroup">
        <el-button
          type="primary"
          class="submit_button button"
          size="mini"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          立即登录
        </el-button>
        <el-button
          class="reset_button button"
          size="mini"
          @click="resetForm('ruleForm')"
        >
          重新填写
        </el-button>
        <el-button
          class="register_button button"
          size="mini"
          @click="$router.push({ name: 'register' })"
        >
          跳转注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
/*
 * @Author: tian.fanfan
 * @Date: 2019-02-22 11:43:49
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-05-23 17:09:09
 */
import {
  validatePhone,
  validatePassNotOnlyNum,
  validatePass,
  validatePassNotOnlyLetter,
  validatePhoneIsNum
} from '@/components/simple-components/validateRegRues.js'
export default {
  props: {
    clearable: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    // 验证密码
    const validatemobile = (rule, value, callback) => {
      callback()
      this.$refs.ruleForm.validateField('mobile')
    }

    return {
      needAutoLogIn: false,
      ruleForm: {
        pass: '',
        mobile: ''
      },
      rules: {
        pass: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          },
          { validator: validatePassNotOnlyNum, trigger: ['blur'] },
          { validator: validatePassNotOnlyLetter, trigger: ['blur'] },
          { validator: validatePass, trigger: ['blur'] },
          { validator: validatemobile, trigger: ['blur'] }
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
    // 输入手机，达到不能输入其他文字的特效
    inputMobile(value) {
      const reg = /^\d{0,11}$/
      if (reg.test(value) || value === '') {
        this.ruleForm.mobile = value
      }
    },
    forgotPasswd() {
      this.$router.push({
        name: 'ForgotPasswdPage'
      })
    },
    resetForm(formName = 'ruleForm') {
      this.$refs[formName].resetFields()
    },
    async submitForm(formName = 'ruleForm') {
      const isPassed = await this.$refs[formName]
        .validate()
        .then(d => d, e => e)
      if (isPassed) {
        this.$emit('submit', {
          ...this[formName],
          needAutoLogIn: this.needAutoLogIn
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.log-in-form-section {
  .operation-section {
    display: flex;
    height: 40px;
    padding-left: 24px;
    margin-bottom: 12px;
    align-items: center;
  }
  .footer_buttonGroup {
    text-align: center;
  }
  // .button {
  //   min-width: 70px;
  // }
}
</style>
