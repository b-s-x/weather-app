<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { SelectedCity } from '@/widgets/weather/model/types';
import Item from './Item.vue';

const props = defineProps();
const selected = ref<SelectedCity[]>([
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
]);

const handleDelete = (value: any) => console.log(222, value);
const dragOptions = { animation: 200 };

const updateSelected = (newSelected: SelectedCity[]) => {
  selected.value = newSelected;
};
</script>

<template>
  <div>
    <draggable
      v-model="selected"
      :options="dragOptions"
      itemKey="drag"
      @update:modelValue="updateSelected"
    >
      <template
        v-for="({ id, city, country }, index) of selected"
        :key="id"
        v-slot:item="{ element }"
      >
        <div :key="element.id">
          <Item
            class="item"
            :id="element.id"
            :city="element.city"
            :country="element.country"
            @deleteSelected="handleDelete"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.item {
  margin-bottom: 8px;
}
</style>
