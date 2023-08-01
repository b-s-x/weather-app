<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Header from './ui/Header.vue';
import Settings from './ui/Settings/index.vue';
import Main from './ui/Main.vue';
import { Weather } from './model';
import type { WeatherData, SelectedCity } from './model/types';

const weather = ref(new Weather());
const isSettingActive = ref(false);
const data = ref<WeatherData>(weather.value.data);

const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;

const fetchData = async () => {
  await weather.value.getData();
  data.value = weather.value.data;
}

onMounted(async () => {
  weather.value.checkLocalStorage();
  await fetchData();
});

const headerName = computed(() => {
  if (isSettingActive.value) {
    return 'Settings';
  }

  const city = data.value.city;
  const country = data.value.country

  if (city && country) {
    return `${city}, ${country}`
  }

  return '';
})

const handleChangeSelected = async (values: SelectedCity[]) => {
  weather.value.changeSelectedCities(values);
  await fetchData()
};
const handleDeleteSelected = (id: number) => weather.value.deleteSelectedCity(id);
const handleInputCity = (city: string) => weather.value.findCity(city);
const handleResetError = () => weather.value.resetIsNotFind();
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
      :data="data"
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