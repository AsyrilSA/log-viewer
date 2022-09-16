<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Log Viewer </q-toolbar-title>
       <ImportLogButton></ImportLogButton>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <MenuLink v-for="link in menuLinks" :key="link.title" v-bind="link" />
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
    title: 'Performance',
    caption: 'Performance related logs',
    icon: 'speed',
    link: '/#/performance',
  },
  {
    title: 'Raw',
    caption: 'Raw logs',
    icon: 'raw_on',
    link: '/#/rawlogs',
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
