<template>
  <div class="MultiSelect">
    <MultiSelectItem
      :position="0"
      :pid="rootId"
      :init-path="slotInitPath"
      :get-select-option-by-id="getSelectOptionById"
      @report="reportHandler"
    />
  </div>
</template>
<script>
// const isEmpty = require('lodash/isEmpty')
export default {
  props: {
    value: {
      default: '',
      type: String
    },
    list: {
      default: () => [],
      type: Array
    },
    rootId: {
      default: '0',
      type: String
    }
  },
  data() {
    return {
      slotInitPath: []
    }
  },
  computed: {
    listMap() {
      const listMap = {}
      const list = this.list
      list.forEach(element => {
        listMap[element.id] = element
      })
      return listMap
    },
    getSelectOptionById() {
      const list = this.list
      return id => {
        return list.filter(v => v.pid === id)
      }
    },
    isLeaf() {
      const list = this.list
      return id => {
        return !list.some(v => v.pid === id)
      }
    }
  },
  methods: {
    setInitPath(currentId) {
      // 初始 path
      const path = []
      const listMap = this.listMap
      let currentNode = listMap[currentId]
      let deep = 10
      while (currentNode && --deep) {
        path.unshift(currentNode.id)

        currentNode = listMap[currentNode.pid]
      }
      // 如果 value 存在，就算初始化成功。
      this.slotInitPath = path
    },
    reset() {
      // 重置，只需要把 initPath 写为空即可
      this.slotInitPath = []
    },
    reportHandler({ position, value: id }) {
      // console.log(position, id)
      if (this.isLeaf(id)) {
        this.$emit('input', id)
      }
    }
  }
}
</script>
