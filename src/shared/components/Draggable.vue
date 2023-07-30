<script setup lang="ts">
import draggable from 'vuedraggable';

enum Events {
  update = 'update',
}

interface Props {
  items: any,
  dragOptions?: {
    animation: number
  },
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: Events.update, newItems: any[]): void }>();

const onUpdate= (newItems: any[]) => emit(Events.update, newItems);

</script>

<template>
  <draggable :options="dragOptions" @update="onUpdate">
    <template v-for="item in items" v-slot:item="{ element }">
      <slot :item="element"></slot>
    </template>
  </draggable>
</template>
