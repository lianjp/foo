<template>
  <div class="ApplyToBecomeSupplierInlandForm">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :disabled="disable"
      :rules="rules"
      class="apply-to-supplier-inland-form"
      status-icon
      label-width="180px"
      @submit.native.prevent
    >
      <el-form-item
        label="供应商名称"
        prop="supplierName"
        title="请填写真实供应商名称"
      >
        <el-input
          v-model.trim="ruleForm.supplierName"
          :clearable="clearable"
          type="text"
          placeholder="请填写真实供应商名称"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="联系人姓名"
        prop="name"
        title="请填写真实联系人姓名"
      >
        <el-input
          v-model.trim="ruleForm.name"
          :clearable="clearable"
          type="text"
          placeholder="请填写真实联系人姓名"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="telephone"
        title="请填写 联系电话"
      >
        <el-input
          v-model.trim="ruleForm.telephone"
          :clearable="clearable"
          type="text"
          placeholder="请填写 联系电话"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="营业执照类型"
        prop="businessLicenseType"
        title="请填写 营业执照类型"
      >
        <el-radio-group
          v-model="ruleForm.businessLicenseType"
        >
          <el-radio
            :label="oldLicenseTypeLabel"
          >
            境内公司营业执照{{ oldLicenseTypeLabel }}
          </el-radio>
          <el-radio
            :label="newLicenseTypeLabel"
          >
            新的营业执照（三证合一）{{ newLicenseTypeLabel }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.businessLicenseType === oldLicenseTypeLabel"
        key="businessLicenseImgList"
        label="营业执照图片"
        prop="businessLicenseImgList"
      >
        <!--
          :file-list 不支持 .sync 必须自己维护。
          添加删除时候进行修改。
          或超标进行修改
        -->
        <tf-el-upload
          v-model="ruleForm.businessLicenseImgList"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="1"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.businessLicenseImgList" />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.businessLicenseType === newLicenseTypeLabel"
        key="businessLicenseImgList3In1"
        label="新营业执照"
        prop="businessLicenseImgList3In1"
      >
        <!--
          :file-list 不支持 .sync 必须自己维护。
          添加删除时候进行修改。
          或超标进行修改
        -->

        <tf-el-upload
          v-model="ruleForm.businessLicenseImgList3In1"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="1"
          :size="2"
        >
          <div slot="tip" class="el-upload__tip">
            新版营业执照，三证合一，只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.businessLicenseImgList3In1" />
      </el-form-item>

      <el-form-item
        v-if="ruleForm.businessLicenseType === oldLicenseTypeLabel"
        label="组织机构代码"
        prop="organizingUUId"
        title="请填写 组织机构代码"
      >
        <el-input
          v-model.trim="ruleForm.organizingUUId"
          :clearable="clearable"
          type="text"
          placeholder="请输入组织机构代码"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.businessLicenseType === oldLicenseTypeLabel"
        key="taxRegistration"
        label="税务登记"
        prop="taxRegistration"
      >
        <tf-el-upload
          v-model="ruleForm.taxRegistration"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="1"
        >
          <div slot="tip" class="el-upload__tip">
            税务登记，只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.taxRegistration" />
      </el-form-item>

      <el-form-item
        label="法人身份证（正反两张）"
        prop="certificateImgList"
      >
        <tf-el-upload
          v-model="ruleForm.certificateImgList"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="2"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.certificateImgList" />
      </el-form-item>

      <el-form-item
        label="品牌授权书（可多张）"
        prop="brandLicensingImgList"
      >
        <tf-el-upload
          v-model="ruleForm.brandLicensingImgList"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="30"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.brandLicensingImgList" />
      </el-form-item>

      <el-form-item
        label="商标注册证"
        prop="trademarkRegistrationCertificate"
      >
        <tf-el-upload
          v-model="ruleForm.trademarkRegistrationCertificate"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="30"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.trademarkRegistrationCertificate" />
      </el-form-item>

      <el-form-item
        label="食品流通证"
        prop="foodCirculationCertificate"
      >
        <tf-el-upload
          v-model="ruleForm.foodCirculationCertificate"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="30"
        >
          <div slot="tip" class="el-upload__tip">
            只能上传 JPG / PNG 文件，且单文件不超过 2M 大小
          </div>
        </tf-el-upload>
        <el-checkbox-group v-model="ruleForm.foodCirculationCertificate" />
      </el-form-item>

      <el-form-item
        label="其他相关资质：(可上传多个资质)"
        prop="otherQualification"
      >
        <tf-el-upload
          v-model="ruleForm.otherQualification"
          accept="image/*"
          action="api.php/api/upload/upload"
          name="image"
          :amount="30"
        />
        <el-checkbox-group v-model="ruleForm.otherQualification" />
      </el-form-item>

      <el-form-item
        label=" "
        prop="allowAgreement"
        title="请阅读并同意"
        class="allowAgreement"
      >
        <el-checkbox v-model="ruleForm.allowAgreement">
          <span>我已阅读并同意</span>
          <el-button
            type="text"
            class="agreementName"
          >
            {{ agreementName }}
          </el-button>
        </el-checkbox>
      </el-form-item>

      <el-form-item class="form_footer">
        <el-button
          type="primary"
          size="mini"
          title="提交申请"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >
          提交申请
        </el-button>
        <el-button
          size="mini"
          :disabled="loading"
          title="如果是审核未通过，重新填写是恢复成上次提交的数据，如果是第一次申请，重新填写是重置表单"
          @click="resetForm('ruleForm')"
        >
          重新填写
        </el-button>
      </el-form-item>
    </el-form>
    <!-- {{ ruleForm }} -->
  </div>
</template>
<script>
import {
  oldLicenseTypeLabel,
  newLicenseTypeLabel
} from '@/type/applyToBecomeSupplierInlandTypeMap.js'
export default {
  props: {
    initValue: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    }
  },
  data() {
    const ruleForm = {
      supplierName: '',
      name: '',
      telephone: '',
      // 营业执照种类
      businessLicenseType: oldLicenseTypeLabel,
      // 营业执照
      businessLicenseImgList: [],
      // 新版营业执照，3in1
      businessLicenseImgList3In1: [],
      // 组织机构代码编号
      organizingUUId: '',
      // 税务登记
      taxRegistration: [],
      // 法人身份证
      certificateImgList: [],
      // 品牌授权书
      brandLicensingImgList: [],
      // 商标注册证书
      trademarkRegistrationCertificate: [],
      // 食品流通证
      foodCirculationCertificate: [],
      // 其他相关资质
      otherQualification: [],
      allowAgreement: false
    }
    const initValue = this.initValue
    for (const k in ruleForm) {
      ruleForm[k] = initValue[k] || ruleForm[k]
    }
    return {
      // oldLicenseTypeLabel: 2,
      // newLicenseTypeLabel: 1,
      oldLicenseTypeLabel,
      newLicenseTypeLabel,
      agreementName: '《海销平台协议》',
      ruleForm,
      rules: {
        supplierName: [
          {
            required: true,
            type: 'string',
            message: '必须填写 供应商名称',
            trigger: ['blur']
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            type: 'string',
            message: '必须填写 联系人姓名',
            trigger: ['blur']
          },
          {
            min: 1,
            max: 5,
            message: '长度在 1 到 5 个字符',
            trigger: 'blur'
          }
        ],
        businessLicenseType: [
          {
            required: true,
            type: 'number',
            message: '请选择种类',
            trigger: ['blur']
          }
        ],
        telephone: [
          {
            required: true,
            type: 'string',
            message: '必须填写 电话号码'
          },
          {
            type: 'string',
            pattern: /^1[0-9]{10}$|^[569][0-9]{7}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        businessLicenseImgList: [
          {
            type: 'array',
            required: true,
            message: '需要三证，图片',
            len: 1
          }
        ],
        // 三合一的执照
        businessLicenseImgList3In1: [
          {
            type: 'array',
            required: true,
            message: '需要三证合一的，图片',
            len: 1
          }
        ],
        organizingUUId: [
          {
            required: true,
            type: 'string',
            message: '必须填写 组织机构代码'
          }
        ],
        taxRegistration: [
          {
            type: 'array',
            required: true,
            message: '请选择税务登记图片',
            len: 1
          }
        ],
        certificateImgList: [
          {
            type: 'array',
            required: true,
            message: '请选择法人身份证，正反两张图片， 前正， 后反',
            len: 2
          }
        ],
        brandLicensingImgList: [
          {
            type: 'array',
            required: true,
            message: '至少 1 张， 最多 30 张',
            min: 1,
            max: 30
          }
        ],
        trademarkRegistrationCertificate: [
          {
            type: 'array',
            message: '可选填， 最多 30 张',
            min: 0,
            max: 30
          }
        ],
        foodCirculationCertificate: [
          {
            type: 'array',
            message: '可选填， 最多 30 个',
            min: 0,
            max: 30
          }
        ],
        otherQualification: [
          {
            type: 'array',
            message: '可选填 最多 30 个',
            min: 0,
            max: 30
          }
        ],
        allowAgreement: [
          {
            type: 'enum',
            enum: ['true'],
            required: true,
            message: '请阅读并同意',
            trigger: 'change',
            transform: value => value.toString()
          }
        ]
      }
    }
  },
  watch: {
    'ruleForm.businessLicenseType': {
      handler(newVal) {
        if (newVal === this.oldLicenseTypeLabel) {
          this.ruleForm.businessLicenseImgList3In1 = []
        }
        if (newVal === this.newLicenseTypeLabel) {
          this.ruleForm.businessLicenseImgList = []
          this.ruleForm.organizingUUId = ''
        }
      }
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validateField(['checkPass'])
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
.ApplyToBecomeSupplierInlandForm {
  max-width: 900px;
  background-color: #fff;
  margin: auto;
  padding: 20px 0;
  // .apply-to-supplier-inland-form {
  // }
  .allowAgreement {
    /deep/.el-form-item__label {
      &::before {
        display: none;
      }
    }
  }
  .form_footer {
    text-align: center;
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  /deep/ .el-upload-list {
    display: inline-block;
    line-height: 0;
  }
  /deep/.el-upload.el-upload--picture-card {
    margin: 0 8px 8px 0;
  }
}
</style>
