<template>
  <div class="CommodityCategorySelect">
    <el-select
      v-if="selectOptions.length>0"
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
    <CommodityCategorySelect
      v-if="hasChildren"
      ref="child"
      :list="list"
      :start-id="selectValue"
      @input="inputHandler"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      // 选中的 id
      default: '',
      type: String
    },
    list: {
      // 选中的 id
      default: () => [],
      type: Array
    },
    startId: {
      default: '0',
      type: String
    }
  },
  data() {
    return {
      selectValue: ''
    }
  },
  computed: {
    // goodsCateMap() {
    //   const goodsCateMap = {}
    //   this.goodsCateList.forEach((v) => {
    //     goodsCateMap[v.id] = v
    //   })
    //   return goodsCateMap
    // },
    selectOptions() {
      const startId = this.startId
      return this.list.filter(v => v.pid === startId)
    },
    hasChildren() {
      const selectValue = this.selectValue
      return this.list.some(v => v.pid === selectValue)
    }
  },
  watch: {
    startId: {
      handler() {
        // 上级 id 变化，直接清空自己，并触发 input
        this.selectValue = ''
        this.$emit('input', '')
      },
      immediate: true
    }
  },
  methods: {
    selectHandler(value) {
      this.selectValue = value
      if (!this.hasChildren || !this.selectValue) {
        this.$emit('input', value)
      }
    },
    inputHandler(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="less" scoped>
.CommodityCategorySelect {
  padding-left: 20px;
  display: inline-block;
}
</style>
