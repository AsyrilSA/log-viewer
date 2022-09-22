<template>
  <q-input
    :label="props.label"
    dense
    filled
    v-model="dateString"
    @update:model-value="onUpdateValue"
    :rules="props.rules"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="props.modelValue"
            @update:model-value="onUpdateValue"
            :mask="dateFormat"
            first-day-of-week="1"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            v-model="dateString"
            @update:model-value="onUpdateValue"
            :mask="dateFormat"
            format24h
            with-seconds
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { date } from 'quasar';
import { computed, PropType } from 'vue';

const dateFormat = 'DD.MM.YYYY HH:mm:ss';

const props = defineProps({
  modelValue: {
    type: [Date, null] as PropType<Date | null>,
    required: true,
  },
  label: {
    type: String,
    default: 'Date',
    required: true,
  },
  rules: [],
});

let emit = defineEmits(['update:modelValue']);

const dateString = computed(() => {
  let dateString = '';
  if (props.modelValue !== null) {
    dateString = date.formatDate(props.modelValue, dateFormat);
  }
  return dateString;
});

function onUpdateValue(value: string | number | null) {
  let newDate = null;
  if (typeof value === 'string') {
    newDate = date.extractDate(value, dateFormat);
  }

  emit('update:modelValue', newDate);
}
</script>
