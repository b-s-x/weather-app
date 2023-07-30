<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Header from './ui/Header.vue';
import Settings from './ui/Settings/index.vue';
import Main from './ui/Main.vue';
import { Weather } from './model';
import type { WeatherData, SelectedCity } from './model/types';
import { useHeaderName } from './model/hooks/index';

const weather = ref(new Weather());
const isSettingActive = ref(true);
const data = ref<WeatherData>({});

const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;

onMounted(async () => {
  await weather.value.getData();
  data.value = weather.value.data;
  console.log(data.value);
});

const headerName = computed(() => useHeaderName(isSettingActive.value, data.value.city, data.value.country))

let mock = [
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
]

const selected = ref(mock)
const handleChangeSelected = (values: SelectedCity[]) => {
  selected.value = values
};

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
      :selected="selected "
      @updateSelected="handleChangeSelected"
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