<script setup lang="ts">
import { SelectedCity } from '@/widgets/weather/model/types';
import Item from './Item.vue';

interface Props {
  selected: SelectedCity[]
}

defineProps<Props>()

const handleDelete = (value: any) => console.log(222, value);

</script>

<template>
  <div>
    <div
      v-for="({ id, city, country }) of selected"
      :key="id"
    >
      <Item
        class="item"
        :id="id"
        :city="city"
        :country="country"
        @deleteSelected="handleDelete"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.item {
  margin-bottom: 8px;
}
</style>