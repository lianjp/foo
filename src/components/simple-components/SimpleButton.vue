<template>
  <button
    class="simple-button"
    v-on="$listeners">
    <slot />
  </button>
</template>
<style lang="less">
@grayColor: #333;
.simple-button {
  border: none;
  cursor: pointer;
  color: @grayColor;
}
.simple-button + .simple-button {
  margin-left: 10px;
}
</style>
