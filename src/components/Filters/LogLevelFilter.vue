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
    :options="logLevelOptions"
    multiple
    use-input
    hide-dropdown-icon
    input-debounce="0"
    @filter="filterLogLevel"
    use-chips
    stack-label
    options-dense
    dense
    label="Log Level"
  >
    <template v-slot:selected-item="scope">
      <q-chip
        removable
        dense
        @remove="scope.removeAtIndex(scope.index)"
        :tabindex="scope.tabindex"
        text-color="black"
        :class="getChipClass(scope.opt)"
      >
        {{ scope.opt }}
      </q-chip>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LogLevel } from 'src/utils/logParser';
import { QSelect } from 'quasar';

const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: [],
    required: true,
  },
});
let emit = defineEmits(['update:modelValue']);

const logLevels = Object.keys(LogLevel);
const logLevelOptions = ref(logLevels);
function filterLogLevel(
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void
) {
  if (val === '') {
    update(() => {
      logLevelOptions.value = logLevels;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    logLevelOptions.value = logLevels.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
}

function getChipClass(level: string): string {
  switch (level) {
    case LogLevel.ERROR:
      return 'error-chip';
    case LogLevel.WARNING:
      return 'warning-chip';
    case LogLevel.INFO:
      return 'info-chip';
    case LogLevel.DEBUG:
      return 'debug-chip';
    case LogLevel.TRACE:
      return 'trace-chip';
    case LogLevel.SYSTEM:
      return 'system-chip';
  }

  return '';
}
</script>

<style lang="scss">
.error-chip {
  background-color: v-bind('logLevelColors(LogLevel.ERROR)');
}
.warning-chip {
  background-color: v-bind('logLevelColors(LogLevel.WARNING)');
}
.info-chip {
  background-color: v-bind('logLevelColors(LogLevel.INFO)');
}
.debug-chip {
  background-color: v-bind('logLevelColors(LogLevel.DEBUG)');
}
.trace-chip {
  background-color: v-bind('logLevelColors(LogLevel.TRACE)');
}
.system-chip {
  background-color: v-bind('logLevelColors(LogLevel.SYSTEM)');
}
</style>
