<script setup lang="ts">
import IconPressure from '@/shared/icons/Pressure.vue';
import IconNavigation from '@/shared/icons/Navigation.vue';

interface Props {
  sse?: string
  pressure?: string
  humidity?: string
  dew?: string
  visibility?: string
}

defineProps<Props>();

</script>

<template>
  <div class="box">
    <div class="box_item">
      <IconNavigation class="icon" />
      {{ `${sse || 0} SSE` }}
    </div>
    <div class="box_item">
      <IconPressure class="icon" />
      {{ `${pressure || 0} hPa` }}
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Humidity:
      </div>
      <div>
        {{ humidity || 0}}
      </div>
    </div>

    <div class="box_item">
      <div class="box_item_label">
        Dew point:
      </div>
      <div>
        {{ dew || 0}}
      </div>
    </div>
  </div>

  <div class="box">
    <div class="box_item">
      <div class="box_item_label">
        Visibility:
      </div>
      <div>
        {{ visibility || 0}}
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