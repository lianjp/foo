<template>
  <div class="HistoryLog">
    <HomeHeader
      v-bind="{
        userName
      }"
    />
    <section class="w-full body">
      <div class="search_section">
        <el-button-group>
          <el-button
            size="small"
            type=""
            icon="el-icon-refresh"
          />
        </el-button-group>
        <el-input
          v-model="keywords"
          clearable
          placeholder="请输入操作人，或操作内容"
          class="input-with-select"
          size="small"
        >
          <span slot="prepend" class="title">操作用户名 / 操作内容</span>
          <!-- <el-select
            slot="prepend"
            v-model="select"
            size="small"
            placeholder="请选择">
            <el-option label="操作用户名" value="1" />
            <el-option label="操作内容" value="2" />
          </el-select> -->
          <!-- <el-button slot="append" icon="el-icon-search" /> -->
        </el-input>
        <div class="input-with-payway">
          <span class="title">操作类型</span>
          <el-select
            v-model="select2"
            size="small"
            placeholder="请选择"
          >
            <el-option label="商城管理-幻灯片-添加" value="1" />
            <el-option label="商城管理-幻灯片-添加" value="2" />
            <el-option label="商城管理-幻灯片-添加" value="3" />
            <el-option label="商城管理-幻灯片-添加" value="4" />
            <el-option label="商城管理-幻灯片-添加" value="5" />
            <el-option label="商城管理-幻灯片-添加" value="6" />
            <el-option label="商城管理-幻灯片-添加" value="7" />
            <el-option label="商城管理-幻灯片-添加" value="7" />
          </el-select>
        </div>
        <div class="data_picker">
          <span class="title">操作时间</span>
          <el-date-picker
            v-model="timestamp"
            type="daterange"
            align="right"
            size="small"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import pickerOptions from './timePickerOption.js'

export default {
  data() {
    return {
      // 时间挫快捷键
      pickerOptions,
      select3: '1',
      // 搜索关键字
      keywords: '',
      select: '1',
      select2: '1',
      timestamp: ''
    }
  },
  computed: {
    ...mapState('userModule', ['userName'])
  },
  created() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.HistoryLog {
  .w-full {
    .wf();
  }
  .search_section {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    .title {
      padding-right: 10px;
      font-size: 13px;
      color: #585858;
    }
    .input-with-select {
      width: 400px;
    }
    .input-with-payway {
    }
    .data_picker {
      display: flex;
      align-items: center;
    }
  }

  /deep/ .input-with-select .el-select .el-input {
    width: 120px;
  }
  /deep/ .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  /deep/ .search_section .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
