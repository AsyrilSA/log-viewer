<template>
  <div class="column q-pa-md">
    <div class="row row-size">
      <div class="col">Number of recipes:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ props.recipeInformation.recipes.size }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Name:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ firstKey(props.recipeInformation.recipes) }}
      </div>
    </div>
    <div class="row row-size">
      <div class="col">Creation date:</div>
      <div class="col-xs-12 col-sm-6 log-value">
        {{ firstValue(props.recipeInformation.recipes) }}
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

function firstKey(map: Map<string, Date>): string {
  const [firstKey] = map.keys();
  return firstKey;
}

function firstValue(map: Map<string, Date>): Date {
  const [firstValue] = map.values();
  return firstValue;
}
</script>

<style lang="scss"></style>
