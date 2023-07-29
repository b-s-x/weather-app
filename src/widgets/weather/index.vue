<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from './ui/Header.vue';
import Main from './ui/Main.vue';
import Settings from './ui/Settings.vue';
import Info from './ui/Info.vue';
import { Weather } from './model';
import type { WeatherData } from './model/types';

const weather = new Weather();
const isSettingActive = ref(false);
const data = ref<WeatherData>({});

const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;

onMounted(async () => {
  await weather.getData();
  data.value = weather.data;
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

    <Info
      :dew="data.dew || 0"
      :visibility="data.visibility || 0"
      :humidity="data.humidity || 0"
      :speed="data.windSpeed || 0"
      :pressure="data.pressure || 0"
    />
  </div>
</template>

<style lang="scss" scoped>

.weather {
  border: 1px solid black;
  border-radius: 6px;
  width: 400px;
  padding: 1rem;
}
</style>