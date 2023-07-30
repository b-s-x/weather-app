<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from './ui/Header.vue';
import Settings from './ui/Settings.vue';
import Main from './ui/Main.vue';
import { Weather } from './model';
import type { WeatherData } from './model/types';

const weather = ref(new Weather());
const isSettingActive = ref(false);
const data = ref<WeatherData>({});

const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;

onMounted(async () => {
  await weather.value.getData();
  data.value = weather.value.data;
  console.log(data.value);
  console.log(1, data.value.type);
});

</script>

<template>
  <div class="weather">
    <Header
      :name="data.city || ''"
      :country="data.country || ''"
      :isSettingActive="isSettingActive"
      @settingClick="handleSettingsClick"
    />

    <Main
      :data="data"
      :isFetching="weather?.isFetchingWeather"
    />

  </div>
</template>

<style lang="scss" scoped>

.weather {
  border: 1px solid black;
  border-radius: 6px;
  width: 400px;
  height: 350px;
  padding: 1rem;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>