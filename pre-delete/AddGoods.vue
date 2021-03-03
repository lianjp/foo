<template>
  <div>
    <el-from class="add-goods">
      <el-from-item title="请填写品牌名称" label="品牌名称:">
        <el-input laceholder="请输入品牌名称" />
      </el-from-item>

      <el-item title="请填写品牌类型" label="品牌类型:">
        <el-radio>
          自有品牌
        </el-radio>

        <el-radio>
          授权品牌
        </el-radio>
      </el-item>

      <el-item title="请上传品牌资料" label="品牌资料提交:">
        <el-upload v-slot="tip" action drag="true" list-type="picture-card">
          <i class="el-icon-plus" />
        </el-upload>
      </el-item>

      <el-item title="请选择商标有效期" label="注册商标有效期:">
        <el-date-picker
          type="date"
          placeholder="请选择开始日期"
          style="width: 100%;">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="请选择结束日期"
              style="width: 100%;" />
          </el-col>
        </el-date-picker>
      </el-item>
    </el-from>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.add-goods {
  max-width: 500px;
}
</style>
