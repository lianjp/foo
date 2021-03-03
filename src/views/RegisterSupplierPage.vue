<template>
  <div class="RegisterSupplierPage">
    <!-- {{ registerSupplierState }} {{ step }} {{ initValue }} -->
    <el-steps :active="step" finish-status="success" align-center>
      <el-step
        v-if="registerSupplierState === 'REPULSE'"
        title="审核失败"
        description="平台认为您没有资格，审核失败，失败原因见下"
        icon="el-icon-error"
      />
      <el-step
        v-else-if="registerSupplierState === 'FORBIDDEN'"
        title="账号封禁"
        description="填写表单进行解封申请"
        icon="el-icon-edit"
      />
      <el-step
        v-else
        title="入驻申请"
        description="填写表单进行入驻申请"
        icon="el-icon-edit"
      />
      <el-step
        title="等待平台审核"
        description="平台审核，会根据提交信息进行审核，此时无法修改已提交信息"
        icon="el-icon-question"
      />
      <el-step
        title="入驻成功"
        description="平台认为您有资格，则会审核通过，不需要再次申请，将不再需要进入该页面"
        icon="el-icon-success"
      />
    </el-steps>
    <section v-if="step === 0" class="discription_group">
      <h5 v-if="registerSupplierState === 'REPULSE'" class="error_title">
        {{ initValue.reason || '暂无原因' }}
      </h5>
      <section class="header">
        <el-radio-group v-model="radio">
          <el-radio :label="supplierTypeMap.inland">
            成为境内供应商
          </el-radio>
          <el-radio :label="supplierTypeMap.overSeas">
            成为境外供应商
          </el-radio>
        </el-radio-group>
      </section>
      <section class="form_body">
        <ApplyToBecomeSupplierInlandForm
          v-if="radio === 1"
          :init-value="initValue"
          :clearable="applyBecomeSupplierCount <= 0"
          :disable="applyBecomeSupplierCount > 0"
          :loading="applyBecomeSupplierCount > 0"
          @submit="submitBecomeSupplier"
        />
        <ApplyToBecomeSupplierOverseasForm
          v-if="radio === 2"
          :clearable="applyBecomeSupplierCount <= 0"
          :disable="applyBecomeSupplierCount > 0"
          :loading="applyBecomeSupplierCount > 0"
          :init-value="initValue"
          @submit="submitBecomeSupplier"
        />
      </section>
    </section>
    <section v-if="step === 1" key="ActionSucceed">
      <ActionSucceed
        :time-count="150"
        title="正在审核，请等待平台审核完成，即将退出登录"
        @timeEnd="$router.push({ name: 'login' })"
      />
    </section>

    <section v-if="step === 2" key="ActionSucceed2">
      <ActionSucceed
        :time-count="5"
        title="入驻成功，不再需要重新申请，将为您跳转主页"
        @timeEnd="$router.push({ name: 'home' })"
      />
    </section>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import supplierTypeMap from '@/type/supplierTypeMap.js'
export default {
  data() {
    return {
      radio: supplierTypeMap.inland,
      supplierTypeMap
    }
  },
  computed: {
    ...mapState('loading', {
      // 申请的函数 loading
      applyBecomeSupplierCount: 'userModule/applyBecomeSupplier'
    }),

    initValue() {
      // 审核失败 表单初始值
      return this.registerSupplierState === 'REPULSE' ? this.merchreg : {}
    },
    ...mapState('userModule', ['merchreg']),
    step() {
      // const registerSupplierState = 'NORMAL'
      const stepMap = {
        // 没注册
        NOT_REGISTER: 0,
        // 注册中
        PENDING: 1,
        // 注册中
        NORMAL: 2,
        // 审核失败
        REPULSE: 0,
        // 账户被禁止
        FORBIDDEN: 0
      }
      return stepMap[this.registerSupplierState]
    },
    ...mapGetters('userModule', ['registerSupplierState'])
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      // 审核失败 表单初始值
      if (this.registerSupplierState === 'REPULSE') {
        // 海外还是境内
        const initValue = this.merchreg
        this.radio = parseInt(initValue.supplierType)
      }
    },
    ...mapActions('userModule', ['applyBecomeSupplier', 'autoLogin']),
    async submitBecomeSupplier(formData) {
      console.log(formData)
      const { code, message } = await this.applyBecomeSupplier({
        ...formData,
        supplierType: this.radio
      })
      this.$message({
        message,
        duration: 1500,
        type: this.isSuccessful(code) ? 'success' : 'error'
      })
      if (this.isSuccessful(code)) {
        await this.autoLogin()
      }
      // 提交表单后，刷新用户信息
    }
  }
}
</script>

<style lang="less" scoped>
.RegisterSupplierPage {
  .discription_group {
    .wf();
    .error_title {
      line-height: 40px;
      text-align: center;
      color: @dangerColor;
    }
    .header {
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
