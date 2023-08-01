<script setup lang='ts'>
import draggable from 'vuedraggable';
import { SelectedCity } from '@/widgets/weather/types';
import Item from './Item.vue';
import { Events } from '../events';

interface Props {
  selected: SelectedCity[],
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: Events.UpdateSelectedCity, newItems: SelectedCity[]): void,
  (e: Events.DeleteSelectedCity, value: number): void,
}>();

const dragOptions = { animation: 200 };

const handleDelete = (id: number) => emit(Events.DeleteSelectedCity, id);
const updateSelected = (newSelected: SelectedCity[]) => emit(Events.UpdateSelectedCity, newSelected);
</script>

<template>
  <div>
    <draggable
      :modelValue="props.selected"
      :options="dragOptions"
      itemKey="drag"
      @update:modelValue="updateSelected"
    >
      <template v-slot:item="{ element }">
        <Item
          class="item"
          :id="element.id"
          :city="element.city"
          :country="element.country"
          @deleteSelected="() => handleDelete(element.id)"
        />
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.item {
  margin-bottom: 8px;
}
</style>

