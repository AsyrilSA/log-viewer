<template>
  <q-select
    color="secondary"
    filled
    :model-value="props.modelValue"
    @update:model-value="
      (value) => {
        emit('update:modelValue', value);
      }
    "
    :options="serviceOptions"
    multiple
    use-input
    hide-dropdown-icon
    input-debounce="0"
    @filter="filterService"
    use-chips
    stack-label
    options-dense
    dense
    label="Service"
  />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { QSelect } from 'quasar';

const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: [],
    required: true,
  },
  options: {
    type: Array<string>,
    default: [],
    required: true,
  },
});

let emit = defineEmits(['update:modelValue']);

let serviceOptions: Ref<string[]> = ref(props.options);
function filterService(
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void
) {
  if (val === '') {
    update(() => {
      serviceOptions.value = props.options;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    serviceOptions.value = props.options.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
