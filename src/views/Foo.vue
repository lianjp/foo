<template>
  <div class="Foo">
    {{ categryValue || '暂未选择' }}
    <CommodityCategorySelect
      v-model="categryValue"
      :list="goodsCateList"
      start-id="0"
    />
    {{ categryValue2 }}
    <MultiSelect
      v-model="categryValue2"
      :list="goodsCateList"
      root-id="0"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      categryValue: '2',
      categryValue2: '2'
    }
  },
  computed: {
    ...mapState('baseData', ['goodsCateList'])
  },
  created() {
    this.getAllGoodsCateList()
  },
  methods: {
    ...mapActions('baseData', ['getAllGoodsCateList'])
  }
}
</script>
