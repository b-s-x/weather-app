<script setup lang="ts">
import Header from './ui/Header.vue';
import Main from './ui/Main.vue';
import Settings from './ui/Settings.vue';
import Info from './ui/Info.vue';

const handleSettingsClick = () => console.log('click');

</script>

<template>
  <div class="weather">
    <Header
      name="city"
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