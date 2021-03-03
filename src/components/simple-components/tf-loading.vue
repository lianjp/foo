<template>
  <div
    v-loading="vLoading"
    class="tf-loading"
    element-loading-spinner=" "
    element-loading-text="Waitting ......"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <template v-if="loading.length>1">
      <div>
        <tf-loading :loading="loading.slice(1)">
          <slot />
        </tf-loading>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    vLoading() {
      return !!this.loading[0]
    }
  }
}
</script>
