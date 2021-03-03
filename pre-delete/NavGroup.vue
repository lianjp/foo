<template>
  <div class="NavGroup">
    <nav
      v-if="items.length>0"
      :class="['nav_i', deep === 0?'first':'child'] ">
      <h5 class="title line_clamp_1">
        层级 {{ deep+1 }} ：
      </h5>
      <ol class="items_list">
        <li
          v-for="(item, index) in items"
          :key="index"
          :data-cate-id="item.id"
          class="item line_clamp_1">
          <router-link
            :class="['link', highLightId.includes(item.id)?'highlight':''] "
            :to="toOption(item.id)">
            {{ item.name }}
          </router-link>
        </li>
      </ol>
    </nav>
    <!-- {{highLightId}} -->
    <NavGroup
      v-if="deep+1<highLightId.length && items.length>0"
      :all-item-map="allItemMap"
      :deep="deep+1"
      :all-item-array="allItemArray"
      :base="base"
      :keep-query-key="keepQueryKey"
      :high-light-id="highLightId" />
  </div>
</template>
<script>
export default {
  props: {
    // 本的 pid
    deep: {
      type: Number,
      default: 0
    },
    pid: {
      type: Number,
      default: 0
    },
    // 高亮的 id
    highLightId: {
      type: Array
    },
    // 全部的 map 形式
    allItemMap: {
      type: Object
    },
    // 全部的 数组形式
    allItemArray: {
      type: Array
    },
    // 基础路由
    base: {
      type: Object
    },
    // 需要保留的 query 的 key 数组
    keepQueryKey: {
      type: Array
    }
  },
  data() {
    return {}
  },
  computed: {
    items() {
      const pid = this.highLightId[this.deep]
      return this.allItemArray.filter(v => +v.pid === +pid)
    },
    toOption() {
      const keepedQuery = this.keepQueryKey.reduce(
        (r, v) => ({ ...r, [v]: this.$route.query[v] }),
        {}
      )
      const baseOptions = this.base
      return id => {
        return {
          ...baseOptions,
          query: {
            categoryId: id,
            ...keepedQuery
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.NavGroup {
  .nav_i {
    display: flex;
    height: 36px;
    align-items: center;
    padding: 0 20px 0 20px;
    &.child {
      border-top: 1px dashed #dedede;
      margin-top: -1px;
    }
    .title {
      width: 112px;
      color: #999;
    }
    .items_list {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      .item {
        margin: 0 40px 0 0;
        font-family: arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
        max-width: 140px;
        font-size: 12px;
        .link {
          color: rgb(0, 0, 0);
        }
        .highlight {
          color: @themeColor;
        }
      }
    }
  }
}
</style>
