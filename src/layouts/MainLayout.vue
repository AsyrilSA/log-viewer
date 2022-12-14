<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <a class="main-title-link" href="/">
            <span class="main-title-text">Log Viewer</span>
          </a>
          <span class="main-title-version">{{ version }}</span>
        </q-toolbar-title>
        <div>
          <b>Log name : </b>{{ logStore.getName ? logStore.getName : '-' }}
        </div>
        <q-space />
        <ImportLogButton></ImportLogButton>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      class="bg-primary"
      :width="250"
      :mini="miniState"
    >
      <q-list>
        <MenuLink
          :disabled="!logStore.getName"
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
          class="text-white"
        />
      </q-list>
      <q-space></q-space>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import MenuLink, { MenuLinkProps } from 'src/components/MenuLink.vue';
import ImportLogButton from 'src/components/ImportLogButton.vue';
import { useLogStore } from 'src/stores/logStore';
import { version } from '../../package.json';
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'

const $q = useQuasar()

const menuLinks: MenuLinkProps[] = [
  {
    title: 'Base',
    caption: 'Basic information',
    icon: 'content_paste_search',
    link: '/#/base',
  },
  {
    title: 'Application',
    caption: 'Application related logs',
    icon: 'apps',
    link: '/#/application',
  },
  {
    title: 'Communication',
    caption: 'TCP/IP protocol',
    icon: 'lan',
    link: '/#/communication',
  },
  {
    title: 'Raw',
    caption: 'Raw logs',
    icon: 'raw_on',
    link: '/#/rawlogs',
  },
  {
    title: 'Recipes',
    caption: 'Recipes and metadata',
    icon: 'analytics',
    link: '/#/metadata',
  },
  // {
  //   title: 'Settings',
  //   caption: 'Application settings',
  //   icon: 'settings',
  //   link: '/#/settings',
  // },
];

const miniState = ref(false);
function toggleLeftDrawer() {
  miniState.value = !miniState.value;
}

function handleLoadingDisplay(isLoading:boolean) {
  isLoading ? $q.loading.show() : $q.loading.hide()
}
const logStore = useLogStore()
const { isLogLoading } = storeToRefs(logStore)

watch(isLogLoading, ( ) => {
  handleLoadingDisplay(isLogLoading.value)
})

</script>

<style lang="scss">
.main-title-link {
  height: 100%;
  align-items: center;
  display: inline;
  text-decoration: none;
  color: white;
  font-weight: bold;

  .main-title-text {
    display: inline;
  }
}

.main-title-version {
  font-style: italic;
  font-size: 10px;
  margin-left: 10px;
}

.file-name-input {
  width: 50%;
}
</style>
