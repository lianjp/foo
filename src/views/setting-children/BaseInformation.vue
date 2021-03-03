<template>
  <div class="BaseInformation">
    <TfCard
      title="基本资料"
      border>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        size="small"
        :disabled="updateUserInfoCount>0"
        :rules="rules"
        label-width="100px"
        class="updateUserInfo_form"
        @submit.native.prevent>
        <el-form-item
          label="账号"
          title="不可更改">
          <el-input :value="mobile" disabled />
        </el-form-item>
        <el-form-item
          label="供应商">
          <el-input :value="merchreg.supplierName" disabled />
        </el-form-item>
        <el-form-item
          label="供应商编号">
          <el-input :value="11111" disabled />
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="手机"
          prop="mobile">
          <el-input v-model="ruleForm.mobile" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            :loading="updateUserInfoCount>0"
            @click="submitForm('ruleForm')">
            保存
          </el-button>
          <!-- <el-button
            size="small"
            @click="resetForm('ruleForm')">
            重新填写
          </el-button> -->
        </el-form-item>
      </el-form>
    </TfCard>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import {
  validatePhone,
  validatePhoneIsNum
} from '@/components/simple-components/validateRegRues.js'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
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
  computed: {
    ...mapState('userModule', ['mobile', 'userName', 'merchreg']),
    ...mapState('loading', {
      updateUserInfoCount: 'userModule/updateUserInfo'
    })
  },
  watch: {
    merchreg: {
      // 重新获取后，重置初始值
      handler({ name, telephone }) {
        this.ruleForm.name = name
        this.ruleForm.mobile = telephone
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('userModule', ['updateUserInfo']),
    async submitForm(formName) {
      const pass = await this.$refs[formName]
        .validate()
        .then(_ => true, _ => false)
      if (pass) {
        const { code, message } = await this.updateUserInfo(this.ruleForm)
        this.$message({
          message,
          type: this.isSuccessful(code) ? 'success' : 'error'
        })
      }
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
<style lang="less" scoped>
.updateUserInfo_form {
  width: 800px;
  margin: auto;
}
</style>
