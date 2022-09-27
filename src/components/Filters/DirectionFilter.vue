<template>
  <q-select
    color="secondary"
    filled
    emit-value
    map-options
    :model-value="props.modelValue"
    @update:model-value="
      (value) => {
        emit('update:modelValue', value);
      }
    "
    :options="directions"
    hide-dropdown-icon
    input-debounce="0"
    use-chips
    stack-label
    options-dense
    dense
    label="Direction"
  >
  </q-select>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Direction } from 'src/utils/logParser';
import { QSelect } from 'quasar';

const props = defineProps({
  modelValue: {
    type: [String, null] as PropType<string | null>,
    default: null,
    required: true,
  },
});
let emit = defineEmits(['update:modelValue']);

const directions = [
  {
    label: 'Computer to EYE+',
    value: Direction.COMPUTER_TO_EYEPLUS,
  },
  {
    label: 'EYE+ to Computer',
    value: Direction.EYEPLUS_TO_COMPUTER,
  },
  {
    label: 'Client disconnected',
    value: Direction.CONNECTION_CLOSED,
  },
  {
    label: 'New client connected',
    value: Direction.NEW_CONNECTION,
  },
];
</script>

<style lang="scss">
.q-chip--dense {
  margin-bottom: 0px;
}
</style>
