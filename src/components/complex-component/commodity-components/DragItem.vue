<template>
  <li class="list-item">
    <span v-handle class="handle">handle</span>
    {{ item.value }}
  </li>
</template>

<script>
import { ElementMixin, HandleDirective } from 'vue-slicksort'

export default {
  directives: { handle: HandleDirective },
  mixins: [ElementMixin]
}
</script>
