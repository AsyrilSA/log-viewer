<template>
  <q-item
    :clickable="!disabled"
    tag="a"
    :href="link"
    :class="disabled ? 'disabled-menu-item' : ''"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon class="menu-item-icon" :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">

export interface MenuLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  disabled?: boolean;
}
withDefaults(defineProps<MenuLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>

<style lang="scss">
.disabled-menu-item {
  pointer-events: none;
  opacity: 0.5;
  .menu-item-icon {
    background-color: #aaaaaa;
    color: white;
  }
}
.menu-item-icon {
  color: white;
  height: 28px;
  width: 28px;
  background-color: #2A9D8F;
  border-radius: 10000px;
  padding: 10px;
}
</style>
