<template>
  <div class="Search_section">
    <HomeHeader
      v-bind="{
        userName,
        width
      }" />

    <HomeSearchSection
      :width="width"
      :base-value="keywords"
      class="HomeSearchSection" />

    <section class="breadcrumb_section">
      <el-breadcrumb
        class="breadcrumb"
        separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ name: 'Search', query: {}}">所有分类</el-breadcrumb-item> -->
        <el-breadcrumb-item
          v-for="({ name , id }, index) in breadcrumbArray"
          :key="index"
          :to="{
            name: 'Search',
            query: (id !=0 ? {categoryId: id }:{})
          }">
          <span>
            {{ id != 0? name:'所有分类' }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        class="toggle_btn"
        plain
        size="mini"
        @click="showExpand = !showExpand">
        <span>
          {{ showExpand?'显示':'收起' }}筛选
        </span>
        <i :class="showExpand?'el-icon-arrow-up':'el-icon-arrow-down'" />
      </el-button>
    </section>

    <section class="groups">
      <el-collapse-transition>
        <div
          v-if="showExpand"
          class="groups_body">
          <NavGroup
            :all-item-map="goodsCategory"
            :all-item-array="goodsCategoryArray"
            :base="{ name: 'Search' }"
            :keep-query-key="['keywords']"
            :high-light-id="breadcrumbArray.map(v=>v.id)" />
        </div>
      </el-collapse-transition>
    </section>

    <div
      ref="TodayRecomendTable"
      v-loading="getSearchGoodsListActionCount > 0"
      :style="{
        width: `${width}px`
      }"
      class="goods_list_table"
      element-loading-spinner=""
      element-loading-text=" "
      element-loading-background="rgba(255, 255, 255, 0.6)">
      <GridTable
        v-if="searchedGoodList.list.length >0"
        :table-width="tableWidth"
        item-width="240"
        item-x-gap="10"
        item-y-gap="20">
        <GridTableItem
          v-for="(goods, index) in searchedGoodList.list"
          :key="index">
          <GoodsCard v-bind="goods" />
        </GridTableItem>
      </GridTable>
      <!-- 根据 loading 和 items 个数来自己决定自己是否展示 -->
      <NoDataHolder
        :loading="getSearchGoodsListActionCount > 0"
        :items="searchedGoodList.list"
        message="暂无搜索结果" />
    </div>
    <div class="pagination">
      <!-- <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next, total, jumper"
        :total="400">
      </el-pagination> -->
      <el-pagination
        :current-page.sync="nativeCurrentPage"
        :page-size="pageSize"
        :total="+searchedGoodList.total"
        background
        layout="prev, pager, next, total, jumper" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    categoryId: {
      type: String,
      default: ''
    },
    keywords: {
      type: String
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  metaInfo() {
    return {
      title: '海销供应商后台',
      titleTemplate: `${this.keywords}_%s`,
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        {
          name: 'keyWords',
          content: '海销供应商后台'
        }
      ]
    }
  },
  data() {
    return {
      width: 1200,
      tableWidth: 1200,
      showExpand: true,
      pageSize: 20
    }
  },
  computed: {
    querySearch() {
      return {
        categoryId: this.categoryId,
        keywords: this.keywords,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
    },
    ...mapState('userModule', {
      userName: 'userName'
    }),
    ...mapState('goodsModule', [
      'goodsCategoryArray',
      'goodsCategory',
      'searchedGoodList'
    ]),
    ...mapState('loading', {
      getSearchGoodsListActionCount: 'goodsModule/getSearchGoodsList'
    }),
    // ...mapState('goodsModule', {
    //   'searchedGoodList': 'searchedGoodList'
    // }),
    ...mapGetters('goodsModule', ['getCategoryPathById']),
    // 面包屑路径
    breadcrumbArray() {
      return this.getCategoryPathById(this.categoryId)
    },
    nativeCurrentPage: {
      get() {
        return this.currentPage || 1
      },
      set(num) {
        // 翻页数据，如果之前翻页页数是不存在，就重定向，否则添加历史记录
        if (this.currentPage !== undefined) {
          this.$routerQpush({ currentPage: num })
        } else {
          this.$routerQrep({ currentPage: num })
        }
      }
    }
  },
  watch: {
    querySearch: {
      handler(newVal, oldVal) {
        this.searchGoodsList()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('goodsModule', ['getSearchGoodsList']),
    searchGoodsList() {
      this.getSearchGoodsList(this.querySearch)
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb_section {
  .wf();
  height: 50px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.groups_body {
  border: 1px solid #e8e8e8;
  padding: 0 5px;
  .wf();
}
.goods_list_table {
  margin: auto;
  padding-top: 20px;
}
.pagination {
  padding: 10px;
  .wf();
  text-align: center;
}
/deep/ .el-pagination .btn-prev {
  // margin: 0 15px;
}
/deep/ .el-pagination .btn-next {
  // margin: 0 15px;
}
/deep/ .el-pagination .el-pager li {
  // margin: 0;
  border: 1px solid #dddddd;
}
</style>
