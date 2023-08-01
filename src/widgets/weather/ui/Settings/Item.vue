<script setup lang='ts'>
import IconLines from '@/shared/icons/Lines.vue';
import IconTrash from '@/shared/icons/Trash.vue';
import { Events } from '../events';

interface Props {
  id: number
  city: string
  country: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: Events.DeleteSelectedCity): void }>();

const handleDeleteItem = () => emit(Events.DeleteSelectedCity)

</script>

<template>
  <div class="block">
    <div class="info">
      <button
        class="btn_icon btn"
      >
        <IconLines class="icon icon_line" />
      </button>
      {{ `${props.city}, ${props.country}` }}
    </div>

    <button
      class="btn_icon btn"
      @click="handleDeleteItem"
    >
      <IconTrash class="icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@styles';
.block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-gray;
  padding: 8px;
}

.icon {
  width: 20px;
  height: 20px;

  &_line {
    margin-right: 5px;
  }

  &:hover {
    fill: $color-black-hover;
  }
}

.btn {
  &:hover {
    color: $color-black-hover;
  }
}

.info {
  display: flex;
  align-items: center;
}
</style>