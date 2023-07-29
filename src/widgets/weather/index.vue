<script setup lang="ts">
import { ref } from 'vue';

import Header from './ui/Header.vue';
import Main from './ui/Main.vue';
import Settings from './ui/Settings.vue';
import Info from './ui/Info.vue';

const isSettingActive = ref(false);

const handleSettingsClick = () => isSettingActive.value = !isSettingActive.value;

</script>

<template>
  <div class="weather">
    <Header
      name="city"
      :isSettingActive="isSettingActive"
      @settingClick="handleSettingsClick"
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