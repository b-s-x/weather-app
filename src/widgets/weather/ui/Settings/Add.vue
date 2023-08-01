<script setup lang="ts">
import { debounce } from 'lodash';
import { Spinner, SpinnerTypes } from '@/shared/components';
import { Events } from '../events';

defineProps<{
  placeholder?: string
  autofocus?: boolean
  isNotFind?: boolean
  isFindingCityWeather?: boolean
}>();

const emit = defineEmits<{
  (e: Events.InputCity, value: string): void;
  (e: Events.ResetErrorFindCity): void;
}>();

const handleInput = debounce((event: globalThis.Event) => {
  const target = event?.target as HTMLInputElement;
  emit(Events.InputCity, target.value);
}, 1500);

const handleResetError = () => emit(Events.ResetErrorFindCity);

</script>

<template>
  <div class="container">
    <label for="city">
      Add Location:
    </label>

    <div class="input_box">
      <input
        ref="input"
        id="city"
        type="text"
        class="input"
        :disabled="isFindingCityWeather"
        :autofocus="autofocus"
        :placeholder="placeholder"
        @keydown.enter="handleInput"
        @input="handleInput"
        @focus="handleResetError"
        @blur="handleResetError"
      />

      <Spinner
        v-if="isFindingCityWeather"
        :type="SpinnerTypes.Small"
      />
    </div>

    <div
      v-if="isNotFind"
      class="error"
    >
      City not found, please try again
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.input {
  padding: 8px;
  margin-top: 8px;
  margin-right: 16px;
  width: 80%;

  &_box {
    display: flex;
    align-items: center;
  }
}

.error {
  margin-top: 16px;
}
</style>