<template>
  <div class="MultiSelectItem">
    <el-select
      v-if="selectOptions.length > 0"
      class="selector"
      size="small"
      clearable
      :value="selectValue"
      placeholder="请选择"
      @change="selectHandler"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <MultiSelectItem
      v-if="selectOptions.length > 0"
      ref="child"
      :position="position + 1"
      :pid="selectValue"
      :init-path="initPath"
      :get-select-option-by-id="getSelectOptionById"
      @report="report"
    />
    <!-- <MultiSelectItem
      :list="list"
      :start-id="selectValue"
    /> -->
  </div>
</template>
<script>
export default {
  props: {
    getSelectOptionById: {
      type: Function,
      default: () => []
    },
    pid: {
      type: [Number, String],
      default: 0
    },
    position: {
      type: Number,
      default: 0
    },
    initPath: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      selectValue: ''
    }
  },
  computed: {
    selectOptions() {
      return this.getSelectOptionById(this.pid)
    }
  },
  watch: {
    initPath: {
      handler(path) {
        // 发现 path 变化，重新初始化自己
        this.initSelectValue()
      },
      immediate: true
    }
    // pid() {
    //   this.selectValue = ''
    // }
  },
  methods: {
    reset() {
      this.selectValue = ''
      this.$refs.child && this.$refs.child.reset()
    },
    initSelectValue() {
      // 初始化自己，只执行一次
      const selectValue = this.initPath[this.position] || ''
      this.selectValue = selectValue
    },
    selectHandler(value) {
      this.selectValue = value
      this.$refs.child.reset()
      this.$emit('report', {
        position: this.position,
        value: value
      })
    },
    report({ position, value }) {
      this.$emit('report', { position, value })
    }
  }
}
</script>
<style lang="less" scoped>
.MultiSelectItem {
  display: inline-block;
  .selector {
    padding-right: 20px;
  }
}
</style>
