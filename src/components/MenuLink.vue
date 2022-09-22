<template>
  <q-item :clickable="!disabled" tag="a" :href="link" :class="getClass">
    <q-item-section v-if="icon" avatar>
      <q-icon class="menu-item-icon" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption class="menu-caption">{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

export interface MenuLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  disabled?: boolean;
}
const props = withDefaults(defineProps<MenuLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const getClass = computed(() => {
  if (props.disabled) {
    return 'disabled-menu-item';
  }
  return '/#' + route.path === props.link ? 'selected-menu-item' : '';
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
  background-color: var(--q-secondary);
  border-radius: 10000px;
  padding: 10px;
}

.menu-caption {
  color: lightgrey;
}

.selected-menu-item {
  background-color: hsl(12, 77%, 61%, 30%);
  filter: brightness(120%);
  font-weight: 800;
}
</style>
