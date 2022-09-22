<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="col-xs-12 col-lg-4 medium-heigh q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">Log Status</h5>
              <log-status :logInformation="logInformation"></log-status>
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
              <h5 class="q-my-none q-ml-md q-pt-sm">General Log Information</h5>
              <general-log-information
                :logInformation="logInformation"
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
                :logInformation="logInformation"
              ></time-information>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-lg-6 q-pa-sm">
        <div class="row" style="min-height: 100%">
          <div class="col-12 q-pb-xs-md q-pb-md-none">
            <q-card
              class="col q-mr-md-sm q-mr-xs-none q-pb-xs-md q-mb-md-none"
              style="min-height: 100%"
            >
              <h5 class="q-my-none q-ml-md q-pt-sm">Log Repartition</h5>
              <log-repartition
                :logInformation="logInformation"
              ></log-repartition>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import LogRepartition from 'src/pages/BasePage/LogRepartition.vue';
import LogStatus from 'src/pages/BasePage/LogStatus.vue';
import TimeInformation from 'src/pages/BasePage/TimeInformation.vue';
import GeneralLogInformation from 'src/pages/BasePage/GeneralLogInformation.vue';

import { useLogStore } from 'stores/logStore';
import { getLogInformation } from 'src/utils/logExtractor';
import { computed } from 'vue';

const logStore = useLogStore();

const logInformation = computed(() => getLogInformation(logStore.getRows));
</script>

<style lang="scss">
.medium-height {
  min-height: 300px;
}
</style>
