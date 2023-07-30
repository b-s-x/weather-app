<script setup lang="ts">
import draggable from 'vuedraggable';
import { SelectedCity } from '@/widgets/weather/model/types';
import Item from './Item.vue';
import { Events } from '../events';

interface Props {
  selected: SelectedCity[],
}
defineProps<Props>();
const emit = defineEmits<{ (e: Events.UpdateSelectedCity, newItems: SelectedCity[]): void }>();

const dragOptions = { animation: 200 };

const handleDelete = (value: any) => console.log(222, value);
const updateSelected = (newSelected: SelectedCity[]) => emit(Events.UpdateSelectedCity, newSelected);
</script>

<template>
  <div>
    <draggable
      :modelValue="selected"
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
