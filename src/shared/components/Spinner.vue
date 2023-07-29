<script setup lang="ts">
import { PropType } from 'vue';

type Sizes = {
  small: number
  medium: number
  big: number
}

enum Types {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
}

const props = defineProps({
  type: {
    type: String as PropType<Types>,
    default: Types.Small,
    validator: (value: string) => Object.values(Types).includes(value as Types),
  },
});

const sizes: Record<Types, number> = {
  [Types.Small]: 20,
  [Types.Medium]: 40,
  [Types.Big]: 60,
};

const size: number = sizes[props.type || Types.Small];

</script>

<template>
  <svg
    class="spinner"
    :width="size"
    :height="size"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      :cx="25"
      :cy="25"
      :r="20"
      fill="none"
      stroke-width="4"
      stroke="black"
      opacity="0.5"
    />
  </svg>
</template>

<style lang="scss" scoped>
.spinner {
  animation: rotate 2s linear infinite;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -124px;
  }
}
</style>