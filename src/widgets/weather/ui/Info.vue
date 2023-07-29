<script setup lang="ts">
import IconPressure from '@/shared/icons/Pressure.vue';
import IconNavigation from '@/shared/icons/Navigation.vue';
import { Spinner } from '@/shared/components';

interface Props {
  speed?: number
  pressure?: number
  humidity?: number
  dew?: number
  visibility?: number
}

defineProps<Props>();

</script>

<template>
  <div class="box">
    <div class="box_item">
      <IconNavigation class="icon" />
      <span v-if="speed">
        {{ `${speed || 0} m/s` }}
      </span>

      <Spinner v-else />
    </div>
    <div class="box_item">
      <IconPressure class="icon" />
      <span v-if="pressure">
        {{ `${pressure || 0} hPa` }}
      </span>

      <Spinner v-else />
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Humidity:
      </div>
      <div>
        <span v-if="humidity">
          {{ humidity || 0}}
        </span>

        <Spinner v-else />
      </div>
    </div>

    <div class="box_item">
      <div class="box_item_label">
        Dew point:
      </div>
      <div>
        <span v-if="dew">
          {{ dew || 0}}
        </span>

        <Spinner v-else />
      </div>
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Visibility:
      </div>
      <div>
        <span v-if="visibility">
          {{ visibility || 0}}
        </span>

        <Spinner v-else />
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