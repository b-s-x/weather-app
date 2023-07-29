<template>
  <svg
    class="spinner"
    width="20"
    height="20"
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