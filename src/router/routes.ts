import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/base',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/BasePage.vue') }],
  },
  {
    path: '/application',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ApplicationPage.vue') },
    ],
  },
  {
    path: '/communication',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CommunicationPage.vue') },
    ],
  },
  {
    path: '/rawlogs',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RawPage.vue') }],
  },
  {
    path: '/metadata',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MetadataPage.vue') }],
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SettingsPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
