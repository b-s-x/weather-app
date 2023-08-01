<script setup lang='ts'>
import { ref, onMounted, computed, reactive } from 'vue';
import Header from './ui/Header.vue';
import Settings from './ui/Settings/index.vue';
import Main from './ui/Main.vue';
import { Weather } from './model';
import type { SelectedCity } from './types';

const weather = reactive(new Weather());
const isSettingActive = ref(false);
const headerName = computed(() => weather.getHeaderName(isSettingActive.value));

const handleChangeSelected = async (values: SelectedCity[]) => weather.changeSelectedCities(values);
const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;
const handleDeleteSelected = (id: number) => weather.deleteSelectedCity(id);
const handleInputCity = (city: string) => weather.findCity(city);
const handleResetError = () => weather.resetIsNotFind();

onMounted(async () => await weather.fetchData());
</script>

<template>
  <div class="weather">
    <Header
      :name="headerName || ''"
      :isSettingActive="isSettingActive"
      @settingClick="handleSettingsClick"
    />

    <Main
      v-if="!isSettingActive"
      :data="weather.data"
      :isFetching="weather?.isFetchingWeather"
    />

    <Settings
      v-else
      :isNotFind="weather?.isNotFind"
      :isFindingCityWeather="weather.isFindingCityWeather"
      :selected="weather.selectedCities"
      @updateSelected="handleChangeSelected"
      @deleteSelected="handleDeleteSelected"
      @inputCity="handleInputCity"
      @resetErrorFindCity="handleResetError"
    />
  </div>
</template>

<style lang="scss" scoped>
.weather {
  border: 1px solid black;
  border-radius: 6px;
  width: 400px;
  height: 360px;
  padding: 1rem;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>