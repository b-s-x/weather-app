<script setup lang="ts">
import { Spinner } from '@/shared/components';
import Description from './Description.vue';
import Info from './Info.vue';
import type { WeatherData } from '../model/types';

interface Props {
  data: WeatherData
  isFetching: boolean
}

defineProps<Props>();
</script>

<template>
  <div v-if="!isFetching">
    <Description
      :term="data.temp || 0"
      :description="data.description || ''"
      :type="data.type || ''"
    />

    <Info
      :dew="data.dew || 0"
      :visibility="data.visibility || 0"
      :humidity="data.humidity || 0"
      :speed="data.windSpeed || 0"
      :pressure="data.pressure || 0"
    />
  </div>

  <div
    class="container"
    v-else
  >
    <Spinner type="big"  />
  </div>
</template>

<style lang="scss" scoped>
</style>