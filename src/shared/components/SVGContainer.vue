<script setup lang="ts">

defineProps({
  width: {
    type: String,
    default: '24',
  },
  height: {
    type: String,
    default: '24',
  },
  color: {
    type: String,
    default: '#000000',
  },
  viewBox: {
    type: String,
    default: '0 0 34 34',
  },
});

</script>

<template>
  <svg
    :viewBox="viewBox"
    :width="`${width}px`"
    :height="`${height}px`"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <slot />
  </svg>
</template>
