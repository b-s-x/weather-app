<script setup lang="ts">
import IconSetting from '../../../shared/icons/Setting.vue';
import { Events } from './events';

 defineProps({
    city: {
      type: String,
      default: 'City',
    },
  })

  const emit = defineEmits<{ (e: Events.SettingClick): void }>();

  const handleSettingsClick = () => emit(Events.SettingClick);

</script>

<template>
  <div class="header">
    <div>
      {{ city }}
    </div>
    <button
      class="setting_btn btn_icon"
      @click="handleSettingsClick"
    >
      <IconSetting class="setting_icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@styles';

.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.setting {
  &_btn {
    width: 35px;
  }

  &_icon {
    fill: $color-black;
    height: 100%;
    width: 100%;

    &:hover {
      fill: rgba($color-black, .7);
    }
  }
}
</style>