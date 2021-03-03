<template>
  <div class="AreaSection">
    <el-dialog
      v-if="dialogVisible"
      title="选择区域"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="beforeClose"
      width="500px"
      top="15vh"
      :modal="true"
      custom-class="AreaChoseSection"
      :append-to-body="true"
    >
      <div class="body">
        <div class="filter_section">
          <el-input
            v-model="filterText"
            clearable
            placeholder="输入关键字进行过滤"
          />
        </div>
        <div class="tree_section">
          <el-tree
            ref="tree"
            :default-checked-keys="value"
            class="tree"
            :data="treeData"
            show-checkbox
            node-key="zipcode"
            highlight-current
            :filter-node-method="filterNode"
            :props="defaultProps"
          />
        </div>
      </div>
      <div slot="footer">
        <el-button size="small" @click.stop="submit">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="dialogVisible = true">
      <slot /> ( 已选中 {{ value.length }} 个省或市 )
    </el-button>
  </div>
</template>
<script>
import areaOption from './../areaTree.js'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      treeData: areaOption,
      filterText: '',
      dialogVisible: false,
      defaultProps: {
        // 读取 data 的哪个值
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    /**
     * 过滤的是 label
     */
    filterNode(value, data, node) {
      if (!value) return true
      let p = node
      while (p && p.label) {
        if (p.label.indexOf(value) !== -1) {
          return true
        } else {
          p = p.parent
        }
      }
      return false
    },
    submit() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.dialogVisible = false
      this.$emit('input', checkedKeys)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    beforeClose(done) {
      this.$confirm('此操作可能不会保存选择数据, 是否继续?', '提示', {
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="less" >
@dialogGap: 122px;

.AreaSection {
  display: inline-block;
}
.AreaChoseSection {
  .body {
    max-height: calc(70vh - @dialogGap);
    // height: 55vh;
    display: flex;
    flex-direction: column;
    .filter_section {
      flex: 0;
    }
    .tree_section {
      margin-top: 10px;
      overflow-y: auto;
    }
  }
}
</style>
