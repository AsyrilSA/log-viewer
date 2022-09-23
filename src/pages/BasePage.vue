<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-xs-12 col-lg-4 q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">General Log Information</h5>
              <general-log-information
                :logInformation="logStore.getLogInformation"
              ></general-log-information>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-4 q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">Time Information</h5>
              <time-information
                :logInformation="logStore.getLogInformation"
              ></time-information>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col-xs-12 col-lg-4 medium-heigh q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">
                Log distribution per service
              </h5>
              <log-status
                class="q-ma-md"
                :logInformation="logStore.getLogInformation"
                :isCtrlPressed="isCtrlPressed"
              ></log-status>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-4 q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">
                Log distribution per log level
              </h5>
              <log-repartition
                class="q-ma-md"
                :logInformation="logStore.getLogInformation"
                :isCtrlPressed="isCtrlPressed"
              ></log-repartition>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import {onMounted} from 'vue';
import LogRepartition from 'src/pages/BasePage/LogRepartition.vue';
import LogStatus from 'src/pages/BasePage/LogStatus.vue';
import TimeInformation from 'src/pages/BasePage/TimeInformation.vue';
import GeneralLogInformation from 'src/pages/BasePage/GeneralLogInformation.vue';

import { useLogStore } from 'stores/logStore';
import { getLogInformation } from 'src/utils/logExtractor';
import { onMounted,onUnmounted, computed, ref } from 'vue';

const logStore = useLogStore();
onMounted(() => {
logStore.setLogLoading(false);
})

const logInformation = computed(() => getLogInformation(logStore.getRows));
const isCtrlPressed = ref(false);
function addControlKeyDown(event: any) {
  if (event.key === 'Control') {
      isCtrlPressed.value = true
    }
}
function addControlKeyUp(event: any) {
  if (event.key === 'Control') {
      isCtrlPressed.value = true
    }
}
onMounted(() => {
  window.addEventListener('keydown', addControlKeyDown)
  window.addEventListener('keyup', addControlKeyUp);
})
onUnmounted(() => {
  window.removeEventListener('keydown',addControlKeyDown);
  window.removeEventListener('keyup',addControlKeyUp);
})
</script>

<style lang="scss">
.medium-height {
  min-height: 300px;
}
</style>
