<template>
  <q-input
    :label="props.label"
    dense
    filled
    :model-value="props.modelValue"
    @update:model-value="onUpdateValue"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="props.modelValue"
            @update:model-value="onUpdateValue"
            mask="DD.MM.YYYY HH:mm:ss"
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
            :model-value="props.modelValue"
            @update:model-value="onUpdateValue"
            mask="DD.MM.YYYY HH:mm:ss"
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
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  label: {
    type: String,
    default: 'Date',
    required: true,
  },
});

let emit = defineEmits(['update:modelValue']);

function onUpdateValue(value: string | number | null) {
  emit('update:modelValue', value);
}
</script>
