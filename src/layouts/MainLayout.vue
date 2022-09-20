<template>
  <q-layout view="lHh Lpr lFf">
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
            <!-- <img
                class="main-title-logo"
                alt="Up down arrow"
                src="src/assets/logo_white.svg"
              /> -->
            <div class="main-title-text">Log Viewer</div>
          </a></q-toolbar-title
        >
        <q-input
          class="file-name-input"
          bg-color="grey"
          disabled
          outlined
          dense
          :model-value="logStore.getName"
        />
        <q-space />
        <ImportLogButton></ImportLogButton>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary q-pt-lg"
    >
      <q-list>
        <q-item-label header class="menu-title"> Menu </q-item-label>
        <MenuLink
          :disabled="!logStore.getName"
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
          class="text-white"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuLink, { MenuLinkProps } from 'components/MenuLink.vue';
import ImportLogButton from '../components/ImportLogButton.vue';
import { useLogStore } from 'stores/logStore';

const logStore = useLogStore();

const menuLinks: MenuLinkProps[] = [
  {
    title: 'Base',
    caption: 'Basic information',
    icon: 'content_paste_search',
    link: '/#/base',
  },
  {
    title: 'Raw',
    caption: 'Raw logs',
    icon: 'raw_on',
    link: '/#/rawlogs',
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
    title: 'Performance',
    caption: 'Performance related logs',
    icon: 'speed',
    link: '/#/performance',
  },
  {
    title: 'Settings',
    caption: 'Application settings',
    icon: 'settings',
    link: '/#/settings',
  },
];

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style lang="scss">
.main-title-link {
  height: 100%;
  align-items: center;
  display: block;
  text-decoration: none;
  color: white;
  font-weight: bold;

  .main-title-logo {
    width: 36px;
    height: 36px;
  }

  .main-title-text {
    display: inline;
  }
}

.file-name-input {
  width: 50%;
}

.menu-title {
  color: lightgrey;
}
</style>
