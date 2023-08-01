<script setup lang="ts">
import { computed } from 'vue';
import IconCloudy from '@/shared/icons/Cloudy.vue';
import IconRainy from '@/shared/icons/Rainy.vue';
import IconSunny from '@/shared/icons/Sunny.vue';
import { capitalize } from 'lodash';

interface Props {
  type: keyof Icons | string
  term: number
  description: string
}

const props = defineProps<Props>();

interface Icons {
  Clouds: typeof IconCloudy;
  Rains: typeof IconRainy;
  Clear: typeof IconSunny;
}

const icons: Icons = {
  Clouds: IconCloudy,
  Rains: IconRainy,
  Clear: IconSunny,
};

const icon = computed(() => {
  if (props?.type in icons) {
    return icons[props?.type as keyof Icons];
  } else {
    return '';
  }
});

</script>

<template>
  <div>
    <div class="box">
      <div class="icon_container" v-if="icon">
        <component :is="icon" class="icon" />
      </div>
      <div class="term">
        {{ `${term ? term?.toFixed(0) : '-'}°C`}}
      </div>
    </div>

    <div class="description">
      {{ capitalize(description) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: 100%;

  &_container {
    width: 120px;
    height: 120px;
  }
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.term {
  margin-left: 16px;
  font-size: 54px;
}

.description {
  padding: 30px 0;
}
</style>