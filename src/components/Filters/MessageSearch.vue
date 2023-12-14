<template>
  <q-input
    color="secondary"
    filled
    :model-value="props.modelValue"
    @update:model-value="
      (value) => {
        try {
          new RegExp(value);
          regexError.value = '';
        } catch (error) {
          regexError.value = error.message;
        }
        emit('update:modelValue', value);
      }
    "
    label="Message"
    dense
  >
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
    <q-alert v-if="regexError.value !== ''" :type="'negative'">{{ regexError.value }}</q-alert>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
});

let emit = defineEmits(['update:modelValue']);

const text = ref('');
const regexError = ref('');
</script>
