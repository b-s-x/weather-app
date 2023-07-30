<script setup lang="ts">
import Add from './Add.vue';
import Selections from './Selections.vue';

const mock = [
  {
    id: 1,
    city: 'fff',
    country: 'GE',
  },
  {
    id: 2,
    city: 'aaa',
    country: 'GE',
  },
]

</script>

<template>
  <div>
    <Selections
      :selected="mock"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>