<script setup lang="ts">
import { Spinner, SpinnerTypes } from '@/shared/components';
import Description from './Description.vue';
import Info from './Info.vue';
import type { WeatherData } from '../types';

interface Props {
  data: WeatherData
  isFetching: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <div v-if="!props.isFetching">
    <Description
      :term="props.data.temp || 0"
      :description="props.data.description || ''"
      :type="props.data.type || ''"
    />

    <Info
      :dew="props.data.dew || 0"
      :visibility="props.data.visibility || 0"
      :humidity="props.data.humidity || 0"
      :speed="props.data.windSpeed || 0"
      :pressure="props.data.pressure || 0"
    />
  </div>

  <div
    class="container"
    v-else
  >
    <Spinner :type="SpinnerTypes.Big"  />
  </div>
</template>
