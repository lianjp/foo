<template>
  <SlickList
    v-bind="$attrs"
    :value="value"
    v-on="$listeners">
    <SlickItem
      v-for="(item, index) in value"
      :key="index"
      class="SlickItem"
      :index="index">
      <slot :item="item" :index="index" />
    </SlickItem>
  </SlickList>
</template>
<script>
import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  components: {
    SlickList,
    SlickItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less">
.tf-drag-table {
}

.SlickItem {
  padding: 5px 0;
  user-select: none;
}
</style>
