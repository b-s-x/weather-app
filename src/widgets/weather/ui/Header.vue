<script setup lang='ts'>
import IconSetting from '@/shared/icons/Setting.vue';
import IconTimes from '@/shared/icons/Times.vue';
import { Spinner } from '@/shared/components';
import { Events } from './events';

interface Props {
  name: string
  isSettingActive: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{ (e: Events.SettingClick): void }>();

const handleSettingsClick = () => emit(Events.SettingClick);

</script>

<template>
  <div class="header">
    <div>
      <span v-if="name">
        {{ props.name }}
      </span>
      <Spinner v-else />
    </div>
    <button
      class="setting_btn btn_icon"
      @click="handleSettingsClick"
    >
      <IconTimes
        v-if="props.isSettingActive"
        class="setting_icon_times"
      />
      <IconSetting
        v-else
        class="setting_icon"
      />
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
    height: 50px;
  }

  &_icon {
    fill: $color-black;
    height: 30px;
    width: 50px;

    &:hover {
      fill: $color-black-hover;
    }

    &_times {
      height: 40px;
      width: 50px;
    }
  }
}
</style>