<template>
  <div class="ELHoverPopover">
    <el-popover
      v-if="needPopover"
      v-bind="$attrs">
      <div slot="reference">
        <slot name="reference" />
      </div>
      <slot />
    </el-popover>
    <div
      v-else
      @mousemove="togglePopperShow">
      <slot name="reference" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      needPopover: false
    }
  },
  methods: {
    togglePopperShow() {
      this.needPopover = true
    }
  }
}
</script>
