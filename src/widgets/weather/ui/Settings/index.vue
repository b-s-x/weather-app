<script setup lang="ts">
import { SelectedCity } from '@/widgets/weather/types';
import Add from './Add.vue';
import Selections from './Selections.vue';
import { Events } from '../events';

interface Props {
  selected: SelectedCity[]
  isNotFind: boolean
  isFindingCityWeather: boolean
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: Events.UpdateSelectedCity, newItems: SelectedCity[]): void,
  (e: Events.DeleteSelectedCity, value: number): void,
  (e: Events.InputCity, city: string): void,
  (e: Events.ResetErrorFindCity): void;
}>();

const handleChangeSelected = (values: SelectedCity[]) => emit(Events.UpdateSelectedCity, values);
const handleDeleteSelected = (id: number) => emit(Events.DeleteSelectedCity, id);
const handleInput = (city: string) => emit(Events.InputCity, city);
const handleResetError = () => emit(Events.ResetErrorFindCity);
</script>

<template>
  <div>
    <Selections
      v-if="props.selected.length > 0"
      :selected="props.selected"
      @updateSelected="handleChangeSelected"
      @deleteSelected="handleDeleteSelected"
    />

    <div v-else>
      No selected cities
    </div>

    <Add
      :isNotFind="props.isNotFind"
      :isFindingCityWeather="props.isFindingCityWeather"
      @inputCity="handleInput"
      @resetErrorFindCity="handleResetError"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>