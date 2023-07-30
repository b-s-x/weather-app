<script setup lang="ts">
import { SelectedCity } from '@/widgets/weather/model/types';
import Add from './Add.vue';
import Selections from './Selections.vue';
import { Events } from '../events';

interface Props {
  selected: SelectedCity[],
}
defineProps<Props>();

const emit = defineEmits<{ (e: Events.UpdateSelectedCity, newItems: SelectedCity[]): void }>();

const handleChangeSelected = (values: SelectedCity[]) => emit(Events.UpdateSelectedCity, values);
</script>

<template>
  <div>
    <Selections
      :selected="selected"
      @updateSelected="handleChangeSelected"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>