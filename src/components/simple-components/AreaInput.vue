<template>
  <div class="tf-area-input">
    <el-form
      ref="ruleForm"
      size="small"
      :inline="true"
      :rules="rules"
      :disabled="disabled"
      :model="ruleForm"
      class="area-input-inline"
      @submit.native.prevent>
      <el-form-item
        label=""
        prop="province">
        <el-select
          v-model="ruleForm.province"
          filterable
          clearable
          size="small"
          placeholder="省选择"
          @change="()=>{
            ruleForm.city = ''
            ruleForm.county = ''
            onSubmit()
          }">
          <el-option
            v-for="(item, key) in provinceList"
            :key="key"
            :label="item"
            :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item
        label=""
        prop="city">
        <el-select
          v-model="ruleForm.city"
          filterable
          size="small"
          placeholder="市选择"
          @change="()=>{
            ruleForm.county = ''
            onSubmit()
          }">
          <el-option
            v-for="(item, key) in cityList"
            :key="key"
            :label="item"
            :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item
        label=""
        prop="county">
        <el-select
          v-model="ruleForm.county"
          filterable
          size="small"
          placeholder="区选择"
          @change="onSubmit">
          <el-option
            v-for="(item, key) in countyList"
            :key="key"
            :label="item"
            :value="key" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import areaOption from '@/components/area.js'
const isEqual = require('lodash/isEqual')
const pickBy = require('lodash/pickBy')
const {
  province_list: provinceList,
  city_list: cityList,
  county_list: countyList
} = areaOption

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        province: '',
        city: '',
        county: ''
      })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        province: '',
        city: '',
        county: ''
      },
      rules: {
        province: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        city: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ],
        county: [
          {
            required: true,
            type: 'string',
            message: '必须填写',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
    provinceList() {
      return provinceList
    },
    cityList() {
      return pickBy(cityList, (value, key) => {
        if (!this.ruleForm.province) {
          return false
        }
        return this.ruleForm.province.slice(0, 2) === key.slice(0, 2)
      })
    },
    countyList() {
      return pickBy(countyList, (value, key) => {
        if (!this.ruleForm.city) {
          return false
        }
        return this.ruleForm.city.slice(0, 4) === key.slice(0, 4)
      })
    }
  },
  watch: {
    value(newVal) {
      this.initForm()
    }
  },
  methods: {
    initForm() {
      if (!isEqual(this.ruleForm, this.value)) {
        this.ruleForm = {
          ...this.ruleForm,
          ...this.value
        }
        console.log(this.ruleForm)
      }
    },
    onSubmit() {
      this.$emit('input', {
        ...this.ruleForm
      })
    },
    resetFields() {
      return this.$refs.ruleForm.resetFields()
    },
    validate() {
      return this.$refs.ruleForm.validate()
    }
  }
}
</script>
