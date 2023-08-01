<script setup lang='ts'>
import { computed } from 'vue';
import IconPressure from '@/shared/icons/Pressure.vue';
import IconNavigation from '@/shared/icons/Navigation.vue';

interface Props {
  speed?: number
  pressure?: number
  humidity?: number
  dew?: number
  visibility?: number
}

const props = defineProps<Props>();

const getVisibility = (visibility: number | undefined) => {
  if (visibility) {
    return (visibility / 1000).toFixed(1);
  }

  return 0;
}

const visibilityValue = computed(() => getVisibility(props.visibility));

</script>

<template>
  <div class="box">
    <div class="box_item">
      <IconNavigation class="icon" />
        {{ `${props.speed || 0} m/s` }}
    </div>
    <div class="box_item">
      <IconPressure class="icon" />
      {{ `${props.pressure || 0} hPa` }}
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Humidity:
      </div>
      <div>
        {{ `${props.humidity || 0}%`}}
      </div>
    </div>

    <div class="box_item">
      <div class="box_item_label">
        Dew point:
      </div>
      <div>
        {{ `${props.dew || 0}°C`}}
      </div>
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Visibility:
      </div>
      <div>
        {{ `${visibilityValue}km`}}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  padding: .5rem 0;
  display: flex;
  align-items: center;

  &_item {
    display: flex;
    align-items: center;
    width: 50%;

    &_label {
      margin-right: 8px;
      width: 40%;
    }
  }
}

.icon {
  height: 16px;
  width: 16px;
  margin-right: 8px;
}
</style>