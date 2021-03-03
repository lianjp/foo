<template>
  <div class="AreaSection">
    <el-dialog
      v-if="dialogVisible"
      title="选择配送区域"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="beforeClose"
      width="500px"
      top="15vh"
      :modal="false"
      custom-class="AreaChoseSection"
      :append-to-body="true">
      <div class="body">
        <div class="filter_section">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤" />
        </div>
        <div class="tree_section">
          <el-tree
            ref="tree"
            class="tree"
            :data="treeData"
            show-checkbox
            node-key="zipcode"
            highlight-current
            :filter-node-method="filterNode"
            :props="defaultProps">
            <!-- <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  Append
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
                  Delete
                </el-button>
              </span>
            </span> -->
          </el-tree>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="getCheckedKeys">
          getCheckedKeys
        </el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="dialogVisible = true">
      选择地区{{ value.length }}
    </el-button>
    <!-- {{ areaOption }} -->
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
    append(data) {
      console.log(data)
    },
    remove(node, data) {
      console.log(node, data)
    },
    filterNode(value, data) {
      if (!value) return true
      /**
       * 过滤的是 label
       */
      return data.label.indexOf(value) !== -1
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    beforeClose(done) {
      done()
      // this.$confirm('此操作可能不会保存表单数据, 是否继续?', '提示', {
      //   type: 'warning'
      // })
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    }
  }
}
</script>
<style lang="less" >
.AreaSection {
  display: inline-block;
}
.AreaChoseSection {
  .body {
    height: 60vh;
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
