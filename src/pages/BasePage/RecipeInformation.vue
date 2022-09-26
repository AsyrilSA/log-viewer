<template>
  <div class="column q-pa-md">
    <div class="row row-size">
      <div class="col">Number of recipes:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.recipeInformation.recipes.size }}
      </div>
    </div>
    <div
      class="row row-size"
      v-for="[recipeName, recipeCreationDate] in props.recipeInformation
        .recipes"
      :key="recipeName"
    >
      <div class="col">{{ recipeName }}</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ recipeCreationDate.toLocaleString('fr-CH') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { RecipeInformation } from 'src/utils/logExtractor';

const props = defineProps({
  recipeInformation: {
    type: Object as PropType<RecipeInformation>,
    required: true,
  },
});
</script>

<style lang="scss"></style>
